import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            These Terms of Service (&quot;Terms&quot;) govern your access to and
            use of VoxScribe&apos;s website and services. By using our services,
            you agree to be bound by these Terms.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Use of Services</h2>
          <p className="mb-4">
            You may use our services only as permitted by law and in accordance
            with these Terms. You are responsible for maintaining the
            confidentiality of your account information and for all activities
            that occur under your account.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Content</h2>
          <p className="mb-4">
            You retain ownership of any intellectual property rights that you
            hold in the content you submit to VoxScribe. By submitting content,
            you grant VoxScribe a worldwide, royalty-free license to use,
            reproduce, modify, and distribute that content for the purpose of
            providing our services.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your access to our services immediately,
            without prior notice or liability, for any reason whatsoever,
            including without limitation if you breach the Terms.
          </p>
          <h2 className="text-2xl font-semibold mb-2">Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. We will provide notice of any significant
            changes to these Terms.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfServicePage;
