import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This Privacy Policy describes how PrettySpeech (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)
            collects, uses, and shares your personal information when you use
            our website and services.
          </p>
          <h2 className="text-2xl font-semibold mb-2">
            Information We Collect
          </h2>
          <p className="mb-4">
            We collect information you provide directly to us, such as when you
            create an account, upload audio files, or contact us for support.
          </p>
          <h2 className="text-2xl font-semibold mb-2">
            How We Use Your Information
          </h2>
          <p className="mb-4">
            We use the information we collect to provide, maintain, and improve
            our services, as well as to communicate with you about your account
            and our services.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized or unlawful
            processing, accidental loss, destruction, or damage.
          </p>
          <h2 className="text-2xl font-semibold mb-2">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicyPage;
