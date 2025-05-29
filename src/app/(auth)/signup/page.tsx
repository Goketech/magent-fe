"use client";
import React, { useState } from "react";
import WelcomeBox from "@/components/layouts/WelcomeBox";
import { ChevronRight } from "lucide-react";
import FormInput from "@/components/layouts/FormInput";
import FormSelect from "@/components/layouts/FormSelect";
import Image from "next/image";
import MobileAuthNav from "@/components/layouts/MobileAuthNav";
import Link from "next/link";

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
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const validatePassword = (pass: string) => {
    if (pass.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
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
    { label: "Technology", value: "Technology" },
    { label: "Finance", value: "Finance" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Education", value: "Education" },
    { label: "Retail", value: "Retail" },
  ];

  const expertiseOptions = [
    { label: "Digital Marketing", value: "Digital Marketing" },
    { label: "Content Creation", value: "Content Creation" },
    { label: "SEO", value: "SEO" },
    { label: "Social Media Management", value: "Social Media Management" },
    { label: "Data Analysis", value: "Data Analysis" },
  ];

  const handleRoleChange = (selectedRole: string) => {
    setRole(selectedRole);
    if (selectedRole === "Advertiser" || selectedRole === "Publisher") {
      setShowAdditionalFields(true);
      setSelectedRoleType(selectedRole);
    } else {
      setShowAdditionalFields(false);

      setSelectedRoleType("");
    }
  };
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
            <Link href="/login">
              <div className="flex gap-1 items-center justify-center bg-[#F6F6F6] rounded-[32px] px-4 py-3 text-[#330065] text-sm">
                <span>Sign in</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </Link>
          </div>
          <form className="mt-12 md:mt-6 flex flex-col gap-4 p-4">
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
            />
            {selectedRoleType == "Advertiser" && (
              <>
                <FormInput
                  placeholder="Enter company name"
                  type="text"
                  label="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <FormSelect
                  placeholder="Select industry"
                  options={industryOptions}
                  value={industry}
                  label="Industry"
                  onChange={(e) => setIndustry(e.target.value)}
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
                />
              </>
            )}
            <FormInput
              placeholder="Enter email address"
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              placeholder="Enter username"
              type="text"
              label="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <FormInput
              placeholder="Password (min 8 characters)"
              type="password"
              label="Password"
              value={password}
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
            <div className="flex flex-col justify-center items-center gap-4 mt-3">
              <button
                type="submit"
                className="w-full bg-[#330065] text-white py-3 rounded-[32px] hover:bg-[#4D2B8C] transition-colors duration-200"
              >
                Sign up
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
  );
}

export default page;
