// src/app/(dashboard)/form/[formId]/page.tsx
import FormBuilderClientContent from "../FormBuilderClientContent";

interface PageProps {
  params: { formId: string };
}

export default function EditFormPage({ params }: PageProps) {
  const formId = params.formId;
  return <FormBuilderClientContent formId={formId} />;
}
