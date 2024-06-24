"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, db, readFromDatabase } from "@/firebase/config";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import SidebarHeader from "./sidebar-header";
import SidebarNav from "./sidebar-nav";
import SidebarFooter from "./sidebar-footer";
import { Transcription } from "@/types/transcription";
import { ref } from "firebase/database";
import VideoUploadDialog from "@/components/dashboard/sidebar/video-upload-dialog"; // Import the new dialog component

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [showTranscripts, setShowTranscripts] = useState(false);
  const [transcriptionsData, setTranscriptionsData] = useState<Transcription[]>(
    []
  );
  const [user, authLoading, authError] = useAuthState(auth);
  const [isDropdownOpen, setDropdownOpen] = useState(false); // New state
  const [isVideoUploadDialogOpen, setVideoUploadDialogOpen] = useState(false); // New state

  const handleLogout = async () => {
    const success = await signOut();
    if (success) {
      toast.success("You have been logged out!");
      router.push("/");
    } else {
      console.error("Logout failed:", signOutError);
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    if (!isHovered && !showTranscripts && !isDropdownOpen) {
      setIsOpen(false);
    }
    setIsOpen(isHovered || isDropdownOpen);
  }, [isHovered, showTranscripts, isDropdownOpen, setIsOpen]);

  useEffect(() => {
    const fetchTranscriptions = async () => {
      if (user?.uid) {
        const transcriptionsRef = ref(db, `users/${user.uid}/transcriptions`);
        const data = await readFromDatabase<Record<string, Transcription>>(
          transcriptionsRef
        );
        const transcriptionsArray = data ? Object.values(data) : [];
        setTranscriptionsData(transcriptionsArray);
      }
    };

    fetchTranscriptions();
  }, [user?.uid]);

  return (
    <>
      <motion.div
        className={cn(
          "fixed -translate-x-full transition-transform lg:translate-x-0 shadow-lg bg-background z-50 lg:static h-full text-black flex flex-col border-r flex-shrink-0 overflow-hidden",
          {
            "lg:w-[80px]": !isOpen,
            "lg:w-64 translate-x-0": isOpen,
          }
        )}
        initial={false}
        animate={{
          width: isOpen ? "16rem" : "5rem",
          transition: { duration: 0.2, ease: "easeInOut" },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          if (!showTranscripts && !isDropdownOpen) {
            setIsHovered(false);
          }
        }}
      >
        <div className="flex flex-col h-full relative p-4">
          <SidebarHeader isOpen={isOpen} />
          <SidebarNav
            isOpen={isOpen}
            showTranscripts={showTranscripts}
            setShowTranscripts={setShowTranscripts}
            transcriptionsData={{ transcriptions: transcriptionsData }}
            setVideoUploadDialogOpen={setVideoUploadDialogOpen}
          />
          <SidebarFooter
            handleLogout={handleLogout}
            setDropdownOpen={setDropdownOpen}
          />
        </div>
      </motion.div>
      <VideoUploadDialog
        isOpen={isVideoUploadDialogOpen}
        onClose={() => setVideoUploadDialogOpen(false)}
      />
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden fixed inset-0 bg-black/25 z-40 w-full h-screen"
          onClick={() => setIsOpen(false)}
        ></motion.div>
      )}
    </>
  );
};

export default Sidebar;
