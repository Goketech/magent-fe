"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "@/hooks/use-toast";
import bs58 from "bs58";

interface AuthContextType {
  jwt: string | null;
  authenticate: () => Promise<void>;
  connected: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { publicKey, signMessage, connected, signIn, sendTransaction } =
    useWallet();
  const [jwt, setJwt] = useState<string | null>(null);
  const { toast } = useToast();

  const authenticate = async () => {
    console.log("Authenticating...");
    if (!connected || !publicKey || !signMessage) {
      toast({
        variant: "destructive",
        description: "Please connect your wallet first",
      });

      return;
    }

    try {
      console.log("Public Key:", publicKey.toBase58());
      console.log("Sign Message:", signMessage);
      console.log("Connected:", connected);
      const response = await fetch(
        "https://www.api.hellomagent.com/auth/get-nonce",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicKey: publicKey.toBase58() }),
        }
      );

      console.log(response);

      if (!response.ok) {
        toast({
          variant: "destructive",
          description: "Failed to connect wallet",
        });
        throw new Error("Failed to get nonce");
      }

      const { nonce } = await response.json();
      const signedMessage = await signMessage(new TextEncoder().encode(nonce));
      const signature = bs58.encode(signedMessage);

      const verifyRes = await fetch(
        "https://www.api.hellomagent.com/auth/verify-signature",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicKey: publicKey.toBase58(), signature }),
        }
      );

      if (!verifyRes.ok) {
        toast({
          variant: "destructive",
          description: "Signature verification failed",
        });
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
