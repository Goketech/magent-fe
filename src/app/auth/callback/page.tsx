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
      const savedState = sessionStorage.getItem("twitter_oauth_state");
      if (!state || !code || state !== savedState) {
        console.error("Invalid state or code");
        return;
      }

      try {
        const tokens = await twitterAuth.getAccessToken(code);
        localStorage.setItem("twitter_access_token", tokens.access_token);
        
        // Clean up session storage
        sessionStorage.removeItem("twitter_oauth_state");
        sessionStorage.removeItem("twitter_code_verifier");
        
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