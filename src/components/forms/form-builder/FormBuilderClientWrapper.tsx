"use client";

import dynamic from "next/dynamic";
import { FormField } from "@/lib/form.types";
import { useCallback } from "react";

const FormBuilder = dynamic(
  () => import("@/components/forms/form-builder/FormBuilder").then((m) => m.FormBuilder),
  { ssr: false }
);

interface Props {
  initialFields: FormField[];
}

export default function FormBuilderClientWrapper({ initialFields }: Props) {
  const handleSave = useCallback(async (fields: FormField[]) => {
    await fetch("/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields }),
    });
    alert("Saved successfully!");
  }, []);

  const handlePreview = useCallback(() => {
    console.log("Preview triggered");
    // Could navigate to preview page if desired
  }, []);

  return (
    <FormBuilder
      initialFields={initialFields}
      onSave={handleSave}
      onPreview={handlePreview}
    />
  );
}
