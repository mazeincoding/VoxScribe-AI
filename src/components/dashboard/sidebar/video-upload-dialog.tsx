import React, { useRef, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  validateFile,
  uploadFile,
  saveTranscription,
} from "@/lib/upload-helpers";

interface VideoUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoUploadDialog: React.FC<VideoUploadDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedModel, setSelectedModel] = useState("llama3-70b-8192");

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        const selectedFile = files[0];
        if (validateFile(selectedFile)) {
          setFile(selectedFile);
        }
      }
    },
    []
  );

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!file || !user) return;

    try {
      setIsUploading(true);
      const downloadURL = await uploadFile(file, user.uid, setUploadProgress);
      const id = await saveTranscription(user.uid, downloadURL);

      toast.success("File uploaded successfully!");
      router.push(`/transcriptions/${id}/${selectedModel}`);
    } catch (error) {
      toast.error("An error occurred during upload. Please try again.");
    } finally {
      setIsUploading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Video</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="flex flex-col items-center">
          <div className="mb-4 w-full">
            <Input
              type="file"
              accept="audio/mpeg,audio/mp4,audio/x-m4a,video/mp4,video/quicktime,video/webm"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="mb-4"
              style={{ display: "none" }}
            />
            <Button onClick={handleButtonClick} className="w-full mb-4">
              Choose File
            </Button>
            <Select
              defaultValue={selectedModel}
              onValueChange={(value) => setSelectedModel(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="llama3-70b-8192">LLama3</SelectItem>
                <SelectItem value="llama3-8b-8192">LLama2</SelectItem>
                <SelectItem value="gemma-7b-it">Gemma 7B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {isUploading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}
          <Button
            onClick={handleUpload}
            disabled={isUploading || !file}
            className="w-full"
          >
            {isUploading ? "Uploading..." : "Upload"}
            <ChevronRight className="ml-1" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoUploadDialog;
