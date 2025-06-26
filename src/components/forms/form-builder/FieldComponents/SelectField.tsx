// components/form-builder/FieldComponents/SelectField.tsx
import React from "react";
import { FormField } from "@/lib/form.types";

interface SelectFieldProps {
  field: FormField;
  value: string | number | string[] | number[];
  onChange: (value: string | number | string[] | number[]) => void;
  error?: string;
  disabled?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  field,
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const options = field.config.options || [];

  const multiple = !!field.config.allowMultiple;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const selectedValues = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      onChange(selectedValues);
    } else {
      const val = e.target.value;
      const numValue = Number(val);
      onChange(isNaN(numValue) ? val : numValue);
    }
  };

  return (
    <div className={`mb-4 ${field.config.className || ""}`} style={field.config.style}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {(field.description || field.config.helpText) && (
        <p className="text-sm text-gray-600 mb-2">
          {field.description || field.config.helpText}
        </p>
      )}

      <select
        id={field.id}
        name={field.id}
        multiple={multiple}
        value={
          multiple
            ? Array.isArray(value)
              ? value.map(String)
              : value !== undefined && value !== null
              ? [String(value)]
              : []
            : value !== undefined && value !== null
            ? String(value)
            : ""
        }
        onChange={handleChange}
        disabled={disabled}
        className={`block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
          disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : ""
        } ${error ? "border-red-500" : ""}`}
        required={
          field.required &&
          (
            value === undefined ||
            value === null ||
            (typeof value === "string" && value.length === 0) ||
            (Array.isArray(value) && value.length === 0)
          )
        }
      >
        <option value="" disabled>
          {field.placeholder || "Select an option"}
        </option>
        {options.map((option, index) => (
          <option key={`${field.id}-${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {options.length === 0 && (
        <p className="text-sm text-gray-500 italic mt-2">No options available</p>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {field.validation.customMessage || error}
        </p>
      )}
    </div>
  );
};
