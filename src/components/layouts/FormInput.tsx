"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: string;
  label?: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  showPasswordToggle?: boolean;
}

function FormInput({
  placeholder = "Enter email address",
  type = "text",
  value,
  label,
  onChange,
  error,
  showPasswordToggle = false,
  ...props
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    showPasswordToggle && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const shouldShowError = error && !value;

  return (
    <div className="w-full max-w-[500px]">
      <label className="block text-[#212221] text-sm mb-2">{label}</label>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 py-3 rounded-[8px] border-[0.5px] transition-all duration-200 outline-none
            text-base leading-6
            placeholder:text-sm placeholder:leading-5
            ${showPasswordToggle && type === "password" ? "pr-12" : ""}
            ${
              error
                ? "border-red-500 hover:border-red-500 focus:border-red-500"
                : isFocused
                ? "border-[#330065] shadow-sm"
                : "border-[#D7D7D7] hover:border-[#330065]"
            }
          `}
          style={{
            color: "#212221",
            fontSize: "16px",
          }}
          {...props}
        />
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#BABABA] hover:text-[#330065] transition-colors duration-200"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default FormInput;
