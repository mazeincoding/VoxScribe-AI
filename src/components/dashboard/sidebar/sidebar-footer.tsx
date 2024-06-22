import React, { useState } from "react";
import { User } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface SidebarFooterProps {
  handleLogout: () => void;
  setDropdownOpen: (isOpen: boolean) => void; // New prop
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({
  handleLogout,
  setDropdownOpen,
}) => {
  const [user] = useAuthState(auth);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center p-2 cursor-pointer hover:bg-gray-100 overflow-hidden">
            <User className="mr-2" />
            <span className="flex-1 truncate">{user?.email}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
            Support Us
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div />
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Support Us</DialogTitle>
          <DialogDescription>
            VoxScribe is a labor of love, dedicated to providing you with a
            seamless, ad-free experience. We believe in keeping your data
            private and secure, without any hidden costs.
            <br />
            <br />
            However, maintaining and improving this platform requires
            significant time and resources. Your support can make a huge
            difference. If VoxScribe has helped you in the past, please consider
            making a donation. Every contribution, no matter the size, helps us
            continue to serve you better.
            <br />
            <br />
            Thank you for your support.
          </DialogDescription>
          <div>
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=UB3UGVXAJA9LG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Donate via PayPal
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SidebarFooter;