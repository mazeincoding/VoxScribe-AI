"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Menu, Loader2 } from "lucide-react";
import { Transcription as TranscriptionType } from "@/types/transcription";
import { db, updateDatabase } from "@/firebase/config";
import { ref } from "firebase/database";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";

interface TranscriptionProps {
  transcription: TranscriptionType;
  user: User;
}

const Transcription: React.FC<TranscriptionProps> = ({
  transcription,
  user,
}) => {
  const [transcript, setTranscript] = useState<string>(
    transcription.transcript
  );
  const [title, setTitle] = useState<string>(transcription.title);
  const [activeTab, setActiveTab] = useState<string>("view");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formatting, setFormatting] = useState<string>("discord");

  const router = useRouter();

  useEffect(() => {
    const transcribeAudio = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/text-to-speech", {
          method: "POST",
          body: JSON.stringify({ audioURL: transcription.audioURL }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          const formattedResponse = await fetch("/api/format-text", {
            method: "POST",
            body: JSON.stringify({
              text: data.transcription,
              rephrase: false,
              formatting: formatting, // Use the selected formatting option
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const formattedData = await formattedResponse.json();
          if (formattedResponse.ok) {
            setTranscript(formattedData.formattedText);

            const titleResponse = await fetch("/api/generate-title", {
              method: "POST",
              body: JSON.stringify({ text: formattedData.formattedText }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const titleData = await titleResponse.json();
            if (titleResponse.ok) {
              setTitle(titleData.title);
              await updateDatabase(
                ref(db, `users/${user.uid}/transcriptions/${transcription.id}`),
                {
                  title: titleData.title,
                  transcript: formattedData.formattedText,
                }
              );
            } else {
              console.error("Error generating title:", titleData.error);
            }
          } else {
            console.error("Error formatting text:", formattedData.error);
          }
        } else {
          console.error("Error transcribing audio:", data.error);
        }
      } catch (error) {
        console.error("Error transcribing audio:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (transcription.title === "Untitled" && !transcription.transcript) {
      transcribeAudio();
    }
  }, [transcription, user.uid, formatting]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateDatabase(
        ref(db, `users/${user.uid}/transcriptions/${transcription.id}`),
        {
          title: title,
          transcript: transcript,
        }
      );
    } catch (error) {
      console.error("Error saving transcript:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="container mx-auto px-4 lg:p-8 p-16 flex flex-col md:flex-row relative">
        <Button
          variant="ghost"
          className="absolute left-2 top-2 lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="cursor-pointer text-lg" />
        </Button>
        <Card className="flex-1">
          <CardHeader className="pb-2 pt-4 flex-row items-center">
            <CardTitle>{title}</CardTitle>
            <div className="ml-auto space-x-2">
              <Button
                variant={activeTab === "view" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("view")}
              >
                View
              </Button>
              <Button
                variant={activeTab === "edit" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("edit")}
              >
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : activeTab === "view" ? (
              <p>{transcript}</p>
            ) : (
              <>
                <div className="relative">
                  <Textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="Enter your transcript here..."
                    className="pr-36 scrollbar-hide bg-slate-100"
                  />
                  <Select
                    value={formatting}
                    onValueChange={(value) => setFormatting(value)}
                  >
                    <SelectTrigger className="absolute top-2 right-2 w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="discord">Discord</SelectItem>
                      <SelectItem value="ios">iOS Notes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex mt-4 space-x-2">
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                  <Button variant="outline">Regenerate</Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transcription;
