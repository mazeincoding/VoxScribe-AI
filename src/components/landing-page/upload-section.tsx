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
    <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold mb-4 text-white">
        Upload Your Audio or Video
      </h1>
      <p className="text-lg mb-6 text-white opacity-80">
        Upload an MP3 audio file or MP4/MOV/WebM video file to get started
      </p>
      <input
        type="file"
        accept="audio/mpeg,video/mp4,video/quicktime,video/webm"
        onChange={onFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      <div className="flex flex-col sm:flex-row w-full max-w-md gap-4 mb-4">
        <Button
          className="flex-1 bg-white text-purple-600 hover:bg-purple-100 transition-colors duration-300"
          onClick={handleUploadClick}
          disabled={loading}
        >
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload File
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-transparent bg-white/25 border-white text-white hover:bg-white hover:text-purple-600 transition-colors duration-300"
          onClick={onSampleClick}
          disabled={loading}
        >
          Try Sample
        </Button>
      </div>
      {user && (
        <Button
          variant="outline"
          className="w-full max-w-md bg-transparent bg-white/25 border-white text-white hover:bg-white hover:text-purple-600 transition-colors duration-300"
          onClick={handleTranscriptionsClick}
        >
          My Dashboard
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      )}
      <div className="mt-8 flex flex-col gap-6">
        <Feature
          icon={<UploadIcon className="h-8 w-8 text-white" />}
          title="Easy Upload"
          description="Drag and drop or select your audio or video files to be transcribed."
        />
        <Feature
          icon={<RemoveFormattingIcon className="h-8 w-8 text-white" />}
          title="Smart Formatting"
          description="Get your transcribed text with headings, bold, lists, and more."
        />
      </div>
    </div>
  );
};

export default UploadSection;
