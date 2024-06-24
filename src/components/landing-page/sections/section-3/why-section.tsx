import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Clock, Code, CheckCircle } from "lucide-react";

const WhySection: React.FC = () => {
  const features = [
    {
      icon: <Clock className="w-8 h-8 text-pink-500" />,
      title: "Efficient Transcription",
      description: "VoxScribe makes your transcripts faster to read and understand. With formatted text, you can quickly spot key points and grasp what's going on, saving you time and mental energy.",
    },
    {
      icon: <Code className="w-8 h-8 text-pink-500" />,
      title: "Open Source",
      description: "VoxScribe is open source, so you can see exactly how your data is being processed. This allows you to trust the platform and know exactly what you're getting.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-pink-500" />,
      title: "Accurate Transcriptions",
      description: "Get nearly 100% accurate transcripts thanks to OpenAI's Whisper model. VoxScribe ensures that your audio is transcribed with high precision.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
          Why Choose VoxScribe?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center pb-2">
                {feature.icon}
                <CardTitle className="mt-4 text-xl font-semibold text-slate-700">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-slate-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
