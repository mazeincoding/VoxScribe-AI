"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export function AuthForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <div className="w-full rounded-lg border bg-background sm:max-w-md xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="leading-tigh text-xl font-bold">Create an account</h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div className="space-y-1.5">
              <Label htmlFor="email">Your email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="name@company.com"
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
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                required
                showPassword={showPassword}
                onTogglePassword={togglePasswordVisibility}
              />
            </div>
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <Input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <Label htmlFor="terms">
                  I accept the <Link href="#">Terms and Conditions</Link>
                </Label>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account? <Link href="#">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
