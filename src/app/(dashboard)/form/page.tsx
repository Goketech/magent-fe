"use client";

import { Suspense } from "react";
import FormBuilderClientContent from "./FormBuilderClientContent";

export default function CreateFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormBuilderClientContent />
    </Suspense>
  );
}