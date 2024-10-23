"use client";

import React, { useState } from "react";
import { db, writeToDatabase } from "@/firebase/config";
import { ref } from "firebase/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const contactData = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    try {
      // Store in database
      const contactRef = ref(db, "contacts/" + Date.now());
      await writeToDatabase(contactRef, contactData);

      // Send email
      const emailText = `
Dear VoiceScript AI Team,

A new contact form submission has been received with the following details:

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

This message was sent on ${new Date().toLocaleString()}.

Best regards,
Your Contact Form System
`.trim();

      const emailHtml = `
<h2>New Contact Form Submission</h2>
<p>Dear VoiceScript AI Team,</p>
<p>A new contact form submission has been received with the following details:</p>
<ul>
  <li><strong>Name:</strong> ${formData.name}</li>
  <li><strong>Email:</strong> ${formData.email}</li>
  <li><strong>Subject:</strong> ${formData.subject}</li>
</ul>
<h3>Message:</h3>
<p>${formData.message}</p>
<p><em>This message was sent on ${new Date().toLocaleString()}.</em></p>
<p>Best regards,<br>Your Contact Form System</p>
`;

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "voicescriptai@gmail.com",
          subject: `New Contact: ${formData.subject}`,
          text: emailText,
          html: emailHtml,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      toast.success("Thank you for your message. We'll get back to you soon!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-2xl px-8 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="mb-8 text-center text-lg">
          Have a question or need support? Fill out the form below and
          we&apos;ll get back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-lg">
              Subject
            </Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-lg">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 text-lg font-semibold"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
