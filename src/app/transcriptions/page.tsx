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
        const data =
          await readFromDatabase<Record<string, Transcription>>(
            transcriptionsRef,
          );
        const transcriptionsArray = data ? Object.values(data) : [];
        setTranscriptions(transcriptionsArray);
      }
    };

    fetchTranscriptions();
  }, [user?.uid]);

  const filteredTranscriptions = transcriptions.filter((transcription) =>
    transcription.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="py-4">
          <h1 className="text-slate-8000 mb-4 text-center text-2xl font-bold">
            My Transcriptions
          </h1>
          <Input
            type="text"
            placeholder="Search transcriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 bg-slate-100"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-32 w-full" />
            ))}
          </div>
        </div>
      );
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div className="py-4">
        <h1 className="text-slate-8000 mb-4 text-center text-2xl font-bold">
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="container flex-1 overflow-y-auto p-4">
        <Button
          className="mb-4 lg:hidden"
          size="icon"
          variant="outline"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        {renderContent()}
      </main>
    </div>
  );
};

export default TranscriptionsPage;
