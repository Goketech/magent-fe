"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";

interface AuthContextType {
  jwt: string | null;
  authenticate: () => Promise<void>;
  connected: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { publicKey, signMessage, connected } = useWallet();
  const [jwt, setJwt] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) setJwt(storedToken);
  }, []);

  const authenticate = async () => {
    if (!connected || !publicKey || !signMessage) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      const response = await fetch("https://www.api.hellomagent.com/auth/get-nonce", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicKey: publicKey.toBase58() }),
      });

      if (!response.ok) {
        throw new Error("Failed to get nonce");
      }

      const { nonce } = await response.json();
      const signedMessage = await signMessage(new TextEncoder().encode(nonce));
      const signature = bs58.encode(signedMessage);

      const verifyRes = await fetch("https://www.api.hellomagent.com/auth/verify-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicKey: publicKey.toBase58(), signature }),
      });

      console.log("verifyRes", verifyRes);

      if (!verifyRes.ok) {
        throw new Error("Signature verification failed");
      }

      const { token } = await verifyRes.json();
      setJwt(token);
      localStorage.setItem("auth_token", token);
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ jwt, authenticate, connected }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
