import React from "react";
import { motion } from "framer-motion";

interface SidebarHeaderProps {
  isOpen: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isOpen }) => {
  return (
    <motion.header
      initial={false}
      animate={{
        height: "auto",
        opacity: 1,
        transition: { duration: 0.2, ease: "easeInOut" },
      }}
      className="flex items-center justify-between p-2 border-b pl-0 overflow-hidden"
    >
      <span className="text-lg font-semibold">
        {isOpen ? "VoxScribe" : "VSX"}
      </span>
    </motion.header>
  );
};

export default SidebarHeader;
