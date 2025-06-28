// components/form-builder/Sidebar/FieldList.tsx
import React from 'react';
import { FieldType } from '@/lib/form.types';

const AVAILABLE_FIELDS: { label: string; type: FieldType }[] = [
  { label: 'Text', type: 'text' },
//   { label: 'Textarea', type: 'textarea' },
//   { label: 'Email', type: 'email' },
//   { label: 'Number', type: 'number' },
  { label: 'Radio', type: 'radio' },
  { label: 'Checkbox', type: 'checkbox' },
  { label: 'Select', type: 'select' },
  { label: 'Slider', type: 'slider' },
//   { label: 'Date', type: 'date' },
//   { label: 'File', type: 'file' },
//   { label: 'Rating', type: 'rating' }
];

interface FieldListProps {
  onAddField: (type: FieldType) => void;
}

export const FieldList: React.FC<FieldListProps> = ({ onAddField }) => {
  return (
    <div className="space-y-2 p-2 border-r border-gray-200">
      <h2 className="text-lg font-medium mb-2">Add Field</h2>
      <div className="flex flex-col gap-1">
        {AVAILABLE_FIELDS.map((field) => (
          <button
            key={field.type}
            onClick={() => onAddField(field.type)}
            className="rounded border px-3 py-1 text-sm hover:bg-gray-100 text-left"
          >
            {field.label}
          </button>
        ))}
      </div>
    </div>
  );
};
