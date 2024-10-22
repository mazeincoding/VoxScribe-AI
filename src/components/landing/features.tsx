"use client";

import { ChevronDown, MicIcon, PanelRightIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import {
  MacWindow,
  MacWindowContent,
  MacWindowControls,
  MacWindowHeader,
} from "../mac-window";
import { Card } from "../ui/card";
import { ClaudeLogo, OpenAILogo } from "../../icons/icons";
import { Button } from "../ui/button";
import { throttle } from "lodash";

interface FeatureProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const features: FeatureProps[] = [
  {
    title: "Real-time? We got it.",
    description:
      "Speak to your mic and transcribe your words into a masterpiece.",
    children: <RealtimePreview />,
  },
  {
    title: "Choose any model.",
    description: "Now with the most powerful LLMs.",
    children: <ModelPreview />,
  },
  {
    title: "Accuracy? Check.",
    description:
      "We'll capture your words accurately, no matter how you speak.",
    children: <AppPreview />,
  },
];

export function Features() {
  return (
    <div className="flex flex-col justify-center py-20 max-w-6xl mx-auto px-12 gap-24">
      {features.map((feature, index) => (
        <div key={feature.title} className="flex flex-col gap-6">
          <Feature
            key={index}
            title={feature.title}
            description={feature.description}
          >
            {feature.children}
          </Feature>
        </div>
      ))}
    </div>
  );
}

function Feature({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <>
      <div className="space-y-2 text-left">
        <h2 className="text-4xl font-extrabold text-pretty">{title}</h2>
        <p className="text-lg text-muted-foreground max-w-3xl">{description}</p>
      </div>
      {children}
    </>
  );
}

function RealtimePreview() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const previewRef = useRef<HTMLDivElement>(null);

  const formattedTranscript = [
    "# Importance of choosing the right tool",
    "",
    "So, you know, I was thinking about this the other day...",
    "",
    "It's really important to find the right tool for whatever job you're doing.",
    "There are a bunch of reasons why this is such a big deal.",
    "",
    "1. **Efficiency**: Right tools save a lot of time.",
    "",
    "2. **Quality**: Better tools, better work. It's as simple as that.",
    "",
    "4. **Money**: Good tools save money. They last longer and prevent costly mistakes.",
    "",
    "5. **Looking professional**: When you use the right tools, it makes you look like you know what you're doing. People notice that stuff.",
    "",
    "6. **Learning curve**: Using the right tool usually makes it easier to learn how to use it properly. There's more info out there, more people who can help you figure it out.",
    "",
    "Bottom line? Investing in good tools is like investing in yourself and your work. It's not about having the fanciest gadgets. It's about having what actually works for what you need to do.",
    "",
    "Next time you're starting a project, take a minute to think about what tools you really need. Future you will probably be super grateful.",
    "",
    "That's my little rant about tools. What do you guys think?",
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!previewRef.current) return;

      const { top, height } = previewRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visiblePercentage = Math.max(
        0,
        Math.min(1, (windowHeight - top) / (windowHeight + height))
      );

      // Adjust the calculation to show more lines as we scroll down
      const linesToShow = Math.floor(
        (visiblePercentage * 1.2 + 0.1) * formattedTranscript.length
      );
      setVisibleLines(linesToShow);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call to set the initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MacWindow className="w-full relative" ref={previewRef}>
      <MacWindowHeader>
        <MacWindowControls />
        <div className="flex items-center space-x-2 text-primary">
          <MicIcon className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">Recording...</span>
        </div>
      </MacWindowHeader>
      <MacWindowContent>
        <div className="space-y-4">
          <div className="h-[450px]">
            <div className="text-foreground">
              {formattedTranscript.map((line, index) => (
                <div
                  key={index}
                  className="transition-opacity duration-300"
                  style={{
                    opacity:
                      index < visibleLines
                        ? Math.min(1, visibleLines - index)
                        : 0,
                  }}
                >
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          className="text-2xl lg:text-3xl font-bold mb-4"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-2xl font-semibold mb-3"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="mb-2" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-5 mb-2" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal pl-5 mb-2" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="mb-1" {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="font-semibold" {...props} />
                      ),
                    }}
                  >
                    {line}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MacWindowContent>
      <div className="w-full h-[60px] bg-gradient-to-t from-background to-transparent absolute bottom-0 left-0"></div>
    </MacWindow>
  );
}

interface TModel {
  name: string;
  description: string;
  is_primary: boolean;
  logo: React.ReactNode;
}

function ModelPreview() {
  const models: TModel[] = [
    {
      name: "Claude 3.5 Sonnet",
      description: "Advanced language model",
      is_primary: true,
      logo: <ClaudeLogo />,
    },
    {
      name: "GPT 4o",
      description: "Advanced language model",
      is_primary: false,
      logo: <OpenAILogo />,
    },
    {
      name: "GPT 4o mini",
      description: "Advanced language model",
      is_primary: false,
      logo: <OpenAILogo />,
    },
  ];

  const primary_model = models.find((model) => model.is_primary);
  const other_models = models.filter((model) => !model.is_primary);

  return (
    <Card className="flex flex-col justify-center p-0 bg-transparent border-none shadow-none">
      <div className="p-5 border rounded-lg bg-secondary">
        {primary_model && <Model model={primary_model} />}
      </div>
      <div className="space-y-0">
        <div className="border rounded-lg shadow-lg p-5 space-y-4">
          {other_models.map((model) => (
            <Model key={model.name} model={model} />
          ))}
        </div>
      </div>
    </Card>
  );
}

function Model({ model }: { model: TModel }) {
  return (
    <div
      className={`${
        model.is_primary ? "" : "bg-transparent rounded-none border-none "
      } flex items-center justify-between`}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="size-10 md:size-12 text-2xl rounded-full text-primary-foreground flex items-center justify-center flex-shrink-0">
          {model.logo}
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg">{model.name}</h3>
          <p className="text-muted-foreground text-sm">{model.description}</p>
        </div>
      </div>
      {model.is_primary && (
        <ChevronDown className="w-6 h-6 flex-shrink-0 mr-2 text-muted-foreground" />
      )}
    </div>
  );
}

function AppPreview() {
  return (
    <div className="min-h-[500px] border rounded-lg flex">
      <div className="w-[250px] hidden md:block">
        <AppSidebar />
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col gap-8 relative">
        {/* Header (small screens) */}
        <div className="flex md:hidden p-4 border-b bg-secondary">
          <Button
            variant="ghost"
            size="icon"
            className="h-auto w-auto p-2 text-muted-foreground hover:text-foreground/75"
          >
            <PanelRightIcon className="size-5 flex-shrink-0" />
          </Button>
        </div>
        <div className="pt-0 md:mt-12 px-12 pb-8 flex flex-col gap-4">
          <h2 className="font-bold text-2xl md:text-3xl">
            Interview with Bill Gates
          </h2>
          <div className="text-base md:text-lg flex flex-col gap-4">
            <b>Welcome to the Show!</b>
            <p>
              I'm so happy to have you here. This is the first time having you
              on, so thanks.
            </p>
            <p>
              So I know you were nervous about the entrance. I think people feel
              like they're supposed to dance. And so I was really surprised,
              because I was here earlier today for your rehearsal, and then you
              abandoned it. But we should at least show them the rehearsal,
              because it was really good. <b>Shout out to them people</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppSidebar() {
  return (
    <aside className="flex flex-col gap-4 w-full border-r p-4 h-full">
      <div className="flex items-center justify-between h-fit w-full">
        <h2 className="font-semibold text-xl">PrettySpeech</h2>
        <Button
          variant="outline"
          size="icon"
          className="h-auto w-auto border-none cursor-default"
        >
          <PanelRightIcon className="size-4 flex-shrink-0" />
        </Button>
      </div>
      <div className="w-full flex flex-col gap-2">
        {Array.from([100, 75, 50]).map((width) => (
          <div
            key={width}
            style={{ width: `${width}%` }}
            className="h-4 bg-secondary rounded-lg"
          />
        ))}
      </div>
    </aside>
  );
}
