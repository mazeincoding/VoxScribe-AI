"use client";
import { useState } from "react";
import Sidebar from "./sidebar/sidebar";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

export default function Overview() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Button
        variant="ghost"
        className="absolute left-2 top-2 lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu className="cursor-pointer text-lg" />
      </Button>
      <main></main>
    </div>
  );
}
