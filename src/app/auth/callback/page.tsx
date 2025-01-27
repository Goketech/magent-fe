"use client"
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { twitterAuth } from "@/utils/xAuth";

export default function AuthCallback() {

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      if (!searchParams) {
        // router.push("/auth/error");
        console.error("No search params");
        return;
      }
      const state = searchParams.get("state");
      const code = searchParams.get("code");

      // Verify state matches what we stored
      const savedState = sessionStorage.getItem("twitter_oauth_state");
      if (!state || !code || state !== savedState) {
        // router.push("/auth/error");
        console.error("Invalid state or code");
        return;
      }

      try {
        const tokens = await twitterAuth.getAccessToken(code);
        // Store tokens securely (e.g., in HttpOnly cookies via API route)
        // Redirect to protected page
        localStorage.setItem("twitter_access_token", tokens.access_token);
        router.push("/dashboard");
      } catch (error) {
        console.error("Auth error:", error);
        // router.push("/auth/error");
      }
    };

    handleCallback();
  }, []);

  return <div>Processing authentication...</div>;
}
