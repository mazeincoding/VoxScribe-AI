"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Transcription from "@/components/dashboard/transcription";
import { auth, db, readFromDatabase } from "@/firebase/config";
import { ref } from "firebase/database";
import { useParams } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { Transcription as TranscriptionType } from "@/types/transcription";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";

export default function TranscriptionPage() {
  const { id } = useParams();
  const [user, loading] = useAuthState(auth);
  const [transcription, setTranscription] = useState<TranscriptionType | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
      return;
    }

    const fetchTranscription = async () => {
      if (user) {
        try {
          const transcriptionData = await readFromDatabase(
            ref(db, `users/${user.uid}/transcriptions/${id}`)
          );
          setTranscription(transcriptionData as TranscriptionType);
        } catch (err) {
          console.error("Error fetching transcription:", err);
          setError("Failed to fetch transcription.");
          toast.error("Failed to fetch transcription.");
        }
      }
    };

    fetchTranscription();
  }, [user, id, loading, router]);

  if (loading) {
    return <Skeleton className="h-screen w-full" />;
  }

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }

  return transcription ? (
    <Transcription transcription={transcription} user={user!} />
  ) : (
    <Skeleton className="h-screen w-full" />
  );
}
