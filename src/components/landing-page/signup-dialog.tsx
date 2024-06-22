import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import toast from "react-hot-toast";

export default function SignupDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignupWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (result.user) {
        onClose();
        toast.success("Wohoo! You can now start transcribing.");
      }
    } catch (error) {
      toast.error("Failed to sign up. Please try again.");
    }
  };

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
        <form onSubmit={handleSignupWithEmail}>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button className="w-full" type="submit">
              Sign Up with Email
            </Button>
          </DialogFooter>
        </form>
        <div>
          <Button
            variant="outline"
            className="w-full space-x-2"
            onClick={handleSignupWithGoogle}
          >
            <GoogleIcon />
            <span>Sign Up with Google</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
