import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import "../globals.css";

const pulicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Magent",
  icons: {
    icon: "/MagentIcon.svg",
  },
  description: "Your AI partner for smarter, faster marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pulicSans.className} antialiased`}
      >
        <Navbar />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
