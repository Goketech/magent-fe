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
import { useStepContext } from "@/context/StepContext";
import MobileNav from "@/components/layouts/MobileNav";

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
  const { stepData, updateStepData } = useStepContext();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

      // add a check for any 401 from our api requests, if there's a 401, clear the local storage

    // useEffect(() => {
    //   const storedToken = localStorage.getItem("auth_token");
    //   authenticate()
    // }, []);

    // useEffect(() =>{
    //   const storedToken = localStorage.getItem("auth_token");
    //   if (storedToken) {
    //     setJwt(storedToken);
    //   }
    // })

  useEffect(() => {
    console.log("JWT:", jwt);
    if (!jwt && connected) {
      authenticate(); // Try to authenticate if connected but no JWT
    }
  }, [jwt, connected, authenticate]);

  return (
    <div
      className={`${pulicSans.className} antialiased relative flex overflow-x-hidden`}
    >
      <aside className="w-[0] md:w-[210px]">
        <SideNav isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </aside>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <MobileNav />
        <main className="p-2 mt-20 md:mt-0 md:p-0">{children}</main>
        <Toaster />
      </div>
    </div>
  );
}
