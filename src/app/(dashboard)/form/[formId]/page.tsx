// src/app/(dashboard)/form/[formId]/page.tsx
import FormBuilderClientContent from "../FormBuilderClientContent";

interface PageProps {
  params: Promise<{ formId: string }>;
}

export default async function EditFormPage({ params }: PageProps) {
  const { formId } = await params;
  return <FormBuilderClientContent formId={formId} />;
}
