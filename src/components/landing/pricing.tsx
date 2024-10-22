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
      { name: "Claude 3.5 Sonnet", is_available: false },
      { name: "GPT 4o", is_available: false },
      { name: "GPT 4o mini", is_available: true },
      { name: "20 transcriptions per month", is_available: true },
      { name: "Advanced formatting", is_available: true },
      { name: "Real-time", is_available: true },
      { name: "Unlimited exports", is_available: true },
      { name: "50+ languages support", is_available: true },
      { name: "Email support", is_available: true },
    ],
    buttonText: "Get Started",
  },
  {
    name: "Pro",
    price: "$10",
    description: "For users who need more power and flexibility",
    features: [
      { name: "Claude 3.5 Sonnet", is_available: true },
      { name: "GPT 4o", is_available: true },
      { name: "GPT 4o mini", is_available: true },
      { name: "Unlimited transcriptions", is_available: true },
      { name: "Advanced formatting", is_available: true },
      { name: "Real-time", is_available: true },
      { name: "Unlimited exports", is_available: true },
      { name: "50+ languages support", is_available: true },
      { name: "Priority support", is_available: true },
    ],
    buttonText: "Subscribe",
    highlighted: true,
  },
];

export function Pricing() {
  return (
    <div className="flex flex-col justify-center py-20 max-w-6xl mx-auto px-12 gap-12">
      <h2 className="font-bold text-4xl text-center">Simple pricing</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {pricingTiers.map((tier, index) => (
          <Card key={index} className={`flex flex-col ${tier.highlighted && "border-primary"}`}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold mb-6">
                {tier.price}
                <span className="text-lg font-normal text-muted-foreground">
                  {tier.price !== "$0" && "/month"}
                </span>
              </p>
              <ul className="space-y-2">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    {feature.is_available ? (
                      <Check className="h-5 w-5 text-primary mr-2" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground mr-2" />
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
