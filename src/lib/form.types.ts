// types/form.types.ts

export type FieldType = 
  | 'text' 
  | 'textarea' 
  | 'email' 
  | 'number' 
  | 'radio' 
  | 'checkbox' 
  | 'select' 
  | 'slider' 
  | 'date' 
  | 'file' 
  | 'rating';

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  customMessage?: string;
}

export interface FieldConfig {
  // Common config
  placeholder?: string;
  defaultValue?: any;
  helpText?: string;
  
  // Options for radio, checkbox, select
  options?: Array<{
    label: string;
    value: string | number;
  }>;
  
  // Slider specific
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  
  // File specific
  accept?: string;
  multiple?: boolean;
  maxFileSize?: number; // in bytes
  
  // Text/Textarea specific
  rows?: number;
  
  // Select specific
  allowMultiple?: boolean;
  searchable?: boolean;
  
  // Rating specific
  maxRating?: number;
  allowHalf?: boolean;
  
  // Styling
  className?: string;
  style?: React.CSSProperties;
}

export interface ConditionalLogic {
  showIf: Array<{
    fieldId: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'is_empty' | 'is_not_empty';
    value: any;
  }>;
  logic: 'and' | 'or';
}

export interface FormField {
  id: string;
  _id: string;
  type: FieldType;
  label: string;
  options?: string[];
  placeholder?: string;
  description?: string;
  required: boolean;
  order: number;
  validation: ValidationRules;
  config: FieldConfig;
  conditional?: ConditionalLogic;
}

export interface FormBuilderState {
  fields: FormField[];
  selectedFieldId: string | null;
  isDragging: boolean;
  previewMode: boolean;
}

export interface FormSubmissionData {
  [fieldId: string]: any;
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  settings: FormSettings;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  slug?: string;
}

export interface FormSettings {
  submitButtonText?: string;
  successMessage?: string;
  redirectUrl?: string;
  allowMultipleSubmissions?: boolean;
  requireAuth?: boolean;
  theme?: 'default' | 'minimal' | 'modern';
  customCss?: string;
}

export interface FormSubmission {
  id: string;
  formId: string;
  data: FormSubmissionData;
  submittedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}