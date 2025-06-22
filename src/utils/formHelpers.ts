// utils/formHelpers.ts
import { FieldType, FieldConfig } from '@/lib/form.types';

export function getDefaultConfig(fieldType: FieldType): FieldConfig {
  switch (fieldType) {
    case 'text':
    case 'email':
    case 'textarea':
    case 'number':
      return { placeholder: '', defaultValue: '' };
    case 'radio':
    case 'checkbox':
    case 'select':
      return { options: [] };
    case 'slider':
      return { min: 0, max: 100, step: 1, showValue: true };
    case 'date':
      return {};
    case 'file':
      return { accept: '', multiple: false, maxFileSize: 5000000 };
    case 'rating':
      return { maxRating: 5, allowHalf: false };
    default:
      return {};
  }
}


export function generateUUID(): string {
  return crypto.randomUUID?.() || `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}
