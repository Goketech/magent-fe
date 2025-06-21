import AppWalletProvider from "@/components/AppWalletProvider";
import { AuthProvider } from "@/context/AuthProvider";
import { StepProvider } from "@/context/StepContext";
import type { Metadata } from "next";
import { GoogleAnalytic } from "@/components/Analytics";
import Script from "next/script";
import './globals.css';

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
      <head>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YOUR_GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body>
        <GoogleAnalytic />
        <AppWalletProvider>
          <AuthProvider>
            <StepProvider>{children}</StepProvider>
          </AuthProvider>
        </AppWalletProvider>
      </body>
    </html>
  );
}
