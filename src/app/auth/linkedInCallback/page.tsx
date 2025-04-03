"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
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

  useEffect(() => {
    const handleCallback = async () => {
      if (!searchParams) {
        console.error("No search params");
        return;
      }
      const state = searchParams.get("state");
      const code = searchParams.get("code");
      const error = searchParams.get("error");

      // Verify state matches what we stored
      const savedState = localStorage.getItem("linkedin_oauth_state");
      const codeVerifier = localStorage.getItem("linkedin_code_verifier");

      if (!savedState || !codeVerifier) {
        console.error("State or Code Verifier not found in localStorage");
        return;
      }

      console.log("Stored State:", savedState);
console.log("Received State:", state);
console.log("Received Code:", code);
console.log("🔍 Error:", error);  
      if (!state || !code || state !== savedState) {
        console.error("Invalid state or code");
        return;
      }

      if (state !== savedState) {
        console.error("❌ State mismatch! Authentication aborted.");
        return;
      }

      console.log("Fetching from API:", "/api/auth/linkedIn/callback");

      try {
        const response = await fetch("/api/auth/linkedIn/callback", {
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
        console.log("Received tokens:", tokens); // Debugging line
        localStorage.setItem("linkedin_access_token", tokens.access_token);

        // Clean up session storage
        localStorage.removeItem("linkedin_oauth_state");
        localStorage.removeItem("linkedin_code_verifier");
        router.push("/linkedInPage");
      } catch (error) {
        console.error("Auth error:", error);
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return <LoadingState />;
}

// Main page component
export default function LinkedInAuthCallback() {
  return (
    <Suspense fallback={<LoadingState />}>
      <CallbackHandler />
    </Suspense>
  );
}
