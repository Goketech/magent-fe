// components/form-builder/FieldComponents/SliderField.tsx
import React from 'react';
import { FormField } from '@/lib/form.types';

interface SliderFieldProps {
  field: FormField;
  value: number;
  onChange: (value: number) => void;
  error?: string;
  disabled?: boolean;
}

export const SliderField: React.FC<SliderFieldProps> = ({
  field,
  value,
  onChange,
  error,
  disabled = false
}) => {
  const min = field.config.min ?? field.validation.min ?? 0;
  const max = field.config.max ?? field.validation.max ?? 100;
  const step = field.config.step ?? 1;
  const showValue = field.config.showValue ?? true;
  const currentValue = value ?? field.config.defaultValue ?? min;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  // Calculate the percentage for styling
  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={`mb-4 ${field.config.className || ''}`} style={field.config.style}>
      <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {(field.description || field.config.helpText) && (
        <p className="text-sm text-gray-600 mb-3">
          {field.description || field.config.helpText}
        </p>
      )}
      
      <div className="space-y-3">
        {/* Value display */}
        {showValue && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Value:</span>
            <span className="text-lg font-semibold text-gray-900">{currentValue}</span>
          </div>
        )}
        
        {/* Slider container */}
        <div className="relative">
          <input
            id={field.id}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            required={field.required}
            className={`
              w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
              slider-thumb:appearance-none slider-thumb:h-5 slider-thumb:w-5 
              slider-thumb:rounded-full slider-thumb:bg-blue-600 slider-thumb:cursor-pointer
              slider-thumb:border-2 slider-thumb:border-white slider-thumb:shadow-md
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${error ? 'bg-red-100' : ''}
            `}
            style={{
              background: disabled 
                ? undefined 
                : `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`
            }}
          />
        </div>
        
        {/* Min/Max labels */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {field.validation.customMessage || error}
        </p>
      )}
      
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3B82F6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        input[type="range"]::-webkit-slider-track {
          height: 8px;
          border-radius: 4px;
        }
        
        input[type="range"]::-moz-range-track {
          height: 8px;
          border-radius: 4px;
          background: #E5E7EB;
        }
      `}</style>
    </div>
  );
};