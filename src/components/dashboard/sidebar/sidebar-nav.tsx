import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SidebarLink from "./sidebar-link";
import SidebarTranscripts from "./sidebar-transcripts";
import { FileText, Home, Plus } from "lucide-react";
import { Transcription } from "@/types/transcription";

interface SidebarNavProps {
  isOpen: boolean;
  showTranscripts: boolean;
  setShowTranscripts: (show: boolean) => void;
  transcriptionsData: { transcriptions: Transcription[] };
  setVideoUploadDialogOpen: (isOpen: boolean) => void; // New prop
}

interface SubLink {
  label: string;
  href: string;
}

export interface Link {
  label: string;
  href: string;
  icon: React.ReactNode;
  subLinks?: SubLink[];
}

const SidebarNav: React.FC<SidebarNavProps> = ({
  isOpen,
  showTranscripts,
  setShowTranscripts,
  transcriptionsData = { transcriptions: [] },
  setVideoUploadDialogOpen, // New prop
}) => {
  const links: Link[] = [
    {
      label: "Transcriptions",
      href: "/transcriptions",
      icon: <FileText />,
    },
    {
      label: "Create",
      href: "/new-transcription",
      icon: <Plus />,
    },
  ];

  const toggleTranscripts = () => {
    setShowTranscripts(!showTranscripts);
  };

  return (
    <motion.nav
      className="flex-1 mt-2 relative"
      initial={false}
      animate={{ x: showTranscripts ? "-100%" : "0%" }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <motion.ul
        className="absolute top-0 left-0 w-full"
        animate={{ opacity: showTranscripts ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence>
          {links.map((link) => (
            <SidebarLink
              key={link.href}
              link={link}
              isOpen={isOpen}
              toggleTranscripts={toggleTranscripts}
              setVideoUploadDialogOpen={setVideoUploadDialogOpen} // Pass the handler
            />
          ))}
        </AnimatePresence>
      </motion.ul>
      <SidebarTranscripts
        isOpen={isOpen}
        showTranscripts={showTranscripts}
        toggleTranscripts={toggleTranscripts}
        transcriptionsData={transcriptionsData}
      />
    </motion.nav>
  );
};

export default SidebarNav;
