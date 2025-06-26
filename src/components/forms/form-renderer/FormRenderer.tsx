// components/form-renderer/FormRenderer.tsx
import React, { useState, useCallback } from "react";
import { FormField, FormSubmissionData } from "@/lib/form.types";
import { DynamicField } from "./DynamicField";
import { validateFormData } from "@/utils/validation";
import { useParams } from "next/navigation";
import { apiClient } from "@/utils/apiClient";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

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

    toast({
      variant: "success",
      description: "Form submission started",
    });


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
  console.log(formData)

  const visibleFields = getVisibleFields(fields, formData);
  const completedFields = visibleFields.filter((field) => {
    const value = formData[field._id];
    return value !== undefined && value !== null && value !== "";
  }).length;

  const progress = visibleFields.length > 0 ? (completedFields / visibleFields.length) * 100 : 0;

  const getThemeClasses = () => {
    switch (theme) {
      case "minimal":
        return "bg-white backdrop-blur-sm";
      case "modern":
        return "bg-gradient-to-br from-white via-purple-50/20 to-purple-100/30 border border-purple-100/50 shadow-xl backdrop-blur-sm";
      default:
        return "bg-white/95 shadow-lg border border-gray-100/50 backdrop-blur-sm";
    }
  };

  if (isSubmitted) {
    return (
      <div className=" bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className={`form-container ${getThemeClasses()} rounded-2xl p-12 max-w-lg mx-auto mt-20`}>
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 mb-6 shadow-lg">
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Success!</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">Your form has been submitted successfully. Thank you for your response!</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-[#330065] bg-purple-50 hover:bg-purple-100 rounded-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#330065] focus:ring-offset-2"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Submit Another Response
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className={`form-container p-8 max-w-3xl mx-auto mt-2`}>
        {/* Header Section */}
        <div className="mb-2">
          <div className="flex items-center justify-center mb-4">
            <div className="h-1 w-12 bg-gradient-to-r from-[#330065] to-purple-400 rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Complete Your Form</h2>
          <p className="text-gray-600 text-center">Please fill out all required fields below</p>
        </div>

        {/* Progress Bar */}
        {showProgress && visibleFields.length > 0 && (
          <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
            <div className="flex justify-between items-center text-sm font-medium text-gray-700 mb-3">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#330065]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Progress
              </span>
              <span className="text-[#330065] font-semibold">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#330065] to-purple-500 h-3 rounded-full transition-all duration-500 ease-out shadow-sm" 
                style={{ width: `${progress}%` }} 
              />
            </div>
            <div className="mt-2 text-xs text-gray-600">
              {completedFields} of {visibleFields.length} fields completed
            </div>
          </div>
        )}

        {/* Error Display */}
        {submitError && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-red-800 mb-1">Submission Error</h4>
                <p className="text-sm text-red-700">{submitError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {visibleFields.map((field, index) => (
            <div key={field._id} className="relative">
              {/* Field Number Indicator */}
              <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-r from-[#330065] to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                {index + 1}
              </div>
              <div className="pl-8">
                <DynamicField
                  field={field}
                  value={field.type === 'checkbox' ? (formData[field._id] || []) : formData[field._id]}
                  onChange={(value) => handleFieldChange(field._id, value)}
                  error={errors[field._id]}
                />
              </div>
            </div>
          ))}

          {/* Empty State */}
          {visibleFields.length === 0 && (
            <div className="text-center py-16">
              <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No Fields Available</h3>
              <p className="text-gray-500">There are currently no fields to display in this form.</p>
            </div>
          )}

          {/* Submit Button */}
          {visibleFields.length > 0 && (
            <div className="pt-8 border-t border-gray-100">
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#330065] disabled:cursor-not-allowed disabled:transform-none ${
                    theme === "minimal"
                      ? "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 disabled:from-gray-400 disabled:to-gray-500 shadow-lg"
                      : "bg-gradient-to-r from-[#330065] to-purple-600 hover:from-[#2a0055] hover:to-purple-700 disabled:from-purple-300 disabled:to-purple-400 shadow-lg"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    <span className="flex items-center">
                      {submitButtonText}
                      <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  )}
                  
                  {/* Button shine effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
              </div>
              
              {/* Form Footer */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 flex items-center justify-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Your information is secure and encrypted
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};