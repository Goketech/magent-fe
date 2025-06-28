// components/shared/FormPreview.tsx
import React from 'react';
import { FormField } from '@/lib/form.types';
import { DynamicField } from '../form-renderer/DynamicField';

interface FormPreviewProps {
  fields: FormField[];
}

export const FormPreview: React.FC<FormPreviewProps> = ({ fields }) => {
  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded bg-white">
      {fields
        .sort((a, b) => a.order - b.order)
        .map((field) => (
          <DynamicField
            key={field.id}
            field={field}
            value={field.config.defaultValue || ''}
            onChange={() => null} // preview only
          />
        ))}
    </div>
  );
};
