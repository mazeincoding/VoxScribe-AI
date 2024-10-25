import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Check, X } from "lucide-react";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: {
    name: string;
    is_available: boolean;
  }[];
  buttonText: string;
  highlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Basic",
    price: "$0",
    description: "For users just starting out",
    features: [
      { name: "30 minutes of transcription monthly", is_available: true },
      { name: "Advanced formatting", is_available: true },
      { name: "Real-time", is_available: true },
      { name: "Unlimited exports", is_available: true },
      { name: "50+ languages support", is_available: true },
      { name: "Email support", is_available: true },
    ],
    buttonText: "Get Started",
  },
  {
    name: "Plus",
    price: "$10",
    description: "For users who need more power and flexibility",
    features: [
      { name: "300 minutes of transcription monthly", is_available: true },
      { name: "Advanced formatting", is_available: true },
      { name: "Real-time", is_available: true },
      { name: "Unlimited exports", is_available: true },
      { name: "50+ languages support", is_available: true },
      { name: "Priority support", is_available: true },
    ],
    buttonText: "Subscribe",
    highlighted: true,
  },
  {
    name: "Pro",
    price: "$20",
    description: "For users who need maximum transcription power",
    features: [
      { name: "600 minutes of transcription monthly", is_available: true },
      { name: "Advanced formatting", is_available: true },
      { name: "Real-time", is_available: true },
      { name: "Unlimited exports", is_available: true },
      { name: "50+ languages support", is_available: true },
      { name: "Priority support", is_available: true },
    ],
    buttonText: "Subscribe",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <div className="flex flex-col justify-center py-20 max-w-6xl mx-auto px-12 gap-8">
      <h2 className="text-3xl font-bold text-center">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:mt-2">
        {pricingTiers.map((tier, index) => (
          <Card
            key={index}
            className={`flex flex-col ${
              tier.highlighted ? "border-primary shadow-lg lg:scale-105" : ""
            }`}
          >
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex gap-4 flex-col">
              <p className="text-4xl font-bold">
                {tier.price}
                <span className="text-sm font-normal">/month</span>
              </p>
              <ul className="space-y-2">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    {feature.is_available ? (
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mr-2" />
                    )}
                    <span>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{tier.buttonText}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
