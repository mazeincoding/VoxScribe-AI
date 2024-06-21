import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Transcription } from "@/types/transcription";

interface SidebarTranscriptsProps {
  isOpen: boolean;
  showTranscripts: boolean;
  toggleTranscripts: () => void;
  transcriptionsData: { transcriptions: Transcription[] };
}

const SidebarTranscripts: React.FC<SidebarTranscriptsProps> = ({
  isOpen,
  showTranscripts,
  toggleTranscripts,
  transcriptionsData = { transcriptions: [] },
}) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname.startsWith(href);

  // Sort transcriptions by createdAt in descending order (most recent first)
  const sortedTranscriptions = [...transcriptionsData.transcriptions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <motion.ul
      className="absolute top-0 left-full w-full"
      animate={{
        opacity: showTranscripts ? 1 : 0,
        x: showTranscripts ? "-0%" : "0%",
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.li
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="p-2 rounded-md cursor-pointer flex items-center hover:bg-gray-100 border mb-2"
      >
        <Breadcrumb className="flex items-center">
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={toggleTranscripts}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-muted-foreground" />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium text-foreground">
              Transcriptions
            </BreadcrumbPage>
          </BreadcrumbItem>
        </Breadcrumb>
      </motion.li>
      <AnimatePresence>
        {sortedTranscriptions.map((transcript) => (
          <Link
            key={transcript.id}
            href={`/dashboard/transcriptions/${transcript.id}`}
            className="block"
          >
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn("p-2 rounded-md cursor-pointer", {
                "bg-gray-200": isActive(`/transcriptions/${transcript.id}`),
                "hover:bg-gray-100": !isActive(
                  `/transcriptions/${transcript.id}`
                ),
              })}
            >
              <span className="block truncate">
                {transcript.title.length > 20
                  ? `${transcript.title.substring(0, 20)}..`
                  : transcript.title}
              </span>
            </motion.li>
          </Link>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};

export default SidebarTranscripts;
