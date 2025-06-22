"use client";
import React, { FormEvent, useState, useEffect } from "react";
import WelcomeBox from "@/components/layouts/WelcomeBox";
import { ChevronRight } from "lucide-react";
import FormInput from "@/components/layouts/FormInput";
import MobileAuthNav from "@/components/layouts/MobileAuthNav";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Loading } from "@/components/ui/loading";
import { apiClient } from "@/utils/apiClient";
import { useRouter } from "next/navigation";

function page() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] =useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const { toast } = useToast();
  const navigate = useRouter();
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    setToken(tokenFromUrl ?? "");
  }, []);

  const validatePassword = (pass: string) => {
      if (pass.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
      } else if (!/[A-Z]/.test(pass)) {
        setPasswordError("Password must contain at least one uppercase letter");
      } else if (!/[a-z]/.test(pass)) {
        setPasswordError("Password must contain at least one lowercase letter");
      } else if (!/[0-9]/.test(pass)) {
        setPasswordError("Password must contain at least one number");
      } else {
        setPasswordError("");
      }
    };
  
    const validateConfirmPassword = (confirmPass: string) => {
      if (confirmPass !== newPassword) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    };
  
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value;
      setNewPassword(newPassword);
      validatePassword(newPassword);
  
      // Re-validate confirm password if it exists
      if (confirmPassword) {
        validateConfirmPassword(confirmPassword);
      }
    };
  
    const handleConfirmPasswordChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const newConfirmPassword = e.target.value;
      setConfirmPassword(newConfirmPassword);
      validateConfirmPassword(newConfirmPassword);
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");
    setConfirmPasswordError("");
    setLoading(true);

    let hasError = false

    try {
      if (!newPassword) {
        setPasswordError("Please enter a password");
        hasError = true;
      }

      if (!confirmPassword) {
        setConfirmPasswordError("Please confirm your password");
        hasError = true;
      }

      if(hasError){
        return;
      }

      const data = await apiClient("/auth/reset-password", {
        method: "POST",
        body: { newPassword, token },
      });

      const message = data?.message || "Password has been successfully reset"
      toast({
        title: "Password Reset",
        description: message,
        variant: "success",
      });

      navigate.push("/login")
    } catch (error: any) {
        console.error("Error during password reset:", error);
        const errMessage = error.message || "An unexpected error occurred. Please try again later.";
        toast({
            title: "Password Reset Failed",
            description: errMessage,
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
                Reset Password
              </h1>
              <FormInput
                placeholder="Password (min 8 characters)"
                type="password"
                label="Password"
                value={newPassword}
                onChange={handlePasswordChange}
                error={passwordError}
                showPasswordToggle
              />
              <FormInput
                placeholder="Confirm Password"
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                error={confirmPasswordError}
                showPasswordToggle
              />
              <div className="flex w-full flex-col justify-center items-center gap-4 mt-3">
                <button
                  type="submit"
                  className="w-full bg-[#330065] text-white py-3 rounded-[32px] hover:bg-[#4D2B8C] transition-colors duration-200"
                >
                  {loading ? (
                    <div className="flex justify-center gap-2 items-center">
                      <Loading height="20" width="20" /> <span>Resetting</span>
                    </div>
                  ) : (
                    "Reset Password"
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
