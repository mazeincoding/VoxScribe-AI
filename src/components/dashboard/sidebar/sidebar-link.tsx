import React from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link"; // Import Link
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface SidebarLinkProps {
  link: {
    label: string;
    href: string;
    icon: React.ReactNode;
    subLinks?: { label: string; href: string }[];
  };
  isOpen: boolean;
  toggleTranscripts: () => void;
  setVideoUploadDialogOpen: (isOpen: boolean) => void; // New prop
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  link,
  isOpen,
  toggleTranscripts,
  setVideoUploadDialogOpen,
}) => {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === "/transcriptions") {
      return pathname.startsWith("/transcriptions/");
    }
    return pathname === href;
  };
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (link.label === "Transcriptions") {
      toggleTranscripts();
    } else if (link.label === "Create") {
      setVideoUploadDialogOpen(true); // Open the dialog
    } else {
      router.push(link.href);
    }
  };

  return (
    <Link href={link.href} onClick={handleClick}>
      <motion.li
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "p-2 rounded-lg cursor-pointer flex items-center justify-between",
          {
            "bg-gray-200": isActive(link.href),
            "hover:bg-gray-100": !isActive(link.href),
          }
        )}
      >
        <div className="flex items-center">
          <span className="flex-shrink-0">{link.icon}</span>
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: isOpen ? "auto" : 0,
              opacity: isOpen ? 1 : 0,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            className="ml-2 overflow-hidden whitespace-nowrap"
          >
            {isOpen && link.label}
          </motion.span>
        </div>
        {link.subLinks && isOpen && (
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleTranscripts();
            }}
            className="px-1 size-auto"
          >
            <ChevronRight />
          </Button>
        )}
      </motion.li>
    </Link>
  );
};

export default SidebarLink;
