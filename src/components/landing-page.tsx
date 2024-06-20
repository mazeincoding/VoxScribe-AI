"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MicIcon, RemoveFormattingIcon, UploadIcon } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import Feature from "@/components/feature";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function LandingPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && !navigator.mediaDevices) {
      console.error("navigator.mediaDevices is not supported in this browser.");
    }
  }, []);

  const handleRecordClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
    } else {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;

          mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
          };

          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, {
              type: "audio/wav",
            });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioURL(audioUrl);
            setIsDialogOpen(true);
            audioChunksRef.current = [];
          };

          mediaRecorder.start();
        } catch (err) {
          console.error("Error accessing media devices.", err);
        }
      } else {
        console.error(
          "navigator.mediaDevices.getUserMedia is not supported in this browser."
        );
      }
    }
    setIsRecording(!isRecording);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Handle file upload logic here
      console.log(files[0]);
    }
  };

  const handleRetry = () => {
    setAudioURL(null);
    setIsDialogOpen(false);
    setIsRecording(false);
  };

  return (
    <div className="flex w-full min-h-screen flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-8 py-12 md:px-16 md:py-20 lg:px-24 lg:py-24 flex items-center justify-center">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tighter text-primary-foreground sm:text-5xl md:text-6xl">
            Effortless Transcription with VoxScribe
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80 md:text-xl">
            Transform your audio and video recordings into beautifully formatted
            text with just a few clicks.
          </p>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <Button
              className={`flex-1 ${
                isRecording ? "bg-red-500 hover:bg-red-500" : ""
              }`}
              onClick={handleRecordClick}
            >
              {isRecording ? "Stop Recording" : "Record Audio"}
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={handleUploadClick}
            >
              Upload File
            </Button>
            <input
              type="file"
              accept="audio/*, video/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <Feature
              icon={<MicIcon className="h-8 w-8 text-primary-foreground" />}
              title="Record Audio"
              description="Use your device's microphone to record audio directly within the app."
            />
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
      </div>
      <div className="w-full lg:w-1/2 bg-background flex items-center justify-center">
        <div className="relative h-full p-10 flex justify-center items-center flex-col gap-4 w-full">
          <h2 className="text-3xl font-bold text-primary">See in action</h2>
          <Skeleton className="aspect-video w-full" />
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview Your Recording</DialogTitle>
            <DialogDescription>
              Listen to your recording, retry, or upload it.
            </DialogDescription>
          </DialogHeader>
          {audioURL && (
            <audio controls src={audioURL} className="w-full mt-4" />
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={handleRetry}>
              Retry
            </Button>
            <Button onClick={() => console.log("Upload logic here")}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
