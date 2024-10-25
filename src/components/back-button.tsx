"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  label?: string;
  className: string;
}

export function BackButton({ label = "Go back", className }: BackButtonProps) {
  const router = useRouter();

  const handle_go_back = () => {
    router.back();
  };

  return (
    <Button
      variant="ghost"
      className={cn("flex items-center gap-2", className)}
      onClick={handle_go_back}
    >
      <ArrowLeft className="h-4 w-4 flex-shrink-0" />
      {label}
    </Button>
  );
}
