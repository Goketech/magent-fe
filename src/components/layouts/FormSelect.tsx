import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type Option = { label: string; value: string | number };

interface FormSelectProps {
  placeholder?: string;
  options?: Option[];
  label?: string;
  value?: string | number;
  onChange?: (e: { target: { value: string } }) => void;
  style?: React.CSSProperties;
  tabIndex?: number;
  onSelectionChange?: (selectedValue: string) => void;
}

const FormSelect: React.FC<FormSelectProps> = ({
  placeholder = "Select an option",
  options = [],
  value,
  onChange,
  label,
  onSelectionChange,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: Option): void => {
    if (onChange) {
      onChange({ target: { value: String(option.value) } });
    }
    if (onSelectionChange) {
      onSelectionChange(String(option.value));
    }
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="w-full max-w-[500px] relative">
      <label className="block text-[#212221] text-sm mb-2">{label}</label>
      <div
        className={`
          w-full px-4 py-3 rounded-lg border-[0.5px] transition-all duration-200 cursor-pointer
          flex items-center justify-between
          ${
            isFocused || isOpen
              ? "border-[#330065] shadow-sm"
              : "border-[#D7D7D7] hover:border-[#330065]"
          }
        `}
        onClick={() => {
          setIsOpen(!isOpen);
          setIsFocused(!isOpen);
        }}
        onBlur={(e) => {
          // Only close if clicking outside the component
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setTimeout(() => {
              setIsFocused(false);
              setIsOpen(false);
            }, 150);
          }
        }}
        tabIndex={0}
        {...props}
      >
        <span
          style={{
            color: selectedOption ? "#212221" : "#BABABA",
            fontSize: selectedOption ? "16px" : "14px",
          }}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={20}
          color="#BABABA"
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-[8px] shadow-lg z-10 max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <div
              key={option.value || index}
              className="px-4 py-3 hover:bg-[#EBE6F0] text-[#330065] cursor-pointer transition-colors duration-150"
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(option);
              }}
              style={{
                color: "#212221",
                fontSize: "16px",
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormSelect;
