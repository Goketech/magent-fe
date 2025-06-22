// components/form-renderer/FormRenderer.tsx
import React, { useState, useCallback } from 'react';
import { FormField, FormSubmissionData } from '@/lib/form.types';
import { DynamicField } from './DynamicField';
import { validateFormData } from '@/utils/validation';

interface FormRendererProps {
  fields: FormField[];
  onSubmit: (data: FormSubmissionData) => Promise<void>;
  theme?: 'default' | 'minimal' | 'modern';
  customCss?: string;
  submitButtonText?: string;
  showProgress?: boolean;
}

export const FormRenderer: React.FC<FormRendererProps> = ({
  fields,
  onSubmit,
  theme = 'default',
  customCss,
  submitButtonText = 'Submit',
  showProgress = false
}) => {
  const [formData, setFormData] = useState<FormSubmissionData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFieldChange = useCallback((fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  }, [errors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const visibleFields = getVisibleFields(fields, formData);
    const validation = validateFormData(visibleFields, formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      // Scroll to first error
      const firstErrorField = Object.keys(validation.errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({});
      setErrors({});
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      // You might want to show a general error message here
    } finally {
      setIsSubmitting(false);
    }
  };

  const getVisibleFields = (fields: FormField[], formData: FormSubmissionData) => {
    return fields.filter(field => 
      shouldShowField(field, formData)
    ).sort((a, b) => a.order - b.order);
  };

  const visibleFields = getVisibleFields(fields, formData);
  const completedFields = visibleFields.filter(field => {
    const value = formData[field.id];
    return value !== undefined && value !== null && value !== '';
  }).length;
  
  const progress = visibleFields.length > 0 ? (completedFields / visibleFields.length) * 100 : 0;

  const getThemeClasses = () => {
    switch (theme) {
      case 'minimal':
        return 'bg-white border border-gray-200 shadow-sm';
      case 'modern':
        return 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg';
      default:
        return 'bg-white shadow-md';
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
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`form-container ${getThemeClasses()} rounded-lg p-6 max-w-2xl mx-auto`}
    //   style={customCss ? { ...customCss } : undefined}
    >
      {showProgress && visibleFields.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {visibleFields.map(field => (
          <DynamicField
            key={field._id}
            field={field}
            value={formData[field.id]}
            onChange={(value) => handleFieldChange(field.id, value)}
            error={errors[field.id]}
          />
        ))}
        
        {visibleFields.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No fields to display
          </div>
        )}
        
        {visibleFields.length > 0 && (
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                px-6 py-3 rounded-md font-medium transition-colors
                ${theme === 'minimal' 
                  ? 'bg-gray-900 text-white hover:bg-gray-800' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              `}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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

// Helper function for conditional logic
function shouldShowField(field: FormField, formData: FormSubmissionData): boolean {
  if (!field.conditional) return true;
  
  const { showIf, logic } = field.conditional;
  const results = showIf.map(condition => {
    const fieldValue = formData[condition.fieldId];
    
    switch (condition.operator) {
      case 'equals':
        return fieldValue === condition.value;
      case 'not_equals':
        return fieldValue !== condition.value;
      case 'contains':
        return typeof fieldValue === 'string' && fieldValue.includes(condition.value);
      case 'greater_than':
        return Number(fieldValue) > Number(condition.value);
      case 'less_than':
        return Number(fieldValue) < Number(condition.value);
      case 'is_empty':
        return !fieldValue || fieldValue === '' || (Array.isArray(fieldValue) && fieldValue.length === 0);
      case 'is_not_empty':
        return fieldValue && fieldValue !== '' && (!Array.isArray(fieldValue) || fieldValue.length > 0);
      default:
        return false;
    }
  });
  
  return logic === 'and' ? results.every(Boolean) : results.some(Boolean);
}