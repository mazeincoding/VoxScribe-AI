import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/config";
import toast from "react-hot-toast";

export default function SignupDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const handleSignupWithGoogle = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    if (result.user) {
      onClose();
      toast.success("Wohoo! You can now start transcribing.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Sign Up</DialogTitle>
        </DialogHeader>
        <form>
          <div className="mb-4">
            <Input type="text" placeholder="Username" required />
          </div>
          <div className="mb-4">
            <Input type="email" placeholder="Email" required />
          </div>
          <div className="mb-4">
            <Input type="password" placeholder="Password" required />
          </div>
          <DialogFooter>
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </DialogFooter>
        </form>
        <Button
          variant="outline"
          className="space-x-2"
          onClick={handleSignupWithGoogle}
        >
          <GoogleIcon />
          <span>Sign Up with Google</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
