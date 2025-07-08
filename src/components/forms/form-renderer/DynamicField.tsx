// components/form-renderer/DynamicField.tsx
import React from 'react';
import { FormField } from '@/lib/form.types';
import { TextField } from '../form-builder/FieldComponents/TextField';
import { RadioField } from '../form-builder/FieldComponents/RadioField';
import { SliderField } from '../form-builder/FieldComponents/SliderField';
import { SelectField } from '../form-builder/FieldComponents/SelectField';
import { CheckboxField } from '../form-builder/FieldComponents/CheckboxField';
import { DateField } from '../form-builder/FieldComponents/DateField';

interface DynamicFieldProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

export const DynamicField: React.FC<DynamicFieldProps> = ({
  field,
  value,
  onChange,
  error
}) => {
  // Debug logging - remove this once you find the issue
  // console.log(`Field ${field._id}:`, {
  //   type: field.type,
  //   label: field.label,
  //   value: value,
  //   valueType: typeof value,
  //   options: field.options,
  //   field: field
  // });

  const commonProps = {
    field,
    value,
    onChange,
    error
  };

  switch (field.type) {
    case 'text':
    case 'email':
    case 'textarea':
      return <TextField {...commonProps} />;
    case 'radio':
      return <RadioField {...commonProps} />;
    case 'slider':
      return <SliderField {...commonProps} />;
    case 'checkbox':
      return <CheckboxField {...commonProps} />;
    case 'select':
      return <SelectField {...commonProps} />;
    case 'date':
      return <DateField {...commonProps} />;
    // case 'file':
    //   return <FileField {...commonProps} />;
    // case 'rating':
    //   return <RatingField {...commonProps} />;
    // case 'number':
    //   return <NumberField {...commonProps} />;
    default:
      console.warn(`Unsupported field type: ${field.type}`);
      return <div>Unsupported field type: {field.type}</div>;
  }
};