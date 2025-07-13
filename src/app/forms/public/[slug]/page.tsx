"use client";
export const runtime = "edge";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { useToast } from "@/hooks/use-toast";
import { SimpleWalletButton } from "@/components/ui/SimpleWalletButton"; // adjust path as needed

// Dynamic imports to avoid SSR issues
const FormRenderer = dynamic(
  () =>
    import("@/components/forms/form-renderer/FormRenderer").then((mod) => ({
      default: mod.FormRenderer,
    })),
  { ssr: false }
);

interface Form {
  title: string;
  description?: string;
  fields: any[];
  settings?: {
    theme?: any;
    customCss?: string;
  };
}

interface FormSubmissionData {
  [key: string]: any;
}

import { apiClient } from "@/utils/apiClient";

export default function PublicFormPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [form, setForm] = useState<Form | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { publicKey } = useWallet();
  const walletAddress = publicKey?.toString() || null;
  const { toast } = useToast();

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Get referral code from URL
    const searchParams = new URLSearchParams(window.location.search);
    const refCode = searchParams.get("ref");
    setReferralCode(refCode);

    // Get auth token from localStorage
    try {
      const stored = localStorage.getItem("auth_token");
      if (stored) {
        setAuthToken(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Failed to parse auth token:", e);
    }
  }, [isClient]);

  useEffect(() => {
    const fetchForm = async () => {
      if (!slug || !isClient) return;

      try {
        setLoading(true);
        setError(null);

        const formData = await apiClient(`/form/public/${slug}`, {
          method: "GET",
          token: authToken ?? undefined,
        });

        setForm(formData);
      } catch (err) {
        console.error("Error fetching form:", err);

        if (err instanceof Error) {
          if (err.message.includes("404")) {
            setError("Form not found or no longer available");
          } else {
            setError("Failed to load form");
          }
        } else {
          setError("Failed to load form");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [slug, authToken, isClient]);

  const handleSubmit = async (data: FormSubmissionData) => {
    try {
      let finalReferralCode = referralCode;

      // Fallback: re-read referral code
      if (!finalReferralCode && typeof window !== "undefined") {
        const searchParams = new URLSearchParams(window.location.search);
        finalReferralCode = searchParams.get("ref");
      }

      const submissionData = {
        submissionData: data,
        referralCode: finalReferralCode || null,
        wallet: walletAddress || null,
      };

      await apiClient(`/form/public/${slug}/submit`, {
        method: "POST",
        body: submissionData,
      });

      // Show success message - try different variants
      toast({
        variant: "success",
        description: "Form submitted successfully!",
      });
    } catch (error) {
      console.error("Form submission error:", error);

      // Show error message
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Error submitting form. Please try again.",
      });

      return;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !form) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Form Not Found
          </h1>
          <p className="text-gray-600">{error || "Form not found"}</p>
        </div>
      </div>
    );
  }

  // Success state - render form
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {form.title}
            </h1>
            {form.description && (
              <p className="text-gray-600">{form.description}</p>
            )}
            <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Earn Rewards
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Optional
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Connect your wallet to be eligible for rewards when you
                    submit this form
                  </p>
                  <SimpleWalletButton />
                </div>
              </div>
            </div>
          </div>

          {isClient && (
            <FormRenderer
              fields={form.fields}
              onSubmit={handleSubmit}
              theme={form.settings?.theme}
              customCss={form.settings?.customCss}
            />
          )}
        </div>
      </div>
    </div>
  );
}
