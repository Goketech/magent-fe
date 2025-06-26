"use client";

import { useSearchParams } from "next/navigation";
import { FormField } from "@/lib/form.types";
import FormBuilderClientWrapper from "@/components/forms/form-builder/FormBuilderClientWrapper";

export default function NewFormPageClient() {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get("campaignId");
  const initialFields: FormField[] = [];

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Create a New Form</h1>

      {campaignId && (
        <p className="text-sm text-gray-500 mb-4">
          Creating form for campaign ID:{" "}
          <span className="font-mono text-blue-600">{campaignId}</span>
        </p>
      )}

      <FormBuilderClientWrapper
        initialFields={initialFields}
        campaignId={campaignId || undefined}
      />
    </main>
  );
}
