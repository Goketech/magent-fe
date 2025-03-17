"use client";
import { useEffect, useState } from "react";
import { Public_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import SideNav from "@/components/layouts/SideNav";
import { useAuth } from "@/context/AuthProvider";
import { MdMenu } from "react-icons/md";
import Image from "next/image";
import { X } from "lucide-react";

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

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!jwt && connected) {
      authenticate(); // Try to authenticate if connected but no JWT
    }
  }, [jwt, connected, authenticate]);

  return (
    <div className={`${pulicSans.className} antialiased relative flex`}>
      <div className="flex justify-between items-center z-20 p-0 md:p-6">
        {isSidebarOpen ? (
          <button
            className="md:hidden fixed top-5 left-20 text-6xl"
            onClick={toggleSidebar}
          >
            <X />{" "}
          </button>
        ) : (
          <button
            className="md:hidden fixed top-4 left-6 text-3xl"
            onClick={toggleSidebar}
          >
            <MdMenu />
          </button>
        )}
      </div>
      <SideNav isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1">
        {children}
        <Toaster />
      </div>
    </div>
  );
}
