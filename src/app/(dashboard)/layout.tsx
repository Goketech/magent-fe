"use client";
import { useEffect, useState } from "react";
import { Public_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import SideNav from "@/components/layouts/SideNav";
import MobileNav from "@/components/layouts/MobileNav";
import { usePathname } from "next/navigation";

const pulicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setShowSidebar(!!token); // Only show sidebar if token exists
  }, [pathname]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`${pulicSans.className} antialiased relative flex overflow-x-hidden`}
    >
      {showSidebar && (
        <aside className="w-[0] md:w-[210px]">
          <SideNav
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </aside>
      )}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {showSidebar && (
          <MobileNav />
        )}
        <main className="p-2 mt-20 md:mt-0 md:p-0">{children}</main>
        <Toaster />
      </div>
    </div>
  );
}
