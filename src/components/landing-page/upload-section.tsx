"use client";

import { Button } from "@/components/ui/button";
import { UploadIcon, RemoveFormattingIcon } from "@/components/icons";
import Feature from "@/components/landing-page/feature";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface UploadSectionProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSampleClick: () => Promise<void>;
  loading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  onFileChange,
  onSampleClick,
  loading,
  fileInputRef,
}) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleTranscriptionsClick = () => {
    router.push("/dashboard");
  };

  return (
    <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6">Upload Your Audio or Video</h1>
      <p className="text-lg mb-8">
        Upload an MP3 audio file or MP4/MOV/WebM video file to get started
      </p>
      <input
        type="file"
        accept="audio/mpeg,video/mp4,video/quicktime,video/webm"
        onChange={onFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <div className="mt-8 flex flex-col sm:flex-row w-full">
        <Button
          className="flex-1"
          onClick={handleUploadClick}
          disabled={loading}
        >
          Upload File
        </Button>
        <Button
          variant="secondary"
          className="flex-1 ml-0 mt-3 sm:mt-0 sm:ml-3"
          onClick={onSampleClick}
          disabled={loading}
        >
          Try Sample
        </Button>
      </div>
      {user && (
        <Button
          variant="secondary"
          className="flex-1 w-full mt-3"
          onClick={handleTranscriptionsClick}
        >
          My Dashboard
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
  );
};

export default UploadSection;
