// components/form-builder/FieldComponents/TextField.tsx
import React from 'react';
import { FormField } from '@/lib/form.types';

interface TextFieldProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  field,
  value,
  onChange,
  error,
  disabled = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const baseClassName = `
    w-full px-3 py-2 border rounded-md shadow-sm transition-colors
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-400'}
    ${field.config.className || ''}
  `;

  const renderInput = () => {
    if (field.type === 'textarea') {
      return (
        <textarea
          id={field._id}
          value={value || ''}
          onChange={handleChange}
          placeholder={field.placeholder || field.config.placeholder}
          required={field.required}
          disabled={disabled}
          className={`${baseClassName} resize-vertical min-h-[100px]`}
          rows={field.config.rows || 4}
          // minLength={field.validation.minLength}
          // maxLength={field.validation.maxLength}
          style={field.config.style}
        />
      );
    }

    return (
      <input
        id={field._id}
        type={field.type === 'email' ? 'email' : field.type === 'number' ? 'number' : 'text'}
        value={value || ''}
        onChange={handleChange}
        placeholder={field.placeholder || field.config.placeholder}
        required={field.required}
        disabled={disabled}
        className={baseClassName}
        // minLength={field.validation.minLength}
        // maxLength={field.validation.maxLength}
        // min={field.type === 'number' ? field.validation.min : undefined}
        // max={field.type === 'number' ? field.validation.max : undefined}
        // pattern={field.validation.pattern}
        style={field.config.style}
      />
    );
  };

  return (
    <div className="mb-4">
      <label htmlFor={field._id} className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {(field.description || field.config.helpText) && (
        <p className="text-sm text-gray-600 mb-2">
          {field.description || field.config.helpText}
        </p>
      )}
      
      {renderInput()}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {field.validation.customMessage || error}
        </p>
      )}
    </div>
  );
};