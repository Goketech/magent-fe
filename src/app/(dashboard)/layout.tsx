"use client";
import { useEffect } from "react";
import { Public_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import SideNav from "@/components/layouts/SideNav";
import { useAuth } from "@/context/AuthProvider";

const pulicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { jwt, connected, authenticate } = useAuth();

  useEffect(() => {
    if (!jwt && connected) {
      authenticate(); // Try to authenticate if connected but no JWT
    }
  }, [jwt, connected, authenticate]);

  return (
    <div className={`${pulicSans.className} antialiased`}>
      <SideNav />
      <div className="flex-1">
        {children}
        <Toaster />
      </div>
    </div>
  );
}
