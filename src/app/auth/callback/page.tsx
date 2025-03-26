"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useStepContext } from "@/context/StepContext";
import Image from "next/image";
import { motion } from "framer-motion";

// Loading component
function LoadingState() {
  return (
    <div className="flex w-full h-screen justify-center items-center m-auto bg-[#330065]">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 50 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Image src="/logo.jpg" alt="logo" width={100} height={100} />
      </motion.div>
    </div>
  );
}

// Callback handler component
function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { stepData, updateStepData } = useStepContext();

  useEffect(() => {
    const handleCallback = async () => {
      if (!searchParams) {
        console.error("No search params");
        return;
      }
      const state = searchParams.get("state");
      const code = searchParams.get("code");

      // Verify state matches what we stored
      const savedState = localStorage.getItem("twitter_oauth_state");
      const codeVerifier = localStorage.getItem("twitter_code_verifier");
      if (!state || !code || state !== savedState) {
        console.error("Invalid state or code");
        return;
      }

      try {
        const response = await fetch("/api/auth/twitter/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, codeVerifier }),
        });

        if (!response.ok) {
          throw new Error("Failed to exchange code for tokens");
        }

        const tokens = await response.json();
        localStorage.setItem("twitter_access_token", tokens.access_token);

        // Clean up session storage
        localStorage.removeItem("twitter_oauth_state");
        localStorage.removeItem("twitter_code_verifier");

        updateStepData({
          currentStep: 2,
          active: "Content",
          showFirstScreen: false,
        });
        router.push("/dashboard");
      } catch (error) {
        console.error("Auth error:", error);
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return <LoadingState />;
}

// Main page component
export default function AuthCallback() {
  return (
    <Suspense fallback={<LoadingState />}>
      <CallbackHandler />
    </Suspense>
  );
}
