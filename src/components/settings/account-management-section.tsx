import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  User,
  reauthenticateWithCredential,
  EmailAuthProvider,
  reauthenticateWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";

interface AccountManagementSectionProps {
  user: User;
  isPasswordProvider: boolean;
}

const AccountManagementSection: React.FC<AccountManagementSectionProps> = ({
  user,
  isPasswordProvider,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");

  const handleDeleteAccount = async () => {
    if (!user) {
      toast.error("User not found. Please try logging in again.");
      return;
    }

    try {
      if (isPasswordProvider) {
        if (!currentPassword) {
          toast.error(
            "Please enter your current password to confirm account deletion."
          );
          return;
        }
        const credential = EmailAuthProvider.credential(
          user.email!,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);
      } else {
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(user, provider);
      }

      await user.delete();
      toast.success(
        "Your account has been successfully deleted. We're sorry to see you go."
      );
    } catch (error) {
      console.error("Error deleting account:", error);
      handleDeleteAccountError(error);
    }
  };

  const handleDeleteAccountError = (error: unknown) => {
    let errorMessage =
      "An unexpected error occurred while deleting your account. Please try again later.";

    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/wrong-password":
        case "auth/invalid-credential":
          errorMessage =
            "The password you entered is incorrect. Please try again.";
          break;
        case "auth/too-many-requests":
          errorMessage =
            "Too many unsuccessful attempts. Please try again later.";
          break;
        case "auth/user-mismatch":
          errorMessage =
            "The provided credentials do not match the current user. Please log out and log in again.";
          break;
        case "auth/user-not-found":
          errorMessage =
            "User not found. The account may have already been deleted.";
          break;
        case "auth/requires-recent-login":
          errorMessage =
            "For security reasons, please log out and log back in before deleting your account.";
          break;
        case "auth/popup-closed-by-user":
          errorMessage =
            "The reauthentication popup was closed. Please try again to delete your account.";
          break;
        default:
          errorMessage =
            "An error occurred while deleting your account. Please try again or contact support.";
      }
    }

    toast.error(errorMessage);
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Account Management</h2>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete Account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {isPasswordProvider ? (
            <div className="mb-4">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
          ) : (
            <p className="mb-4">
              You will be redirected to Google to confirm account deletion.
            </p>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default AccountManagementSection;
