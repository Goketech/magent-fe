import AppWalletProvider from "@/components/AppWalletProvider";
import { AuthProvider } from "@/context/AuthProvider";
import { StepProvider } from "@/context/StepContext";
import type { Metadata } from "next";

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
      <body>
        <AppWalletProvider>
          <AuthProvider>
            <StepProvider>{children}</StepProvider>
          </AuthProvider>
        </AppWalletProvider>
      </body>
    </html>
  );
}
