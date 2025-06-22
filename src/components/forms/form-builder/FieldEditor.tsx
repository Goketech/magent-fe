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
    setOptions((opts) => [...opts, { label: "New option", value: `option${opts.length + 1}` }]);
    onUpdate({ config: { ...field.config, options: [...options, { label: "New option", value: `option${options.length + 1}` }] } });
  };

  const handleOptionChange = (index: number, key: "label" | "value", value: string) => {
    const updatedOptions = options.map((opt, i) => (i === index ? { ...opt, [key]: value } : opt));
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
    <div className="space-y-4 p-4 border-l border-gray-200 bg-white">
      <h2 className="text-lg font-medium">Edit Field</h2>

      {/* Label */}
      <label className="block text-sm font-medium">
        Label
        <input
          type="text"
          value={field.label}
          onChange={(e) => onUpdate({ label: e.target.value })}
          className="mt-1 w-full border rounded p-1"
        />
      </label>

      {/* Placeholder */}
      <label className="block text-sm font-medium">
        Placeholder
        <input
          type="text"
          value={field.placeholder || ""}
          onChange={(e) => onUpdate({ placeholder: e.target.value })}
          className="mt-1 w-full border rounded p-1"
        />
      </label>

      {/* Required */}
      <label className="inline-flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={field.required}
          onChange={(e) => onUpdate({ required: e.target.checked })}
        />
        Required
      </label>

      {/* Options editor for radio/select/checkbox */}
      {isOptionsField && (
        <div className="space-y-2 mt-4 border-t pt-4">
          <div className="text-sm font-medium">Options:</div>
          {options.length === 0 && (
            <p className="text-xs text-gray-500">No options yet. Add one below.</p>
          )}
          {options.map((opt, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={opt.label}
                placeholder="Label"
                onChange={(e) => handleOptionChange(index, "label", e.target.value)}
                className="flex-1 border p-1 rounded"
              />
              <input
                type="text"
                value={opt.value}
                placeholder="Value"
                onChange={(e) => handleOptionChange(index, "value", e.target.value)}
                className="flex-1 border p-1 rounded"
              />
              <button
                onClick={() => handleRemoveOption(index)}
                className="text-red-500 text-sm"
                title="Remove option"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            onClick={handleAddOption}
            className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
          >
            + Add Option
          </button>
        </div>
      )}

      <button
        onClick={onDelete}
        className="mt-4 w-full border border-red-500 text-red-500 hover:bg-red-50 px-3 py-1 rounded"
      >
        Delete Field
      </button>
    </div>
  );
};
