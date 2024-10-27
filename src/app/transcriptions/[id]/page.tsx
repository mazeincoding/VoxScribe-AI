"use client";

import { useParams } from "next/navigation";
import Transcription from "@/components/dashboard/transcription/transcription";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/config";
import { useEffect, useState } from "react";
import { Transcription as TranscriptionType } from "@/types/transcription";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";
import { ref, get } from "firebase/database";

export default function TranscriptionPage() {
  const params = useParams();
  const id = params.id as string;
  const [user, loading] = useAuthState(auth);
  const [transcription, setTranscription] = useState<TranscriptionType | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTranscription = async () => {
      if (user && id) {
        try {
          const transcriptionRef = ref(
            db,
            `users/${user.uid}/transcriptions/${id}`
          );
          const snapshot = await get(transcriptionRef);
          if (snapshot.exists()) {
            setTranscription(snapshot.val());
          } else {
            setError("Transcription not found.");
            toast.error("Transcription not found.");
          }
        } catch (error) {
          console.error("Error fetching transcription:", error);
          setError("Failed to fetch transcription.");
          toast.error("Failed to fetch transcription.");
        }
      }
    };

    fetchTranscription();
  }, [user, id]);

  if (loading) {
    return <Skeleton className="h-screen w-full" />;
  }

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }

  return transcription ? (
    <>
      <Transcription transcription={transcription} user={user!} />
    </>
  ) : (
    <Skeleton className="h-screen w-full" />
  );
}
