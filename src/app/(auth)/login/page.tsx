"use client";
import React, { useState } from "react";
import WelcomeBox from "@/components/layouts/WelcomeBox";
import { ChevronRight } from "lucide-react";
import FormInput from "@/components/layouts/FormInput";
import MobileAuthNav from "@/components/layouts/MobileAuthNav";
import Link from "next/link";

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  return (
    <div className="bg-white w-full h-screen">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-center md:gap-10 h-full p-6">
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
          <form className="mt-12 md:mt-6 flex flex-col gap-4 p-4">
            <h1 className="text-[#212221] text-[28px] font-semibold">
              Welcome back, Chad
            </h1>
            <FormInput
              placeholder="Enter email address"
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              placeholder="Password (min 8 characters)"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              showPasswordToggle
            />
            <div className="flex flex-col justify-center items-center gap-4 mt-3">
              <button
                type="submit"
                className="w-full bg-[#330065] text-white py-3 rounded-[32px] hover:bg-[#4D2B8C] transition-colors duration-200"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
