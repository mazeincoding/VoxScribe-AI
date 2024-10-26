"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { email_signup } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export function AuthForm({ type }: { type: "login" | "signup" }) {
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [accepted_terms, set_accepted_terms] = useState(false);
  const [show_password, set_show_password] = useState(false);
  const [is_loading, set_is_loading] = useState(false);

  const togglePasswordVisibility = () => {
    set_show_password(!show_password);
  };

  async function handle_signup() {
    set_is_loading(true);
    const result = await email_signup({ email, password });
    if ("error" in result) {
      set_is_loading(false);
      // Convert markdown links to React components while preserving the rest of the message
      const parts = result.error.split(/\[(.*?)\]\((.*?)\)/);
      toast.error(() => (
        <span>
          {parts.map((part, i) => {
            if (i % 3 === 0) return part; // Regular text
            if (i % 3 === 1)
              return (
                // Link text (using the URL from brackets)
                <Link key={i} href={part}>
                  {parts[i + 1]}
                </Link>
              );
            return null; // Skip the display text part as it's handled above
          })}
        </span>
      ));
      return;
    }
    set_is_loading(false);
    toast.success(`Successful sign up! Redirecting...`);
  }

  return (
    <div className="w-full rounded-lg border bg-background sm:max-w-md xl:p-0">
      <div className="space-y-4 p-6 sm:p-8">
        <h1 className="leading-tigh text-xl font-bold">
          {type === "signup" ? "Create an account" : "Log in"}
        </h1>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (type === "signup") {
              handle_signup();
            }
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="email">Your email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
              value={email}
              onChange={(event) => set_email(event.target.value)}
              required
              disabled={is_loading}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
              showPassword={show_password}
              onTogglePassword={togglePasswordVisibility}
              value={password}
              onChange={(event) => set_password(event.target.value)}
              disabled={is_loading}
            />
          </div>
          {type === "signup" ? (
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <Input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  required
                  checked={accepted_terms}
                  onChange={(event) => set_accepted_terms(event.target.checked)}
                  disabled={is_loading}
                />
              </div>
              <div className="ml-3 text-sm">
                <Label htmlFor="terms">
                  I accept the <Link href="/terms">Terms</Link> and{" "}
                  <Link href="/privacy">Privacy Policy</Link>
                </Label>
              </div>
            </div>
          ) : (
            // <p className="text-sm text-muted-foreground">
            //   Forgot your password? <Link href="/login/reset">Reset it</Link>
            // </p>
            <></>
          )}
          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              className="flex w-full items-center gap-2"
              disabled={
                is_loading ||
                !email ||
                !password ||
                (type === "signup" && !accepted_terms)
              }
            >
              {is_loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {type === "signup" ? "Create an account" : "Log in"}
            </Button>
            {type === "login" && (
              <Link href="/login/help">
                <Button variant="secondary" type="button" className="w-full">
                  Can't log in?
                </Button>
              </Link>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {type === "signup" ? (
              <>
                Already have an account? <Link href="/login">Login</Link>
              </>
            ) : (
              <>
                Don't have an account? <Link href="/signup">Sign up</Link>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
