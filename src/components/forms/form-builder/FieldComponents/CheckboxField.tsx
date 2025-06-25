// components/form-builder/FieldComponents/CheckboxField.tsx
import React from "react";
import { FormField } from "@/lib/form.types";

interface CheckboxFieldProps {
  field: FormField;
  value: string[]; // Multi-select, so an array
  onChange: (value: string[]) => void;
  error?: string;
  disabled?: boolean;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  field,
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const options = field.config.options || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = e.target.value;
    let newValues = [...value];

    if (e.target.checked) {
      newValues.push(optionValue);
    } else {
      newValues = newValues.filter((v) => v !== optionValue);
    }

    onChange(newValues);
  };

  return (
    <div className={`mb-4 ${field.config.className || ""}`} style={field.config.style}>
      <fieldset>
        <legend className="block text-sm font-medium text-gray-700 mb-3">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </legend>

        {(field.description || field.config.helpText) && (
          <p className="text-sm text-gray-600 mb-3">
            {field.description || field.config.helpText}
          </p>
        )}

        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={`${field._id}-${index}`} className="flex items-center">
              <input
                id={`${field._id}-${index}`}
                name={field._id}
                type="checkbox"
                value={option.value}
                // checked={value.includes(String(option.value))}
                onChange={handleChange}
                disabled={disabled}
                className={`
                  h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500
                  ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                  ${error ? "border-red-500" : ""}
                `}
                // required={field.required && value.length === 0}
              />
              <label
                htmlFor={`${field._id}-${index}`}
                className={`
                  ml-3 block text-sm text-gray-900
                  ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                `}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>

        {options.length === 0 && (
          <p className="text-sm text-gray-500 italic">No options available</p>
        )}
      </fieldset>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {field.validation.customMessage || error}
        </p>
      )}
    </div>
  );
};
