// components/form-builder/FieldComponents/DateField.tsx
import React from 'react';
import { FormField } from '@/lib/form.types';

interface DateFieldProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export const DateField: React.FC<DateFieldProps> = ({
  field,
  value,
  onChange,
  error,
  disabled = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Get date constraints from field config or validation
  const minDate = field.config.minDate || field.validation.minDate;
  const maxDate = field.config.maxDate || field.validation.maxDate;
  const dateFormat = field.config.dateFormat || 'date'; // 'date', 'datetime-local', 'time'

  const baseClassName = `
    w-full px-3 py-2 border rounded-md shadow-sm transition-colors
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${error ? 'border-red-500' : 'border-gray-300'}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-400'}
    ${field.config.className || ''}
  `;

  return (
    <div className={`mb-4 ${field.config.className || ''}`} style={field.config.style}>
      <label htmlFor={field.id || field._id} className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {(field.description || field.config.helpText) && (
        <p className="text-sm text-gray-600 mb-2">
          {field.description || field.config.helpText}
        </p>
      )}
      
      <input
        id={field.id || field._id}
        type={dateFormat}
        value={value || ''}
        onChange={handleChange}
        placeholder={field.placeholder || field.config.placeholder}
        required={field.required}
        disabled={disabled}
        min={minDate}
        max={maxDate}
        className={baseClassName}
        style={field.config.style}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {field.validation.customMessage || error}
        </p>
      )}
      
      {/* Show format hint if specified */}
      {field.config.showFormatHint && (
        <p className="mt-1 text-xs text-gray-500">
          {dateFormat === 'date' && 'Format: YYYY-MM-DD'}
          {dateFormat === 'datetime-local' && 'Format: YYYY-MM-DDTHH:MM'}
          {dateFormat === 'time' && 'Format: HH:MM'}
        </p>
      )}
    </div>
  );
};