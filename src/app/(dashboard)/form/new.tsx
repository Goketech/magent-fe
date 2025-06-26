import { Suspense } from "react";
import NewFormPageClient from "../form/NewFormPageClient";

export default function NewFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewFormPageClient />
    </Suspense>
  );
}
