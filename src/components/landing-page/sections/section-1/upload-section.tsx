"use client";

import { Button } from "@/components/ui/button";
import { UploadIcon, RemoveFormattingIcon } from "@/components/icons";
import Feature from "@/components/landing-page/sections/section-1/feature";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { ChevronRight, Coins, GiftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "../../../ui/input";

interface UploadSectionProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSampleClick: () => void;
  onUploadClick: () => void; // Added this new prop
  loading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  user: any | null;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  onFileChange,
  onSampleClick,
  onUploadClick, // Using this new prop
  loading,
  fileInputRef,
  user,
}) => {
  const router = useRouter();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full py-16 lg:px-20 lg:w-1/2 p-8 flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 shadow-xl">
      <h1 className="text-4xl w-full text-center font-bold mb-4 text-white">
        The #1 AI-powered transcription app that smartly formats your audio.
      </h1>
      <p className="text-lg w-full text-center mb-6 text-white opacity-80">
        Say goodbye to unreadable transcriptions. Meet VoxScribe -{" "}
        <strong className="text-white">the #1 transcription app</strong> that
        formats your audio in a way that just makes sense.
      </p>
      <Input
        type="file"
        accept="audio/mpeg,audio/mp4,audio/x-m4a,video/mp4,video/quicktime,video/webm"
        onChange={onFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <div className="flex flex-col sm:flex-row w-full gap-4 mb-4">
        <Button
          className="flex-1 bg-white text-purple-600 hover:bg-purple-100 transition-colors duration-300"
          onClick={onUploadClick} // Using this new prop
          disabled={loading}
        >
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload File
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-white/25 border-white/50 text-white hover:bg-white hover:text-purple-600 transition-colors duration-300"
          onClick={onSampleClick}
          disabled={loading}
        >
          Try Sample
        </Button>
      </div>
      {user && (
        <Button
          variant="outline"
          className="w-full bg-white/25 border-white/50 text-white hover:bg-white hover:text-purple-600 transition-colors duration-300"
          onClick={() => router.push("/transcriptions")}
        >
          My Dashboard
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      )}
      <div className="mt-8 w-full flex flex-col gap-6">
        <Feature
          icon={<UploadIcon className="h-8 w-8 text-white" />}
          title="AI-Powered"
          description="VoxScribe uses cutting-edge AI to transcribe your audio and video files."
        />
        <Feature
          icon={<RemoveFormattingIcon className="h-8 w-8 text-white" />}
          title="Smart Formatting"
          description="VoxScribe's AI transcribes and formats your content, making it instantly readable. Bye messy transcripts!"
        />
        <Feature
          icon={<GiftIcon className="h-8 w-8 text-white" />}
          title="Free, Forever"
          description="VoxScribe is free and open-source. No hidden fees, no subscriptions. Just transcribe and format."
        />
      </div>
    </div>
  );
};

export default UploadSection;
