"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoadingBar from "@/components/ui/loading-bar";

interface PreviewDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  audioURL: string | null;
  uploadError: string | null;
  isUploading: boolean;
  uploadProgress: number;
  onRetry: () => void;
  onUpload: () => void;
}

export default function PreviewDialog({
  isOpen,
  onOpenChange,
  audioURL,
  uploadError,
  isUploading,
  uploadProgress,
  onRetry,
  onUpload,
}: PreviewDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preview Your Recording</DialogTitle>
          <DialogDescription>
            Listen to your recording, retry, or upload it.
          </DialogDescription>
        </DialogHeader>
        {audioURL && <audio controls src={audioURL} className="w-full mt-4" />}
        {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
        {isUploading && <LoadingBar progress={uploadProgress} />}
        <DialogFooter className="space-y-2 sm:space-y-0">
          <Button variant="secondary" onClick={onRetry} disabled={isUploading}>
            Retry
          </Button>
          <Button onClick={onUpload} disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
