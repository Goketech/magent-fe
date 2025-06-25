"use client";

import React, { useState, useEffect } from "react";
import { FormField } from "@/lib/form.types";

interface FieldEditorProps {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
  onDelete: () => void;
}

export const FieldEditor: React.FC<FieldEditorProps> = ({ field, onUpdate, onDelete }) => {
  const [options, setOptions] = useState(field.config.options || []);

  useEffect(() => {
    setOptions(field.config.options || []);
  }, [field.config.options]);

  const handleAddOption = () => {
    const newOption = { label: "New option", value: "New option" };
    const updatedOptions = [...options, newOption];
    setOptions(updatedOptions);
    onUpdate({ config: { ...field.config, options: updatedOptions } });
  };

  const handleOptionChange = (index: number, newLabel: string) => {
    const updatedOptions = options.map((opt, i) =>
      i === index ? { ...opt, label: newLabel, value: newLabel } : opt
    );
    setOptions(updatedOptions);
    onUpdate({ config: { ...field.config, options: updatedOptions } });
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    onUpdate({ config: { ...field.config, options: updatedOptions } });
  };

  const isOptionsField = ["radio", "select", "checkbox"].includes(field.type);

  return (
    <div className="space-y-6 p-6 border-l border-gray-200 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-[#330065]">Edit Field</h2>

      {/* Label */}
      <label className="block text-sm font-medium text-gray-800">
        Label
        <input
          type="text"
          value={field.label}
          onChange={(e) => onUpdate({ label: e.target.value })}
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#330065]"
        />
      </label>

      {/* Placeholder */}
      <label className="block text-sm font-medium text-gray-800">
        Placeholder
        <input
          type="text"
          value={field.placeholder || ""}
          onChange={(e) => onUpdate({ placeholder: e.target.value })}
          className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#330065]"
        />
      </label>

      {/* Required */}
      <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-800">
        <input
          type="checkbox"
          checked={field.required}
          onChange={(e) => onUpdate({ required: e.target.checked })}
          className="rounded text-[#330065] focus:ring-[#330065]"
        />
        Required
      </label>

      {/* Options editor for radio/select/checkbox */}
      {isOptionsField && (
        <div className="space-y-3 mt-4 border-t pt-4">
          <div className="text-sm font-medium text-gray-800">Options:</div>
          {options.length === 0 && (
            <p className="text-xs text-gray-500 italic">No options yet. Add one below.</p>
          )}

          {options.map((opt, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={opt.label}
                placeholder="Option label"
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="flex-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#330065]"
              />
              <button
                onClick={() => handleRemoveOption(index)}
                className="bg-[#330065] text-white px-3 py-1 rounded hover:bg-[#441588] transition"
                title="Remove option"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            onClick={handleAddOption}
            className="bg-[#330065] text-white px-3 py-1 rounded hover:bg-[#441588] transition text-sm w-full"
          >
            + Add Option
          </button>
        </div>
      )}

      <button
        onClick={onDelete}
        className="bg-white border border-[#330065] text-[#330065] hover:bg-[#330065] hover:text-white transition w-full px-3 py-2 rounded mt-4"
      >
        Delete Field
      </button>
    </div>
  );
};
