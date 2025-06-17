"use client";
import React, { useState, FormEvent } from "react";
import WelcomeBox from "@/components/layouts/WelcomeBox";
import { ChevronRight } from "lucide-react";
import FormInput from "@/components/layouts/FormInput";
import FormSelect from "@/components/layouts/FormSelect";
import Image from "next/image";
import MobileAuthNav from "@/components/layouts/MobileAuthNav";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/ui/loading";
import { apiClient } from "@/utils/apiClient";


function page() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [expertise, setExpertise] = useState("");
  const [selectedRoleType, setSelectedRoleType] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useRouter();
  

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
    if (confirmPass !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
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

  const roleOptions = [
    { label: "Advertiser", value: "Advertiser" },
    { label: "Publisher", value: "Publisher" },
    { label: "MVP", value: "MVP" },
  ];

  const industryOptions = [
    { label: "Payments", value: "Payments" },
    { label: "DAOs", value: "DAOs" },
    { label: "DeFi", value: "DeFi" },
    { label: "Infrastructure", value: "Infrastructure" },
    { label: "DePIN", value: "DePIN" },
    { label: "Customer dApps", value: "Customer dApps" },
    { label: "NFTs", value: "NFTs" },
    { label: "Gaming", value: "Gaming" },
    { label: "Artificial Intelligence", value: "Artificial Intelligence" },
  ];

  const expertiseOptions = [
    { label: "KOL/Influencer", value: "KOL/Influencer" },
    { label: "Shiller", value: "Shiller" },
    { label: "Sales/Business developer", value: "Sales/Business developer" },
    { label: "Marketer", value: "Marketer" },
    { label: "Content creator", value: "Content creator" },
    { label: "Writer", value: "Writer" },
  ];

  const handleRoleChange = (selectedRole: string) => {
    setRole(selectedRole);
    setSelectedRoleType(selectedRole);
    if (selectedRole === "Advertiser" || selectedRole === "Publisher") {
      setShowAdditionalFields(true);
    } else {
      setShowAdditionalFields(false);
    }
  };

  const handleIndustryChange = (selectedIndustry: string) => {
    setIndustry(selectedIndustry);
  };

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setErrMsg("");
  setPasswordError("");
  setIsLoading(true);
  console.log(selectedRoleType, "selectedRoleType");
  console.log(email, userName, password, confirmPassword, role, companyName, industry, expertise);

  try {
    // ✅ Basic field validation
    if (!email || !userName || !password || !confirmPassword || !role) {
      setErrMsg("Please fill in all fields");
      return;
    }

    if (selectedRoleType === "Advertiser" && (!companyName || !industry)) {
      setErrMsg("Please fill in company name and industry");
      return;
    }

    if (selectedRoleType === "Publisher" && !expertise) {
      setErrMsg("Please fill in your expertise");
      return;
    }

    // ✅ Password validation
    const passwordErrors = [];
    if (password.length < 8) passwordErrors.push("at least 8 characters long");
    if (!/[A-Z]/.test(password)) passwordErrors.push("at least one uppercase letter");
    if (!/[a-z]/.test(password)) passwordErrors.push("at least one lowercase letter");
    if (!/[0-9]/.test(password)) passwordErrors.push("at least one number");

    if (passwordErrors.length > 0) {
      setErrMsg(`Password must contain: ${passwordErrors.join(", ")}`);
      return;
    }

    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match");
      return;
    }

    // ✅ Call API using apiClient
    const data = await apiClient('/auth/register', {
      method: 'POST',
      body: {
        email,
        userName,
        password,
        role: selectedRoleType.toLowerCase(),
        businessName: selectedRoleType === "Advertiser" ? companyName : undefined,
        industry: selectedRoleType === "Advertiser" ? industry : undefined,
        expertise: selectedRoleType === "Publisher" ? expertise : undefined,
      }
    });

    // ✅ Handle success
    localStorage.setItem("auth_token", JSON.stringify(data.token));

    toast({
      variant: "success",
      description: "Registration successful!",
    });

    navigate.push("/login");

  } catch (error: any) {
    // ✅ Handle error
    const errorMessage = error?.message || "Something went wrong. Try again later.";

    console.log(errorMessage)


    toast({
      variant: "destructive",
      description: errorMessage,
    });

    console.error("Registration error:", error);
  } finally {
    setIsLoading(false);
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
                <span>Sign in</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </Link>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-12 md:mt-6 flex flex-col gap-4 px-4 md:px-8 lg:px-12"
          >
            <h1 className="text-[#212221] text-[28px] font-semibold">
              Create your account
            </h1>
            <FormSelect
              placeholder="Select role"
              options={roleOptions}
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
              onSelectionChange={handleRoleChange}
              error={errMsg}
            />
            {selectedRoleType == "Advertiser" && (
              <>
                <FormInput
                  placeholder="Enter company name"
                  type="text"
                  label="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  error={errMsg}
                />
                <FormSelect
                  placeholder="Select industry"
                  options={industryOptions}
                  value={industry}
                  label="Industry"
                  onChange={(e) => setIndustry(e.target.value)}
                  onSelectionChange={handleIndustryChange}
                  error={errMsg}
                />
              </>
            )}
            {selectedRoleType == "Publisher" && (
              <>
                <FormSelect
                  placeholder="Select expertise"
                  options={expertiseOptions}
                  value={expertise}
                  label="Expertise"
                  onChange={(e) => setExpertise(e.target.value)}
                  error={errMsg}
                />
              </>
            )}
            <FormInput
              placeholder="Enter email address"
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errMsg}
            />
            <FormInput
              placeholder="Enter username"
              type="text"
              label="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              error={errMsg}
            />
            <FormInput
              placeholder="Password (min 8 characters)"
              type="password"
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              error={passwordError || errMsg}
              showPasswordToggle
            />
            <FormInput
              placeholder="Confirm Password"
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={confirmPasswordError || errMsg}
              showPasswordToggle
            />
            <div className="flex flex-col justify-center items-center gap-4 mt-3">
              <button
                type="submit"
                className="w-full bg-[#330065] text-white py-3 rounded-[32px] hover:bg-[#4D2B8C] transition-colors duration-200"
              >
                {
                  isLoading ? <div className="flex gap-2 items-center justify-center"><Loading height="20" width="20" /> <span>Signing up</span></div> : "Sign up"
                }
              </button>
              <div className="flex items-center gap-2 text-[#212221] text-sm w-full justify-center">
                <span className="w-full h-[1px] bg-[#D7D7D7]"></span>
                <span>OR</span>
                <span className="w-full h-[1px] bg-[#D7D7D7]"></span>
              </div>
              <button
                type="submit"
                className="w-full bg-white text-[#212221] py-3 rounded-[32px] hover:bg-[#330065] hover:text-white border border-[#D7D7D7] transition-colors duration-200 flex justify-center items-center gap-2 mb-10"
              >
                {" "}
                <span>
                  <Image
                    src="/google.svg"
                    alt="google"
                    width={20}
                    height={20}
                  />
                </span>
                Continue with google
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
