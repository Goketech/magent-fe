"use client";

import { Metadata } from "next";
import { Suspense } from "react"; // ✅
import FormBuilderClientContent from "./FormBuilderClientContent"; // new file


export default function FormsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormBuilderClientContent />
    </Suspense>
  );
}
