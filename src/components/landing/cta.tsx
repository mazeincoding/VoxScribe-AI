import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="w-full my-12 py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary to-red-500 flex flex-col items-center justify-center text-center gap-6 px-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-primary-foreground">
          Pretty transcripts for you
        </h1>
        <p className="text-primary-foreground/90 md:text-xl">
          Say goodbye to messy transcripts and hello to readability.
        </p>
      </div>
      <div className="w-full max-w-sm flex flex-col items-center gap-4">
        <Button
          variant="secondary"
          className="flex items-center gap-1 w-full md:w-fit"
        >
          <span>Get access for free</span>
          <ArrowRight className="size-4 flex-shrink-0" />
        </Button>
        <p className="text-xs text-primary-foreground/90">
          No credit card needed
        </p>
      </div>
    </section>
  );
}
