import { auth } from "@/firebase/config";
import { createUserWithEmailAndPassword, User } from "firebase/auth";

export async function email_signup({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ user: User } | { error: string }> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { user: result.user };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
