import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Upload, Headphones, FileText, Pencil, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "firebase/auth";
import SignupDialog from "@/components/landing-page/signup-dialog";

const steps: StepInfo[] = [
  {
    Icon: Upload,
    title: "Upload",
    description: "Drop your audio or video file into VoxScribe.",
  },
  {
    Icon: Headphones,
    title: "AI Transcribe",
    description: "Our AI accurately transcribes your content in minutes.",
  },
  {
    Icon: FileText,
    title: "Format",
    description: "VoxScribe's AI formats the transcript for easy reading.",
  },
  {
    Icon: Pencil,
    title: "Refine",
    description: "Fine-tune the transcript to perfection.",
  },
];

const HowItWorksSection: React.FC<{ user: User | null }> = ({ user }) => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleGetStartedClick = () => {
    if (!user) {
      setIsSignupOpen(true);
    }
  };

  return (
    <section className="py-12 bg-slate-100">
      <div className="container mx-auto px-4 space-y-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-800">
          How VoxScribe Works
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} stepNumber={index + 1} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {user ? (
            <Link href="/transcriptions" passHref>
              <Button className="bg-pink-500 text-white hover:bg-pink-600 text-base px-6 py-2 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
                Get Started Now
              </Button>
            </Link>
          ) : (
            <Button
              onClick={handleGetStartedClick}
              className="bg-pink-500 text-white hover:bg-pink-600 text-base px-6 py-2 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Get Started Now
            </Button>
          )}
        </div>
      </div>
      <SignupDialog
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSuccess={() => {
          // Handle successful signup
        }}
      />
    </section>
  );
};

interface StepInfo {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const StepCard: React.FC<StepInfo & { stepNumber: number }> = ({
  Icon,
  title,
  description,
  stepNumber,
}) => {
  return (
    <Card className="flex flex-col items-center text-center hover:shadow-lg transition-all duration-300 ease-in-out md:transform md:hover:scale-105 bg-white">
      <CardHeader className="relative">
        <div className="absolute -top-3 -left-3 bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">
          {stepNumber}
        </div>
        <Icon className="h-12 w-12 text-pink-500" />
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-bold mb-2 text-slate-800">{title}</h3>
        <p className="text-sm text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default HowItWorksSection;
