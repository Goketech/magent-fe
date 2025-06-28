// utils/validation.ts
import { FormField, FormSubmissionData } from '../lib/form.types';
import DOMPurify from 'isomorphic-dompurify';
import validator from 'validator';


export function validateFormData(fields: FormField[], data: FormSubmissionData) {
  const errors: Record<string, string> = {};
  
  for (const field of fields) {
    const value = data[field._id];
    
    // Required field validation
    if (field.required && (!value || value === '')) {
      errors[field._id] = `${field.label} is required`;
      continue;
    }
    
    if (!value) continue;
    
    // Type-specific validation
    switch (field.type) {
      case 'email':
        if (!validator.isEmail(value)) {
          errors[field._id] = 'Please enter a valid email address';
        }
        break;
        
      case 'text':
      case 'textarea':
        // Sanitize HTML input
        data[field._id] = DOMPurify.sanitize(value);
        
        // if (field.validation.minLength && value.length < field.validation.minLength) {
        //   errors[field.id] = `Minimum ${field.validation.minLength} characters required`;
        // }
        // if (field.validation.maxLength && value.length > field.validation.maxLength) {
        //   errors[field.id] = `Maximum ${field.validation.maxLength} characters allowed`;
        // }
        break;
        
      case 'number':
      case 'slider':
        const numValue = Number(value);
        if (isNaN(numValue)) {
          errors[field._id] = 'Please enter a valid number';
        } else {
          if (field.validation.min !== undefined && numValue < field.validation.min) {
            errors[field._id] = `Minimum value is ${field.validation.min}`;
          }
          if (field.validation.max !== undefined && numValue > field.validation.max) {
            errors[field._id] = `Maximum value is ${field.validation.max}`;
          }
        }
        break;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}