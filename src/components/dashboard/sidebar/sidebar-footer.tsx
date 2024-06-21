import React, { useState } from "react";
import { User } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface SidebarFooterProps {
  handleLogout: () => void;
  setDropdownOpen: (isOpen: boolean) => void; // New prop
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({
  handleLogout,
  setDropdownOpen,
}) => {
  const [user] = useAuthState(auth);

  return (
    <DropdownMenu onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center p-2 cursor-pointer hover:bg-gray-100 overflow-hidden">
          <User className="mr-2" />
          <span className="flex-1 truncate">{user?.email}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>Credits: $1</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarFooter;
