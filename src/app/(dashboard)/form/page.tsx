import { Metadata } from "next";
import FormBuilderClientWrapper from "@/components/forms/form-builder/FormBuilderClientWrapper";
import { FormField } from "@/lib/form.types";

export const metadata: Metadata = {
  title: "Forms Dashboard",
};

export default function FormsPage() {
  const initialFields: FormField[] = [];

  return (
    <main className="h-screen bg-gray-50">
      <FormBuilderClientWrapper initialFields={initialFields} />
    </main>
  );
}
