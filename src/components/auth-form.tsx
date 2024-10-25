"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export function AuthForm({ type }: { type: "login" | "signup" }) {
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [accepted_terms, set_accepted_terms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full rounded-lg border bg-background sm:max-w-md xl:p-0">
      <div className="space-y-4 p-6 sm:p-8">
        <h1 className="leading-tigh text-xl font-bold">
          {type === "signup" ? "Create an account" : "Log in"}
        </h1>
        <form className="space-y-4" action="#">
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
              showPassword={showPassword}
              onTogglePassword={togglePasswordVisibility}
              value={password}
              onChange={(event) => set_password(event.target.value)}
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
              className="w-full"
              disabled={
                !email || !password || (type === "signup" && !accepted_terms)
              }
            >
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
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
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
