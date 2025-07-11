'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FormRenderer } from "@/components/forms/form-renderer/FormRenderer";
import { Form, FormField, FormSubmissionData } from "@/lib/form.types";
import { apiClient } from "@/utils/apiClient";
import { useToast } from "@/hooks/use-toast";

interface PublicFormPageProps {
  // Remove props since we're now fetching client-side
}

export default function PublicFormPage(props: PublicFormPageProps) {
  const params = useParams();
  const slug = params?.slug as string;
  const { toast } = useToast();
  

  const [form, setForm] = useState<Form | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
  // Extract referral code on client side
  const searchParams = new URLSearchParams(window.location.search);
  const refCode = searchParams.get("ref");
  setReferralCode(refCode);
}, []);


  useEffect(() => {
    const fetchForm = async () => {
      if (!slug) {
        setError("Form slug not provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const formData = await apiClient(`/form/public/${slug}`, {
          method: "GET",
        });

        setForm(formData);
      } catch (err) {
        toast({
          variant: "destructive",
          description: "Error fetching form:",
        });

        // Handle specific error cases
        if (err instanceof Error) {
          if (
            err.message.includes("404") ||
            err.message.includes("not found")
          ) {
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
  }, [slug]);

const handleSubmit = async (data: FormSubmissionData) => {
  try {
    let finalReferralCode = referralCode;

    // Fallback: re-read it in case state wasn't set yet
    if (!finalReferralCode) {
      const searchParams = new URLSearchParams(window.location.search);
      finalReferralCode = searchParams.get("ref");
    }

    const submissionData = {
      ...data,
      referralCode: finalReferralCode || null,
    };



    const response = await apiClient(`/form/public/${slug}/submit`, {
      method: 'POST',
      body: submissionData
    });

    toast({
      variant: "success",
      description: "Form submitted successfully!",
    });
  } catch (error) {
    toast({
      variant: "destructive",
      description:
        error instanceof Error
          ? error.message
          : "Error submitting form. Please try again.",
    });
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

          <FormRenderer
            fields={form.fields}
            onSubmit={handleSubmit}
            theme={form.settings?.theme}
            customCss={form.settings?.customCss}
          />
        </div>
      </div>
    </div>
  );
}
