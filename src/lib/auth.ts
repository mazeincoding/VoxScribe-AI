import { auth } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  User,
  AuthError,
  getIdToken,
} from "firebase/auth";

export async function email_signup({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ user: User } | { error: string }> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Get ID token and create session cookie
    const token = await getIdToken(result.user);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to create session");
    }

    return { user: result.user };
  } catch (error) {
    const auth_error = error as AuthError;

    // Map Firebase error codes to user-friendly messages
    const error_messages: Record<string, string> = {
      "auth/email-already-in-use":
        "An account with this email already exists. Please [/login](login)",
      "auth/invalid-email": "Please enter a valid email address",
      "auth/weak-password": "Password should be at least 6 characters long",
      "auth/network-request-failed":
        "Network error - please check your connection",
    };

    return {
      error: error_messages[auth_error.code] || "An unexpected error occurred",
    };
  }
}
