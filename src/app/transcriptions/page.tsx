"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, readFromDatabase } from "@/firebase/config";
import { Transcription } from "@/types/transcription";
import { ref } from "firebase/database";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { Menu } from "lucide-react";
import { FeaturesDialog } from "@/components/features-dialog";

const TranscriptionsPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchTranscriptions = async () => {
      if (user?.uid) {
        const transcriptionsRef = ref(db, `users/${user.uid}/transcriptions`);
        const data = await readFromDatabase<Record<string, Transcription>>(
          transcriptionsRef
        );
        const transcriptionsArray = data ? Object.values(data) : [];
        setTranscriptions(transcriptionsArray);
      }
    };

    fetchTranscriptions();
  }, [user?.uid]);

  const filteredTranscriptions = transcriptions.filter((transcription) =>
    transcription.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-32" />
          ))}
        </div>
      );
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!user) {
      router.push("/");
      return null;
    }

    return (
      <>
        <h1 className="text-2xl font-bold mb-4 text-center text-slate-8000">
          My Transcriptions
        </h1>
        <Input
          type="text"
          placeholder="Search transcriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 bg-slate-100"
        />
        {filteredTranscriptions.length === 0 ? (
          <p>No transcriptions found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTranscriptions.map((transcription) => (
              <Card
                key={transcription.id}
                className="mb-2 cursor-pointer"
                onClick={() =>
                  router.push(`/transcriptions/${transcription.id}`)
                }
              >
                <CardHeader>
                  <CardTitle>{transcription.title || "Untitled"}</CardTitle>
                  <CardDescription>
                    {transcription.transcript
                      ? transcription.transcript.slice(0, 100) + "..."
                      : "No transcription found. Click to generate."}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 container p-4 overflow-y-auto">
        <Button
          className="lg:hidden mb-4"
          variant="outline"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        {renderContent()}
        <FeaturesDialog />
      </main>
    </div>
  );
};

export default TranscriptionsPage;
