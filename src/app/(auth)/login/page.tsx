"use client";
import React, { FormEvent, useState, useRef } from "react";
import WelcomeBox from "@/components/layouts/WelcomeBox";
import { ChevronRight } from "lucide-react";
import FormInput from "@/components/layouts/FormInput";
import MobileAuthNav from "@/components/layouts/MobileAuthNav";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loading } from "@/components/ui/loading";
import { apiClient } from "@/utils/apiClient";
import ReCAPTCHA from "react-google-recaptcha";
import { logEvent } from "@/utils/logEvent";
import GoogleAuthButton from "@/components/GoogleAuthButton";

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState("");
  const navigate = useRouter();
  const { toast } = useToast();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (token) {
      setCaptchaError("");
    }
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken(null);
    setCaptchaError("reCAPTCHA expired. Please verify again.");
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrMsg("");
    setCaptchaError("");
    setLoading(true);

    try {
      if (!email) {
        setErrMsg("Please enter your email.");
        return;
      }

      if (!password) {
        setPasswordError("Please enter your password.");
        return;
      }

      if (!captchaToken) {
        setCaptchaError("Please complete the reCAPTCHA verification");
        return;
      }

      logEvent({
        action: "click",
        category: "Button",
        label: "Login",
        value: 1,
      });

      const data = await apiClient("/auth/login", {
        method: "POST",
        body: { email, password, captchaToken },
      });

      localStorage.setItem("wallet_connected_address", data.user.walletAddress);
      localStorage.setItem("auth_token", data.token);

      toast({
        title: "Login Successful",
        description: "Welcome back!",
        variant: "success",
      });

      navigate.push("/dashboard");
    } catch (error: any) {
      console.error("Error during login:", error);
      const message =
        error?.message ||
        "An unexpected error occurred. Please try again later.";
      toast({
        title: "Login Failed",
        description: message,
        variant: "destructive",
      });

      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full h-[100dvh]">
      <div className="px-4 max-w-screen-2xl mx-auto flex flex-col lg:flex-row h-full items-center justify-between gap-6 py-6">
        <div className="hidden md:block w-full h-full relative">
          <WelcomeBox />
        </div>
        <div className="w-full relative h-full">
          <div className="w-full max-w-lg">
            <div className="block md:hidden">
              <MobileAuthNav />
            </div>
            <div className="hidden md:flex justify-end">
              <Link href="/signup">
                <div className="flex gap-1 items-center justify-center bg-[#F6F6F6] rounded-[32px] px-4 py-3 text-[#330065] text-sm">
                  <span>Sign up</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            </div>
            <form
              onSubmit={handleLogin}
              className="mt-12 md:mt-6 flex flex-col gap-4 px-4 md:px-8 lg:px-12"
            >
              <h1 className="text-[#212221] text-[24px] md:text-[28px] font-semibold">
                Welcome back, Chad
              </h1>
              <FormInput
                placeholder="Enter email address"
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errMsg}
              />
              <FormInput
                placeholder="Password (min 8 characters)"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPasswordToggle
                error={passwordError}
              />

              {/* reCAPTCHA Component */}
              <div className="flex flex-col gap-2">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                  onChange={handleCaptchaChange}
                  onExpired={handleCaptchaExpired}
                  theme="light"
                />
                {captchaError && (
                  <span className="text-red-500 text-sm">{captchaError}</span>
                )}
              </div>

              <div className="flex justify-end items-center mt-2">
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#330065]"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="flex w-full flex-col justify-center items-center gap-4 mt-3">
                <button
                  type="submit"
                  className="w-full bg-[#330065] text-white py-3 rounded-[32px] hover:bg-[#4D2B8C] transition-colors duration-200"
                >
                  {loading ? (
                    <div className="flex justify-center gap-2 items-center">
                      <Loading height="20" width="20" /> <span>Signing in</span>
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>
                <div className="flex items-center gap-2 text-[#212221] text-sm w-full justify-center">
                  <span className="w-full h-[1px] bg-[#D7D7D7]"></span>
                  <span>OR</span>
                  <span className="w-full h-[1px] bg-[#D7D7D7]"></span>
                </div>
                <GoogleAuthButton
                  isSignup={false}
                  disabled={loading}
                  className="mb-4"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
