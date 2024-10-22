import React from "react";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import { HeartIcon } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-foreground py-12 border-t px-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">PrettySpeech</h3>
            <p className="text-muted-foreground flex items-center gap-1.5">
              Developed with{" "}
              <HeartIcon className="size-4 flex-shrink-0 text-primary fill-current" />{" "}
              by{" "}
              <Link
                href="https://twitter.com/mazewinther1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Maze
              </Link>
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-base font-semibold">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/features"
                  className="hover:text-primary transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-base font-semibold">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-base font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PrettySpeech AI. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
