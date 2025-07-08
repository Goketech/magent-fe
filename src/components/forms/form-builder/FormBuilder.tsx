// components/form-builder/FormBuilder.tsx
import React, { useState, useCallback } from "react";
import { generateUUID, getDefaultConfig } from "@/utils/formHelpers";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FormField, FormBuilderState, FieldType } from "@/lib/form.types";
import { FieldList } from "./FieldComponents/Sidebar/FieldList";
import { FieldEditor } from "./FieldEditor";
import { FormPreview } from "../shared/FormPreview";
import { FormCanvas } from "./FormCanvas";
import { useRouter  } from "next/navigation";
import { MdArrowBackIos } from "react-icons/md";

interface FormBuilderProps {
  initialFields?: FormField[];
  initialTitle?: string;
  initialDescription?: string;
  campaignId: string;
  onSave: (formData: {
    title: string;
    description: string;
    campaignId: string;
    fields: FormField[];
  }) => void;
  onPreview: () => void;
}

interface ExtendedFormBuilderState extends FormBuilderState {
  title: string;
  description: string;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  initialFields = [],
  initialTitle = "",
  initialDescription = "",
  campaignId,
  onSave,
  onPreview,
}) => {
  const [state, setState] = useState<ExtendedFormBuilderState>({
    fields: initialFields,
    selectedFieldId: null,
    isDragging: false,
    previewMode: false,
    title: initialTitle,
    description: initialDescription,
  });


  const addField = useCallback(
    (fieldType: FieldType) => {
      const uuid = generateUUID();
      const newField: FormField = {
        id: uuid,
        _id: uuid,
        type: fieldType,
        label: `New ${fieldType} Field`,
        required: false,
        order: state.fields.length,
        validation: {},
        config: getDefaultConfig(fieldType),
      };

      setState((prev) => ({
        ...prev,
        fields: [...prev.fields, newField],
        selectedFieldId: newField.id,
      }));
    },
    [state.fields.length]
  );

  const updateField = useCallback(
    (fieldId: string, updates: Partial<FormField>) => {
      setState((prev) => ({
        ...prev,
        fields: prev.fields.map((field) =>
          field.id === fieldId ? { ...field, ...updates } : field
        ),
      }));
    },
    []
  );

  const deleteField = useCallback((fieldId: string) => {
    setState((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field.id !== fieldId),
      selectedFieldId:
        prev.selectedFieldId === fieldId ? null : prev.selectedFieldId,
    }));
  }, []);

  const reorderFields = useCallback((dragIndex: number, hoverIndex: number) => {
    setState((prev) => {
      const dragField = prev.fields[dragIndex];
      const newFields = [...prev.fields];
      newFields.splice(dragIndex, 1);
      newFields.splice(hoverIndex, 0, dragField);

      return {
        ...prev,
        fields: newFields.map((field, index) => ({ ...field, order: index })),
      };
    });
  }, []);

  const handleSave = useCallback(() => {
    const formData = {
      title: state.title,
      description: state.description,
      campaignId,
      fields: state.fields,
    };
    onSave(formData);
  }, [state.title, state.description, state.fields, campaignId, onSave]);

  const updateFormInfo = useCallback(
    (field: "title" | "description", value: string) => {
      setState((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );
  const router = useRouter();


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-gray-50">
        <div className="flex items-center mb-4">
          
        </div>
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          {/* Form Info Section */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Form Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Form Title *
                </label>
                <input
                  type="text"
                  value={state.title}
                  onChange={(e) => updateFormInfo("title", e.target.value)}
                  placeholder="Enter form title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Form Description
                </label>
                <textarea
                  value={state.description}
                  onChange={(e) =>
                    updateFormInfo("description", e.target.value)
                  }
                  placeholder="Enter form description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campaign ID
                </label>
                <input
                  type="text"
                  value={campaignId}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Field List */}
          <FieldList onAddField={addField} />

          {/* Field Editor */}
          {state.selectedFieldId && (
            <FieldEditor
              field={state.fields.find((f) => f.id === state.selectedFieldId)!}
              onUpdate={(updates) =>
                updateField(state.selectedFieldId!, updates)
              }
              onDelete={() => deleteField(state.selectedFieldId!)}
            />
          )}
        </div>

        {/* Main Canvas */}
        <div className="flex-1 overflow-y-auto">
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Form Builder
                </h1>
                {state.title && (
                  <p className="text-sm text-gray-600 mt-1">
                    Editing: {state.title}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      previewMode: !prev.previewMode,
                    }))
                  }
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  {state.previewMode ? "Edit" : "Preview"}
                </button>
                <button
                  onClick={handleSave}
                  disabled={!state.title.trim()}
                  className="px-4 py-2 bg-[330065] text-white rounded-md hover:bg-purple-700 bg-purple-600 disabled:bg-purple-400 disabled:cursor-not-allowed transition-colors"
                >
                  Publish Form
                </button>
              </div>
            </div>

            {state.previewMode ? (
              <div className="max-w-2xl mx-auto">
                {/* Form Header in Preview */}
                <div className="mb-6 p-6 bg-white rounded-lg border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {state.title || "Untitled Form"}
                  </h2>
                  {state.description && (
                    <p className="text-gray-600">{state.description}</p>
                  )}
                </div>
                <FormPreview fields={state.fields} />
              </div>
            ) : (
              <FormCanvas
                fields={state.fields}
                selectedFieldId={state.selectedFieldId}
                onSelectField={(fieldId) =>
                  setState((prev) => ({ ...prev, selectedFieldId: fieldId }))
                }
                onReorderFields={reorderFields}
              />
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
