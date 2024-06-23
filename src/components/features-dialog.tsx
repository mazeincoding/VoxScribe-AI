import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    title: "Language Support",
    description:
      "Added 5 new languages with auto-detection and manual selection options.",
  },
  {
    title: "File Format Support",
    description:
      "Added support for video files. Your files are automatically converted to mp3 for uploading.",
  },
  {
    title: "Transcription Speed",
    description:
      "The speed of uploading and transcription is even faster now. We use compression to reduce the size of your files.",
  },
];

const CURRENT_VERSION = "1.1.0";
const STORAGE_KEY = "featuresDialogShown";

const FeaturesList = () => (
  <ul className="list-disc pl-5 space-y-2">
    {FEATURES.map((feature, index) => (
      <li key={index}>
        {feature.title}
        {feature.description && (
          <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
        )}
      </li>
    ))}
  </ul>
);

export const FeaturesDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const shownVersion = localStorage.getItem(STORAGE_KEY);
    if (shownVersion !== CURRENT_VERSION) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(STORAGE_KEY, CURRENT_VERSION);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Features!</DialogTitle>
          <DialogDescription>
            Check out what&apos;s new in this update:
          </DialogDescription>
        </DialogHeader>
        <FeaturesList />
        <p className="text-sm text-gray-500">
          That&apos;s all we&apos;ve got for now, folks!
        </p>
        <Button onClick={handleClose}>Got it, thanks!</Button>
      </DialogContent>
    </Dialog>
  );
};
