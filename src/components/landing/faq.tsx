import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How accurate are the transcriptions?",
    answer:
      "We utilize the most powerful speech-to-text model currently available (Whisper by Open AI) to convert your speech to text. Its accuracy rate is in the range of 95% to 98.5%.",
  },
  {
    question: "What file formats do you support?",
    answer:
      "We support a wide range of audio and video formats including MP3, WAV, MP4, AVI, and more.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we take data security very seriously. All uploads and transcripts are encrypted, and we adhere to strict privacy policies to protect your information.",
  },
];

export function FAQSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 px-6">
      <div className="container px-4 md:px-6 space-y-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center">
          Frequently Asked Questions
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
