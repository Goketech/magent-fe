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

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  const { toast } = useToast();

  const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrMsg("");
    setLoading(true);

    try {
      if (!email.trim() || !password.trim()) {
        setErrMsg("Please fill in all fields.");
        return;
      }
      const response = await fetch(`${AUTH_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast({
          title: "Login Successful",
          description: "Welcome back!",
          variant: "success",
        });
        navigate.push("/dashboard");
      } else {
        setErrMsg(data.message || "Login failed");
        toast({
          title: "Login Failed",
          description: data.message || "Please check your credentials.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-full h-screen">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between h-full py-6">
        <div className="hidden md:block w-full h-full relative">
          <WelcomeBox />
        </div>
        <div className="w-full relative h-full">
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
            className="mt-12 md:mt-6 flex flex-col gap-4 p-4"
          >
            <h1 className="text-[#212221] text-[28px] font-semibold">
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
              error={errMsg}
            />
            <div className="flex flex-col justify-center items-center gap-4 mt-3">
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
  );
}

export default page;
