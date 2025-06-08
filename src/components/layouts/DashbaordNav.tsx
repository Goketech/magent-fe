"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, House, Bookmark } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/utils/apiClient";

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  businessName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormData {
  signin: SignInData;
  signup: SignUpData;
}

type FormType = "signin" | "signup";

interface ValidationErrors {
  signin: Partial<Record<keyof SignInData, string>>;
  signup: Partial<Record<keyof SignUpData, string>>;
}

const DashbaordNav = () => {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [activeTab, setActiveTab] = useState<FormType>("signin");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  const [error, setError] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [formData, setFormData] = useState<FormData>({
    signin: { email: "", password: "" },
    signup: { businessName: "", email: "", password: "", confirmPassword: "" },
  });

  // Form validation state
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    signin: {},
    signup: {},
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validateSignInForm = () => {
    const errors: { email?: string; password?: string } = {};
    const { email, password } = formData.signin;

    if (!email) errors.email = "Email is required";
    else if (!validateEmail(email)) errors.email = "Invalid email format";

    if (!password) errors.password = "Password is required";

    setValidationErrors((prev) => ({ ...prev, signin: errors }));
    return Object.keys(errors).length === 0;
  };

  const validateSignUpForm = () => {
    const errors: {
      email?: string;
      password?: string;
      businessName?: string;
      confirmPassword?: string;
    } = {};
    const { businessName, email, password, confirmPassword } = formData.signup;

    if (!businessName) errors.businessName = "Business name is required";
    if (!email) errors.email = "Email is required";
    else if (!validateEmail(email)) errors.email = "Invalid email format";

    if (!password) errors.password = "Password is required";
    else if (!validatePassword(password)) {
      errors.password = "Password must be at least 8 characters";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setValidationErrors((prev) => ({ ...prev, signup: errors }));
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    form: FormType
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [form]: {
        ...prev[form],
        [name]: value,
      },
    }));
    // Clear error when user starts typing
    setValidationErrors((prev) => ({
      ...prev,
      [form]: {
        ...prev[form],
        [name]: "",
      },
    }));
  };

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const handleSignIn = async (e: any) => {
    e.preventDefault();
    setError("");

    if (!validateSignInForm()) return;

    try {
      setIsLoading(true);
      const response = await apiClient(
        "/auth/login",
        {
          method: "POST",
          token: undefined,
          body: formData.signin,
        }
      );

      const data = await response.json();
      localStorage.setItem("access_token", data.token);

      if (!response.ok) {
        throw new Error(data.message || "Sign in failed");
      }

      setIsAuthenticated(true);
      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      toast({
        variant: "destructive",
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    setError("");

    if (!validateSignUpForm()) return;

    try {
      setIsLoading(true);
      const response = await apiClient(
        "/auth/register",
        {
          method: "POST",
          token: undefined,
          body: JSON.stringify(formData.signup),
        }
      );

      const data = await response.json();

      localStorage.setItem("access_token", data.token);

      if (!response.ok) {
        throw new Error(data.message || "Sign up failed");
      }

      setIsAuthenticated(true);
      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      toast({
        variant: "destructive",
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setIsAuthenticated(false);
      window.location.href = "/dashboard";
      localStorage.removeItem("access_token");
      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      toast({
        variant: "destructive",
        description: err.message,
      });
    }
  };

  if (isAuthenticated) {
    return (
      <Button variant="outline" onClick={handleLogout} disabled={isLoading}>
        {isLoading ? "Loading..." : "Log Out"}
      </Button>
    );
  }

  return (
    <nav className="relative">
      <div className="flex justify-between items-center px-4 md:px-[80px] py-[24.5px]">
        {/* Logo */}
        <Link href="/" className="z-50">
          <h5 className="font-bold text-2xl text-primary bg-gradient-border bg-clip-text text-transparent">
            magent
          </h5>
        </Link>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-white text-black hover:bg-black hover:text-white"
            >
              Account
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <div className="flex space-x-4 border-b">
                <button
                  className={`pb-2 px-4 text-white ${
                    activeTab === "signin"
                      ? "border-b-2 border-primary font-semibold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("signin")}
                >
                  Sign In
                </button>
                <button
                  className={`pb-2 px-4 text-white ${
                    activeTab === "signup"
                      ? "border-b-2 border-primary font-semibold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("signup")}
                >
                  Sign Up
                </button>
              </div>
            </DialogHeader>

            {activeTab === "signin" ? (
              <form onSubmit={handleSignIn} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="email-signin">Email</Label>
                  <Input
                    id="email-signin"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.signin.email}
                    onChange={(e) => handleInputChange(e, "signin")}
                    className={`
                      ${
                        validationErrors.signin.email ? "border-red-500" : ""
                      } text-white`}
                  />
                  {validationErrors.signin.email && (
                    <span className="text-red-500 text-sm">
                      {validationErrors.signin.email}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password-signin">Password</Label>
                  <Input
                    id="password-signin"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.signin.password}
                    onChange={(e) => handleInputChange(e, "signin")}
                    className={`text-white ${
                      validationErrors.signin.password ? "border-red-500" : ""
                    }`}
                  />
                  {validationErrors.signin.password && (
                    <span className="text-red-500 text-sm">
                      {validationErrors.signin.password}
                    </span>
                  )}
                </div>
                <Button
                  className="w-full mt-2 text-white"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name-signup">Business Name</Label>
                  <Input
                    id="name-signup"
                    name="businessName"
                    type="text"
                    placeholder="Enter your Business name"
                    value={formData.signup.businessName}
                    onChange={(e) => handleInputChange(e, "signup")}
                    className={`text-white ${
                      validationErrors.signup.businessName
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {validationErrors.signup.businessName && (
                    <span className="text-red-500 text-sm">
                      {validationErrors.signup.businessName}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input
                    id="email-signup"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.signup.email}
                    onChange={(e) => handleInputChange(e, "signup")}
                    className={`text-white ${
                      validationErrors.signup.email ? "border-red-500" : ""
                    }`}
                  />
                  {validationErrors.signup.email && (
                    <span className="text-red-500 text-sm">
                      {validationErrors.signup.email}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input
                    id="password-signup"
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.signup.password}
                    onChange={(e) => handleInputChange(e, "signup")}
                    className={`text-white ${
                      validationErrors.signup.password ? "border-red-500" : ""
                    }`}
                  />
                  {validationErrors.signup.password && (
                    <span className="text-red-500 text-sm">
                      {validationErrors.signup.password}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.signup.confirmPassword}
                    onChange={(e) => handleInputChange(e, "signup")}
                    className={`text-white ${
                      validationErrors.signup.confirmPassword
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {validationErrors.signup.confirmPassword && (
                    <span className="text-red-500 text-sm">
                      {validationErrors.signup.confirmPassword}
                    </span>
                  )}
                </div>
                <Button
                  className="w-full mt-2 text-white"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing Up..." : "Sign Up"}
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {/* <div className="hidden md:block">
          <Link href="mailto:modupe775@gmail.com">
            <Button className="bg-[#242424] px-[16px] py-[12px] rounded-[32px] text-white font-[500] text-[14px] leading-[21px] border border-white">
              Connect Wallet
            </Button>
          </Link>
        </div> */}

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-primary" />
            )}
          </button>
        </div>
      </div>
      <div className="hidden md:block px-[80px] py-[20px] border-t">
        <div className="inline-flex gap-[12px] p-[4px] rounded-[32px] border border-[#ECECEC]">
          <Button
            onClick={() => setActive("home")}
            className={`flex gap-[4px] px-[8px] py-[4px] rounded-[32px] bg-transparent ${
              active === "home"
                ? "text-[#095AD3] bg-[#E6EFFB]"
                : "text-[#999999]"
            }`}
          >
            <House className="h-6 w-6" />
            <span>Home</span>
          </Button>
          <Button
            onClick={() => setActive("library")}
            className={`flex gap-[4px] px-[8px] py-[4px] rounded-[32px] bg-transparent ${
              active === "library"
                ? "text-[#095AD3] bg-[#E6EFFB]"
                : "text-[#999999]"
            }`}
          >
            <Bookmark className="h-6 w-6" />
            <span>Library</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background z-40 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <Link
              href="/"
              className="text-2xl font-bold text-primary"
              onClick={toggleMenu}
            >
              Home
            </Link>

            <Link
              href="mailto:hellomagent@gmail.com"
              className="text-2xl font-bold text-primary"
              onClick={toggleMenu}
            >
              Connect Wallet
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashbaordNav;
