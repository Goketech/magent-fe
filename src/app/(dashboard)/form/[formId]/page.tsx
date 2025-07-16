// src/app/(dashboard)/form/[formId]/page.tsx
import FormBuilderClientContent from "../FormBuilderClientContent";

interface PageProps {
  params: { formId: string };
}

export default function EditFormPage({ params }: PageProps) {
  return <FormBuilderClientContent formId={params.formId} />;
}