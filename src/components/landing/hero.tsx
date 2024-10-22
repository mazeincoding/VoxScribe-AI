"use client";

import { Button } from "../ui/button";
import {
  MacWindow,
  MacWindowContent,
  MacWindowControls,
  MacWindowHeader,
} from "../mac-window";

export function Hero() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-normal items-center justify-center mt-0 lg:mt-20 py-20 mb-32 lg:mb-10 gap-16 max-w-6xl mx-auto px-12 text-center lg:text-left">
      <div className="flex flex-col gap-4 items-center lg:items-start">
        <h1 className="text-4xl lg:text-5xl font-bold text-wrap lg:text-balance block lg:flex flex-col gap-2">
          Speak Freely,{" "}
          <mark className="bg-transparent text-primary">Read Easily</mark>
        </h1>
        <p className="text-lg lg:text-xl text-muted-foreground">
          Transcribe your words and format them beautifully—all automatically!
        </p>
        <Button className="w-fit">See in action</Button>
      </div>
      <div>
        <div className="relative mt-0 lg:-mt-32">
          <TranscriptionCard is_formatted={false} className="opacity-25" />
          <TranscriptionCard
            is_formatted={true}
            className="absolute top-28 left-0"
          />
        </div>
      </div>
    </div>
  );
}

function TranscriptionCard({
  is_formatted,
  className,
}: {
  is_formatted: boolean;
  className?: string;
}) {
  return (
    <MacWindow className={`w-full max-w-[700px] lg:w-[500px] ${className}`}>
      <MacWindowHeader>
        <MacWindowControls />
        <p>{is_formatted ? "Formatted" : "Wall of text"}</p>
      </MacWindowHeader>
      <MacWindowContent>
        <div className="space-y-4 text-left">
          {is_formatted ? (
            <>
              <h2 className="font-bold text-xl">
                Yeah, like I was saying the other day...
              </h2>
              <p className="text-foreground font-bold">
                It's really important to:
              </p>
              <ul className="list-disc list-inside">
                <li>Focus on the key aspects of the project</li>
                <li>Make sure that we're hitting all the right notes</li>
              </ul>
            </>
          ) : (
            <p>
              yeah so um like I was saying the other day you know it's really
              important to uh to focus on on the key aspects of of the project
              and and make sure that we're we're hitting all the right notes
            </p>
          )}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="size-2 rounded-full bg-green-500"></div>
          <p className="text-sm">AI Powered</p>
        </div>
      </MacWindowContent>
    </MacWindow>
  );
}
