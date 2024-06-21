"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "@/firebase/config";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { ref as dbRef, serverTimestamp, set } from "firebase/database";
import { auth } from "@/firebase/config";
import { toast } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import UploadSection from "@/components/landing-page/upload-section";
import PreviewDialog from "@/components/landing-page/preview-dialog";
import { Transcription } from "@/types/transcription";
import { v4 as uuidv4 } from "uuid";

export default function LandingPage() {
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null); // Define the ref here
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const audioUrl = URL.createObjectURL(file);
      setAudioURL(audioUrl);
      setIsDialogOpen(true);
    }
  };

  const handleRetry = () => {
    setAudioURL(null);
    setIsDialogOpen(false);
    setUploadError(null);
  };

  const handleFileUpload = async (fileOrUrl: File | string) => {
    if (!user) {
      toast.error("Please ensure you're logged in.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);

      let downloadURL = ""; // Declare and initialize downloadURL here

      if (typeof fileOrUrl === "string") {
        downloadURL = fileOrUrl;
      } else {
        const fileExtension = fileOrUrl.name.split(".").pop() || "";
        const fileNameWithoutExtension = fileOrUrl.name.replace(
          `.${fileExtension}`,
          ""
        );
        const storagePath = `users/${user.uid}/${fileNameWithoutExtension}.${fileExtension}`;

        const fileStorageRef = storageRef(storage, storagePath);
        const uploadTask = uploadBytesResumable(fileStorageRef, fileOrUrl);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            reject,
            async () => {
              downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      const id = uuidv4();
      const transcription: Transcription = {
        id,
        title: "Untitled",
        transcript: "",
        audioURL: downloadURL,
        userId: user.uid,
        createdAt: serverTimestamp(),
      };
      await set(
        dbRef(db, `users/${user.uid}/transcriptions/${id}`),
        transcription
      );
      toast.success("File processed successfully!");
      router.push(`/dashboard/transcriptions/${id}`);
    } catch (error) {
      setUploadError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpload = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSampleClick = async () => {
    try {
      const sampleRef = storageRef(storage, "sample.mp3");
      const sampleURL = await getDownloadURL(sampleRef);
      handleFileUpload(sampleURL);
    } catch (error) {
      toast.error("Error loading sample file. Please try again.");
    }
  };

  return (
    <div className="flex w-full min-h-screen flex-col lg:flex-row">
      <UploadSection
        onFileChange={handleFileChange}
        onSampleClick={handleSampleClick}
        loading={loading}
        fileInputRef={fileInputRef}
      />
      <div className="w-full lg:w-1/2 bg-background flex items-center justify-center">
        <div className="relative h-full p-10 flex justify-center items-center flex-col gap-4 w-full">
          <h2 className="text-3xl font-bold text-primary">See in action</h2>
          <Skeleton className="aspect-video w-full" />
        </div>
      </div>
      <PreviewDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        audioURL={audioURL}
        uploadError={uploadError}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        onRetry={handleRetry}
        onUpload={handleUpload}
      />
    </div>
  );
}
