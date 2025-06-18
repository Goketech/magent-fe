"use client";
import React, { FormEvent, useState } from "react";
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
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  const { toast } = useToast();


const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setErrMsg("");
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

    const data = await apiClient('/auth/login', {
      method: 'POST',
      body: { email, password },
    });

    localStorage.setItem("auth_token", data.token);

    toast({
      title: "Login Successful",
      description: "Welcome back!",
      variant: "success",
    });

    navigate.push("/dashboard");

  } catch (error: any) {
    console.error("Error during login:", error);
    const message = error.message || "An unexpected error occurred. Please try again later.";
    toast({
      title: "Login Failed",
      description: message,
      variant: "destructive",
    });
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
            <div className="flex w-full flex-col justify-center items-center gap-4 mt-3">
              <button
                type="submit"
                className="w-full bg-[#330065] text-white py-3 rounded-[32px] hover:bg-[#4D2B8C] transition-colors duration-200"
              >
                {
                  loading ? <div className="flex justify-center gap-2 items-center"><Loading height="20" width="20" /> <span>Signing in</span></div> : "Sign in"
                }
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
