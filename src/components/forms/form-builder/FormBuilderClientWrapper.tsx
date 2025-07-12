"use client";

import dynamic from "next/dynamic";
import { FormField } from "@/lib/form.types";
import { useCallback } from "react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { apiClient } from "@/utils/apiClient";

const FormBuilder = dynamic(
  () =>
    import("@/components/forms/form-builder/FormBuilder").then(
      (m) => m.FormBuilder
    ),
  { ssr: false }
);

interface Props {
  initialFields: FormField[];
  campaignId?: string;
  initialTitle?: string;
  initialDescription?: string;
}

export default function FormBuilderClientWrapper({
  initialFields,
  campaignId,
  initialTitle = "",
  initialDescription = "",
}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

const handleSave = useCallback(
  async (formData: {
    title: string;
    description: string;
    campaignId: string;
    fields: FormField[];
  }) => {
    setIsLoading(true); // Start loading
    
    try {
      // First API call - create form
      const response = await apiClient("/form", {
        method: "POST",
        body: formData,
      });

      // Second API call - publish form
      try {
        await apiClient(`/form/${response._id}/publish`, {
          method: "POST",
          body: { isPublic: true },
        });

        toast({
          variant: "success",
          description: "Form Published successfully!",
        });
      } catch (publishError) {
        // Handle publish error specifically
        let publishErrorMessage = "Error publishing form.";
        if (publishError instanceof Error) {
          try {
            // Try to parse the error message as JSON to get the server error
            const errorData = JSON.parse(publishError.message.replace('API request failed - ', ''));
            publishErrorMessage = errorData.error || publishError.message;
          } catch {
            publishErrorMessage = publishError.message;
          }
        }

        toast({
          variant: "destructive",
          description: publishErrorMessage,
        });

        // Still show success for saving if only publishing failed
        toast({
          variant: "success",
          description: "Form saved successfully.",
        });

        return; // Exit after handling publish error
      }

      // If both succeed
      toast({
        variant: "success",
        description: "Form saved and published successfully!",
      });

    } catch (error) {
      console.error("Error saving form:", error);

      let errorMessage = "Error saving form. Please try again.";
      if (error instanceof Error) {
        try {
          // Try to parse the error message as JSON to get the server error
          const errorData = JSON.parse(error.message.replace('API request failed - ', ''));
          errorMessage = errorData.error || error.message;
        } catch {
          errorMessage = error.message;
        }
      }

      toast({
        variant: "destructive",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false); // End loading regardless of success or failure
    }
  },
  [toast]
);


  const handlePreview = useCallback(() => {}, []);

  // Handle case where no campaignId is provided
  if (!campaignId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Campaign ID Required
          </h2>
          <p className="text-gray-600 mb-4">
            A campaign ID is required to create a form.
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <FormBuilder
      initialFields={initialFields}
      initialTitle={initialTitle}
      initialDescription={initialDescription}
      campaignId={campaignId}
      onSave={handleSave}
      isLoading={isLoading}
      onPreview={handlePreview}
    />
  );
}
