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
import { apiClient } from "@/utils/apiClient";

interface AuthContextType {
  jwt: string | null;
  authenticate: () => Promise<void>;
  connected: boolean;
  isAuthenticating: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { publicKey, signMessage, connected } = useWallet();
  const [jwt, setJwt] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      setJwt(storedToken);
    }
  }, []);

  const authenticate = async () => {
    if (!connected || !publicKey || !signMessage) {
      toast({
        variant: "destructive",
        description: "Please connect your wallet first",
      });

      return;
    }

    try {
      setIsAuthenticating(true);
      const response = await apiClient(
        "/auth/get-nonce",
        {
          method: "POST",
          token: jwt || undefined,
          body: { publicKey: publicKey.toBase58() },
        }
      );

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

      const verifyRes = await apiClient(
        "/auth/verify-signature",
        {
          method: "POST",
          token: jwt || undefined,
          body: { publicKey: publicKey.toBase58(), signature },
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

      toast({
        variant: "success",
        description: "Wallet connected and authenticated successfully!",
      });
    } catch (error) {
      console.error("Authentication failed:", error);
      toast({
        variant: "destructive",
        description:
          error instanceof Error ? error.message : "Authentication failed",
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ jwt, authenticate, connected, isAuthenticating }}
    >
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
