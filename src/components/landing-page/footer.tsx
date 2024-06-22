import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="w-full md:w-auto mb-4 md:mb-0 text-center md:text-left">
            <span className="font-bold">VoxScribe</span> - AI powered transcription
          </div>
          <nav className="w-full md:w-auto mb-4 md:mb-0 flex justify-center md:justify-start space-x-4">
            <Link href="/privacy-policy" className="hover:underline">Privacy</Link>
            <Link href="/terms-of-service" className="hover:underline">Terms</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </nav>
          <div className="w-full md:w-auto text-center md:text-right">
            &copy; {new Date().getFullYear()} VoxScribe AI
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
