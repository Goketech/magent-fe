"use client";
import React, { FormEvent, useState, useEffect } from "react";
import WelcomeBox from "@/components/layouts/WelcomeBox";
import { ChevronRight } from "lucide-react";
import FormInput from "@/components/layouts/FormInput";
import MobileAuthNav from "@/components/layouts/MobileAuthNav";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loading } from "@/components/ui/loading";
import { apiClient } from "@/utils/apiClient";

function page() {
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const navigate = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCountingDown && countDown > 0) {
      timer = setTimeout(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);
    }

    if (countDown === 0 && isCountingDown) {
      setIsCountingDown(false);
    }

    return () => clearTimeout(timer);
  }, [countDown, isCountingDown]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrMsg("");
    try {
      if (!email) {
        setErrMsg("Please enter your email.");
        return;
      }

      setLoading(true);

      const data = await apiClient("/auth/request-password-reset", {
        method: "POST",
        body: { email },
      });

      toast({
        title: "Password Reset Link Sent",
        description: "Please check your email for the password reset link.",
        variant: "success",
      });

      setIsCountingDown(true);
      setCountDown(120);
    } catch (error: any) {
      console.error("Error during password reset:", error);
      const message =
        error?.message ||
        "An unexpected error occurred. Please try again later.";
      toast({
        title: "Password Reset Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
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
              <Link href="/login">
                <div className="flex gap-1 items-center justify-center bg-[#F6F6F6] rounded-[32px] px-4 py-3 text-[#330065] text-sm">
                  <span>Back to Login</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-12 md:mt-6 flex flex-col gap-4 px-4 md:px-8 lg:px-12"
            >
              <h1 className="text-[#212221] text-[24px] md:text-[28px] font-semibold">
                Forgot Password
              </h1>
              <p className="text-[#212221] text-base font-medium mb-3">Redirect link will be send to your mail to change your password. </p>
              <FormInput
                placeholder="Enter email address"
                type="email"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errMsg}
              />
              {isCountingDown && (
                <div className="flex justify-end items-center pr-1">
                  <span className="text-sm text-[#330065]">
                    {formatTime(countDown)}
                  </span>
                </div>
              )}
              <div className="flex w-full flex-col justify-center items-center gap-4 mt-3">
                <button
                  type="submit"
                  disabled={isCountingDown || loading}
                  className={`w-full py-3 rounded-[32px] transition-colors duration-200 ${
                    isCountingDown || loading
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-[#330065] text-white hover:bg-[#4D2B8C]"
                  }`}
                >
                  {loading ? (
                    <div className="flex justify-center gap-2 items-center">
                      <Loading height="20" width="20" /> <span>Generating Link</span>
                    </div>
                  ) : isCountingDown ? (
                    `Resend Link`
                  ) : (
                    "Generate Link"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
