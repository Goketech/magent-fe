"use client";

import { Metadata } from "next";
import { Suspense } from "react"; // ✅
import FormBuilderClientContent from "./FormBuilderClientContent"; // new file


export default function FormsPage({ params }: { params: { formId: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormBuilderClientContent formId={params.formId} />
    </Suspense>
  );
}

