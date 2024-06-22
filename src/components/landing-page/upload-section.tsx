"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UploadIcon, RemoveFormattingIcon } from "@/components/icons";
import { Input } from "@/components/ui/input";
import Feature from "@/components/landing-page/feature";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import SignupDialog from "@/components/landing-page/signup-dialog";
import { ChevronRight } from "lucide-react";

interface UploadSectionProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSampleClick: () => void;
  loading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

export default function UploadSection({
  onFileChange,
  onSampleClick,
  loading,
  fileInputRef,
}: UploadSectionProps) {
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleUploadClick = () => {
    if (!user) {
      setIsSignupDialogOpen(true);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleButtonClick = (action: () => void) => {
    if (!user) {
      setIsSignupDialogOpen(true);
      return;
    }
    action();
  };

  const handleTranscriptionsClick = () => {
    router.push("/transcriptions");
  };

  return (
    <div className="w-full lg:w-1/2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-8 py-12 md:px-16 md:py-20 lg:px-24 lg:py-24 flex items-center justify-center">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tighter text-primary-foreground sm:text-5xl md:text-6xl">
          Effortless Transcription with VoxScribe
        </h1>
        <p className="mt-4 text-lg text-primary-foreground/80 md:text-xl">
          Transform your audio and video recordings into beautifully{" "}
          <strong className="text-white">formatted</strong> text with just a few
          clicks.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row">
          <Button
            className="flex-1"
            onClick={() => handleButtonClick(handleUploadClick)}
            disabled={loading}
          >
            Upload File
          </Button>
          <Button
            variant="secondary"
            className="flex-1 ml-0 mt-3 sm:mt-0 sm:ml-3"
            onClick={() => handleButtonClick(onSampleClick)}
            disabled={loading}
          >
            Try Sample
          </Button>
          <Input
            type="file"
            accept="audio/*"
            ref={fileInputRef}
            className="hidden"
            onChange={onFileChange}
          />
        </div>
        {user && (
          <Button
            variant="secondary"
            className="flex-1 w-full mt-3"
            onClick={handleTranscriptionsClick}
          >
            My Transcriptions
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
        <div className="mt-8 flex flex-col gap-4">
          <Feature
            icon={<UploadIcon className="h-8 w-8 text-primary-foreground" />}
            title="Upload File"
            description="Drag and drop or select your audio or video files to be transcribed."
          />
          <Feature
            icon={
              <RemoveFormattingIcon className="h-8 w-8 text-primary-foreground" />
            }
            title="Formatted Text"
            description="Get your transcribed text with headings, bold, lists, and more."
          />
        </div>
      </div>
      <SignupDialog
        isOpen={isSignupDialogOpen}
        onClose={() => setIsSignupDialogOpen(false)}
      />
    </div>
  );
}
