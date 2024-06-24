"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "@/firebase/config";
import { toast } from "react-hot-toast";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import UploadSection from "@/components/landing-page/sections/section-1/upload-section";
import PreviewDialog from "@/components/landing-page/sections/section-1/preview-dialog";
import Footer from "./footer";
import {
  validateFile,
  uploadFile,
  saveTranscription,
  convertToMp3,
} from "@/lib/upload-helpers";
import SignupDialog from "@/components/landing-page/signup-dialog";
import Header from "./header";
import ReadabilitySection from "./sections/section-2/readability-section";
import WhySection from "./sections/section-3/why-section";
import Section4 from "./sections/section-4/section-4";

const LandingPage = () => {
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && validateFile(file)) {
      let processedFile = file;
      if (file.type.startsWith("video/")) {
        setIsUploading(true);
        toast.loading("Converting video to audio...");
        try {
          processedFile = await convertToMp3(file);
          toast.success("Video converted successfully!");
        } catch (error) {
          toast.error("Error converting video. Please try again.");
          setIsUploading(false);
          return;
        }
      }
      setAudioURL(URL.createObjectURL(processedFile));
      setIsDialogOpen(true);
      setIsUploading(false);
    }
  };

  const handleFileUpload = async (fileOrUrl: File | string) => {
    if (!user) {
      toast.error("Please ensure you're logged in.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);

      const downloadURL =
        typeof fileOrUrl === "string"
          ? fileOrUrl
          : await uploadFile(fileOrUrl, user.uid, setUploadProgress);

      const id = await saveTranscription(user.uid, downloadURL);

      toast.success("File processed successfully!");
      router.push(`/transcriptions/${id}`);
    } catch (error) {
      setUploadError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpload = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleSampleClick = () => {
    if (user) {
      handleSampleUpload();
    } else {
      setIsSignupDialogOpen(true);
    }
  };

  const handleSampleUpload = async () => {
    try {
      setIsUploading(true);
      const sampleURL = await getDownloadURL(storageRef(storage, "sample.mp3"));
      await handleFileUpload(sampleURL);
    } catch (error) {
      toast.error("Error loading sample file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    if (user) {
      fileInputRef.current?.click();
    } else {
      setIsSignupDialogOpen(true);
    }
  };

  return (
    <>
      <Header />
      <div className="flex w-full min-h-screen flex-col lg:flex-row">
        <UploadSection
          onFileChange={handleFileChange}
          onSampleClick={handleSampleClick}
          onUploadClick={handleUploadClick}
          loading={isUploading}
          fileInputRef={fileInputRef}
          user={user}
        />
        <div className="w-full lg:w-1/2 bg-background flex items-center justify-center min-h-[400px]">
          <div className="relative w-full h-full p-10 flex justify-center items-center flex-col gap-4">
            <h2 className="text-3xl font-bold text-primary">See in action</h2>
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                src="https://player.vimeo.com/video/965432017?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                className="absolute top-0 left-0 w-full h-full"
                title="AI Powered Transcription tool. Format with AI."
              />
            </div>
          </div>
        </div>
        <PreviewDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          audioURL={audioURL}
          uploadError={uploadError}
          isUploading={isUploading}
          uploadProgress={uploadProgress}
          onRetry={() => {
            setAudioURL(null);
            setIsDialogOpen(false);
            setUploadError(null);
          }}
          onUpload={handleUpload}
        />
      </div>
      <ReadabilitySection />
      <WhySection />
      <Section4 user={user ?? null} />
      <Footer />
      <SignupDialog
        isOpen={isSignupDialogOpen}
        onClose={() => setIsSignupDialogOpen(false)}
        onSuccess={() => {
          setIsSignupDialogOpen(false);
          fileInputRef.current?.click();
        }}
      />
    </>
  );
};

export default LandingPage;
