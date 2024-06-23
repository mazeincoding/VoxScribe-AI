"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import AccountSection from "./account-section";
import AccountManagementSection from "./account-management-section";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Settings: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return null; // Or a loading spinner
  }

  if (!user) {
    return null; // This will not be rendered as we're redirecting
  }

  const isPasswordProvider = user?.providerData.some(
    (provider) => provider.providerId === "password"
  );

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <AccountSection
                user={user}
                isPasswordProvider={isPasswordProvider}
              />
              <Separator />
              <AccountManagementSection
                user={user}
                isPasswordProvider={isPasswordProvider}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
