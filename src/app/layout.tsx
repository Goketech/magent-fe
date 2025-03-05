import AppWalletProvider from "@/components/AppWalletProvider";
import { AuthProvider } from "@/context/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppWalletProvider>
          <AuthProvider>{children}</AuthProvider>
        </AppWalletProvider>
      </body>
    </html>
  );
}
