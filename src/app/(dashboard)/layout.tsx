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

  useEffect(() => {
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
        {/* <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isSidebarOpen ? "" : ""
        }`}
      >
        {isSidebarOpen ? (
          <button
            className="md:hidden fixed top-5 left-40 z-40 text-6xl"
            onClick={toggleSidebar}
          >
            <X />{" "}
          </button>
        ) : (
          <div className="bg-white">
            <button
              className="md:hidden fixed top-4 left-6 text-3xl"
              onClick={toggleSidebar}
            >
              <MdMenu />
            </button>
            <p className="block md:hidden fixed top-4 left-20 text-xl">
              {stepData.active}
            </p>
          </div>
        )}
        </div> */}
      </aside>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <MobileNav />
        <main className="p-2 mt-20 md:mt-0 md:p-0">{children}</main>
        <Toaster />
      </div>
    </div>
  );
}
