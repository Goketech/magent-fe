"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { twitterAuth } from "@/utils/xAuth";
import { Suspense } from "react";

// Loading component
function LoadingState() {
  return <div>Processing authentication...</div>;
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

      // Verify state matches what we stored
      const savedState = localStorage.getItem("twitter_oauth_state");
      const codeVerifier = localStorage.getItem("twitter_code_verifier");
      console.log(savedState);
      console.log(state);
      console.log(code);
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
