import React from "react";
import Link from "next/link";
import { HeartIcon } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-background px-6 py-12 text-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">PrettySpeech</h3>
            <p className="flex items-center gap-1.5 text-muted-foreground">
              Made with{" "}
              <HeartIcon className="size-4 flex-shrink-0 fill-current text-primary" />{" "}
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
            <h4 className="text-base font-semibold">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-primary"
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
                  href="/privacy"
                  className="transition-colors hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-primary"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
          <div className="text-sm text-muted-foreground">
            &copy; PrettySpeech AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
