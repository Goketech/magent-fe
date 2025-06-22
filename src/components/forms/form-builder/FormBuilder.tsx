// components/form-builder/FormBuilder.tsx
import React, { useState, useCallback } from 'react';
import { generateUUID, getDefaultConfig } from '@/utils/formHelpers';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FormField, FormBuilderState, FieldType } from '@/lib/form.types';
import { FieldList } from './FieldComponents/Sidebar/FieldList';
import { FieldEditor } from './FieldEditor';
import { FormPreview } from '../shared/FormPreview';
import { FormCanvas } from './FormCanvas';

interface FormBuilderProps {
  initialFields?: FormField[];
  onSave: (fields: FormField[]) => void;
  onPreview: () => void;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  initialFields = [],
  onSave,
  onPreview
}) => {
  const [state, setState] = useState<FormBuilderState>({
    fields: initialFields,
    selectedFieldId: null,
    isDragging: false,
    previewMode: false
  });

  const addField = useCallback((fieldType: FieldType) => {
    const newField: FormField = {
      id: generateUUID(),
      type: fieldType,
      label: `New ${fieldType} Field`,
      required: false,
      order: state.fields.length,
      validation: {},
      config: getDefaultConfig(fieldType)
    };

    setState(prev => ({
      ...prev,
      fields: [...prev.fields, newField],
      selectedFieldId: newField.id
    }));
  }, [state.fields.length]);

  const updateField = useCallback((fieldId: string, updates: Partial<FormField>) => {
    setState(prev => ({
      ...prev,
      fields: prev.fields.map(field => 
        field.id === fieldId ? { ...field, ...updates } : field
      )
    }));
  }, []);

  const deleteField = useCallback((fieldId: string) => {
    setState(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId),
      selectedFieldId: prev.selectedFieldId === fieldId ? null : prev.selectedFieldId
    }));
  }, []);

  const reorderFields = useCallback((dragIndex: number, hoverIndex: number) => {
    setState(prev => {
      const dragField = prev.fields[dragIndex];
      const newFields = [...prev.fields];
      newFields.splice(dragIndex, 1);
      newFields.splice(hoverIndex, 0, dragField);
      
      return {
        ...prev,
        fields: newFields.map((field, index) => ({ ...field, order: index }))
      };
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <FieldList onAddField={addField} />
          {state.selectedFieldId && (
            <FieldEditor
              field={state.fields.find(f => f.id === state.selectedFieldId)!}
              onUpdate={(updates) => updateField(state.selectedFieldId!, updates)}
              onDelete={() => deleteField(state.selectedFieldId!)}
            />
          )}
        </div>

        {/* Main Canvas */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Form Builder</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => setState(prev => ({ ...prev, previewMode: !prev.previewMode }))}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {state.previewMode ? 'Edit' : 'Preview'}
                </button>
                <button
                  onClick={() => onSave(state.fields)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Form
                </button>
              </div>
            </div>

            {state.previewMode ? (
              <FormPreview fields={state.fields} />
            ) : (
              <FormCanvas
                fields={state.fields}
                selectedFieldId={state.selectedFieldId}
                onSelectField={(fieldId) => setState(prev => ({ ...prev, selectedFieldId: fieldId }))}
                onReorderFields={reorderFields}
              />
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};