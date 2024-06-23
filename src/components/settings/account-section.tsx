import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { updateEmail, updatePassword, User } from "firebase/auth";
import { FirebaseError } from "firebase/app";

interface AccountSectionProps {
  user: User;
  isPasswordProvider: boolean;
}

const AccountSection: React.FC<AccountSectionProps> = ({ user, isPasswordProvider }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdateAccount = async () => {
    try {
      if (isPasswordProvider && email) {
        await updateEmail(user, email);
      }
      if (isPasswordProvider && password) {
        await updatePassword(user, password);
      }
      toast.success("Account updated successfully");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error updating account:", error);
      let errorMessage = "An error occurred while updating your account.";
      
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/requires-recent-login":
            errorMessage = "For security reasons, please log out and log back in before making this change.";
            break;
          case "auth/email-already-in-use":
            errorMessage = "This email is already in use by another account.";
            break;
          case "auth/invalid-email":
            errorMessage = "Please enter a valid email address.";
            break;
          case "auth/weak-password":
            errorMessage = "Password should be at least 6 characters long.";
            break;
          default:
            errorMessage = error.message;
        }
      }
      
      toast.error(errorMessage);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Account</h2>
      <div className="space-y-4">
        {isPasswordProvider && (
          <>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={user.email || "your@email.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleUpdateAccount}>Update Account</Button>
          </>
        )}
        {!isPasswordProvider && (
          <p>You used Google to sign up. You cannot change your email or password here.</p>
        )}
      </div>
    </section>
  );
};

export default AccountSection;
