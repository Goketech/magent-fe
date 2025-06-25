// components/form-renderer/FormRenderer.tsx
import React, { useState, useCallback } from "react";
import { FormField, FormSubmissionData } from "@/lib/form.types";
import { DynamicField } from "./DynamicField";
import { validateFormData } from "@/utils/validation";
import { useParams } from "next/navigation";
import { apiClient } from "@/utils/apiClient";

interface FormRendererProps {
  fields: FormField[];
  onSubmit: (data: FormSubmissionData) => Promise<void>;
  theme?: "default" | "minimal" | "modern";
  customCss?: string;
  submitButtonText?: string;
  showProgress?: boolean;
}

// Helper function for conditional logic - moved to top for proper hoisting
function shouldShowField(field: FormField, formData: FormSubmissionData): boolean {
  if (!field.conditional) return true;

  const { showIf, logic } = field.conditional;
  const results = showIf.map((condition) => {
    const fieldValue = formData[condition.fieldId];

    switch (condition.operator) {
      case "equals":
        return fieldValue === condition.value;
      case "not_equals":
        return fieldValue !== condition.value;
      case "contains":
        return typeof fieldValue === "string" && fieldValue.includes(condition.value);
      case "greater_than":
        return Number(fieldValue) > Number(condition.value);
      case "less_than":
        return Number(fieldValue) < Number(condition.value);
      case "is_empty":
        return !fieldValue || fieldValue === "" || (Array.isArray(fieldValue) && fieldValue.length === 0);
      case "is_not_empty":
        return !!fieldValue && fieldValue !== "" && (!Array.isArray(fieldValue) || fieldValue.length > 0);
      default:
        return false;
    }
  });

  return logic === "and" ? results.every(Boolean) : results.some(Boolean);
}

export const FormRenderer: React.FC<FormRendererProps> = ({
  fields,
  onSubmit,
  theme = "default",
  customCss,
  submitButtonText = "Submit",
  showProgress = false,
}) => {
  const [formData, setFormData] = useState<FormSubmissionData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");

  const { slug } = useParams();

  const handleFieldChange = useCallback(
    (fieldId: string, value: any) => {
      setFormData((prev) => ({ ...prev, [fieldId]: value }));
      // Clear field error when user starts typing
      if (errors[fieldId]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldId];
          return newErrors;
        });
      }
      // Clear submit error when user makes changes
      if (submitError) {
        setSubmitError("");
      }
    },
    [errors, submitError]
  );

  const getVisibleFields = useCallback((fields: FormField[], formData: FormSubmissionData) => {
    return fields
      .filter((field) => shouldShowField(field, formData))
      .sort((a, b) => a.order - b.order);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSubmitError("");

    console.log("Form submission started", { formData }); // Debug log

    const visibleFields = getVisibleFields(fields, formData);
    
    // Basic validation check
    if (visibleFields.length === 0) {
      setSubmitError("No fields available to submit");
      return;
    }

    // Validate form data
    let validation;
    try {
      validation = validateFormData(visibleFields, formData);
      console.log("Validation result:", validation); // Debug log
    } catch (error) {
      console.error("Validation error:", error);
      setSubmitError("Form validation failed. Please check your inputs.");
      return;
    }

    if (!validation || !validation.isValid) {
      console.log("Validation failed:", validation); // Debug log
      if (validation && validation.errors) {
        setErrors(validation.errors);
        setSubmitError("Please fix the errors above before submitting.");

        // Scroll to first error
        const firstErrorField = Object.keys(validation.errors)[0];
        const errorElement = document.getElementById(firstErrorField);
        errorElement?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        setSubmitError("Form validation failed. Please check your inputs.");
      }
      return;
    }

    setIsSubmitting(true);
    
    try {
    // ✅ Make the POST request
    const response = await apiClient(`/form/public/${slug}/submit`, {
      method: "POST",
      body: formData,
    });

    // ✅ If successful
    console.log("Form submitted successfully:", response);
    setFormData({});
    setErrors({});
    setIsSubmitted(true); // show success state
  } catch (error) {
    console.error("Error submitting form:", error);
    setSubmitError(
      error instanceof Error
        ? `Submission failed: ${error.message}`
        : "An error occurred while submitting the form. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
  };

  const visibleFields = getVisibleFields(fields, formData);
  const completedFields = visibleFields.filter((field) => {
    const value = formData[field._id];
    return value !== undefined && value !== null && value !== "";
  }).length;

  const progress = visibleFields.length > 0 ? (completedFields / visibleFields.length) * 100 : 0;

  const getThemeClasses = () => {
    switch (theme) {
      case "minimal":
        return "bg-white border border-gray-200 shadow-sm";
      case "modern":
        return "bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg";
      default:
        return "bg-white shadow-md";
    }
  };

  if (isSubmitted) {
    return (
      <div className={`form-container ${getThemeClasses()} rounded-lg p-8 max-w-2xl mx-auto`}>
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Thank you!</h3>
          <p className="text-gray-600">Your form has been submitted successfully.</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Submit another response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`form-container ${getThemeClasses()} rounded-lg p-6 max-w-2xl mx-auto`}>
      {showProgress && visibleFields.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {/* Submit Error Display */}
      {submitError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{submitError}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {visibleFields.map((field) => (
          <DynamicField
            key={field._id}
            field={field}
            value={field.type === 'checkbox' ? (formData[field._id] || []) : formData[field._id]}
            onChange={(value) => handleFieldChange(field._id, value)}
            error={errors[field._id]}
          />
        ))}

        {visibleFields.length === 0 && (
          <div className="text-center py-8 text-gray-500">No fields to display</div>
        )}

        {visibleFields.length > 0 && (
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                theme === "minimal"
                  ? "bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400"
                  : "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400"
              } disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                submitButtonText
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};