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
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignupSuccess = () => {
    onClose();
    toast.success("Wohoo! You can now start transcribing.");
    onSuccess();
  };

  const handleSignupWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (result.user) {
        handleSignupSuccess();
      }
    } catch (error) {
      toast.error("Failed to sign up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      if (result.user) {
        handleSignupSuccess();
      }
    } catch (error) {
      toast.error("Failed to sign up with Google. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Sign Up</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSignupWithEmail}>
          <input
            type="text"
            style={{ position: "absolute", left: "-9999px" }}
            tabIndex={-1}
            autoFocus
          />
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
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up with Email"}
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
