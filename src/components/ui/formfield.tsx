// components/SelectField.tsx
import React from "react";
import { FieldHookConfig, useField } from "formik";


interface OptionType {
    value: string;
    label: string;
  }
  
  interface SelectFieldProps {
    label: string;
    required?: boolean;
    options: OptionType[];
  }

export const SelectField: React.FC<SelectFieldProps & FieldHookConfig<string>> = ({
  label,
  required = false,
  options,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label htmlFor={props.name} className="block font-medium text-[#212221] mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...field}
        {...props}
        className="w-full p-2 border border-[#D7D7D7] rounded text-[#999999]"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt:OptionType) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
};

// components/InputField.tsx

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps & FieldHookConfig<string | number>> = ({
  label,
  type = "text",
  placeholder,
  required = false,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label htmlFor={props.name} className="block font-medium text-[#212221] mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...field}
        {...props}
        type={type}
        className="w-full p-2 border border-[#D7D7D7] rounded"
        placeholder={placeholder}
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default InputField;
