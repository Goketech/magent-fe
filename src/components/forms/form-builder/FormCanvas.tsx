// components/form-builder/FormCanvas.tsx
import React, { useRef } from 'react';
import { FormField } from '@/lib/form.types';
import { useDrag, useDrop } from 'react-dnd';

interface FormCanvasProps {
  fields: FormField[];
  selectedFieldId: string | null;
  onSelectField: (fieldId: string) => void;
  onReorderFields: (dragIndex: number, hoverIndex: number) => void;
}

// DraggableField renders a single field box
const DraggableField: React.FC<{
  field: FormField;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  moveField: (dragIndex: number, hoverIndex: number) => void;
}> = ({ field, index, isSelected, onClick, moveField }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FIELD',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'FIELD',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveField(item.index, index);
        item.index = index;
      }
    },
  }));

  drag(drop(ref));

  return (
    <div
    
      ref={ref}
      onClick={onClick}
      className={`p-3 border mb-2 cursor-move rounded ${
        isSelected ? 'bg-blue-100 border-blue-400' : 'bg-white'
      } ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <span className="font-medium">{field.label}</span>
      <span className="text-xs text-gray-500 ml-2">({field.type})</span>
    </div>
  );
};

export const FormCanvas: React.FC<FormCanvasProps> = ({
  fields,
  selectedFieldId,
  onSelectField,
  onReorderFields,
}) => {
  return (
    <div className="space-y-2 border p-4 bg-white rounded min-h-[200px]">
      {fields.length === 0 ? (
        <p className="text-center text-gray-400">Add some fields from the sidebar →</p>
      ) : (
        fields
          .sort((a, b) => a.order - b.order)
          .map((field, index) => (
            <DraggableField
              key={`${field.id}-${index}`}
              field={field}
              index={index}
              isSelected={field.id === selectedFieldId}
              onClick={() => onSelectField(field.id)}
              moveField={onReorderFields}
            />
          ))
      )}
    </div>
  );
};
