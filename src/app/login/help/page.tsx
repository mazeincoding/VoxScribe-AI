import { ArrowRight, KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface LoginOption {
  title: string;
  description: string;
  button_text: string;
  icon: React.ReactNode;
  redirect_url: string;
}

const login_options: LoginOption[] = [
  {
    title: "Reset password",
    description: "Forgot your password? We can help you reset it.",
    button_text: "Reset password",
    icon: <KeyRound className="h-5 w-5 flex-shrink-0" />,
    redirect_url: "/reset-password",
  },
];

export default function LoginHelpPage() {
  return (
    <div className="relative p-4">
      <header className="absolute left-4 top-4">
        <Link href="/login">Go back</Link>
      </header>
      <div className="mx-auto mt-12 flex max-w-xl flex-col items-center gap-6 px-6 py-12">
        <h1 className="text-4xl font-bold">What do you need help with?</h1>
        <div className="flex w-full flex-col gap-4">
          {login_options.map((option) => (
            <Card key={option.title} className="bg-accent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {option.icon}
                  {option.title}
                </CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={option.redirect_url}>
                  <Button className="w-full">
                    {option.button_text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
