"use client";
export const runtime = "edge";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamic imports to avoid SSR issues
const FormRenderer = dynamic(() => 
  import("@/components/forms/form-renderer/FormRenderer").then(mod => ({ default: mod.FormRenderer })),
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
      if (!finalReferralCode && typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        finalReferralCode = searchParams.get("ref");
      }

      const submissionData = {
        submissionData: data,
        referralCode: finalReferralCode || null,
      };

      await apiClient(`/form/public/${slug}/submit`, {
        method: "POST",
        body: submissionData,
      });

      // Show success message (replace with your toast implementation)
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Form submission error:", error);
      // Show error message (replace with your toast implementation)
      alert(error instanceof Error ? error.message : "Error submitting form. Please try again.");
    }
  };

  // Loading state
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