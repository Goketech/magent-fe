// app/forms/page.tsx
"use client";

import { Metadata } from "next";
import FormBuilderClientWrapper from "@/components/forms/form-builder/FormBuilderClientWrapper";
import { FormField } from "@/lib/form.types";
import { useRouter, useSearchParams } from "next/navigation";
import { MdArrowBackIos } from "react-icons/md";

// export const metadata: Metadata = {
//   title: "Form Builder - Create New Form",
//   description: "Create and customize forms for your campaigns"
// };

interface FormsPageProps {
  searchParams: { 
    campaignId?: string;
    // You can add other search params here if needed
    // formId?: string; // for editing existing forms
  };
}

export default function FormsPage() {
 const searchParams = useSearchParams();
  const campaignId = searchParams.get('campaignId'); // <- extract here
  const router = useRouter();
  
  const initialFields: FormField[] = [];
  return (
    <main className="h-screen bg-gray-50">
      {/* Header info */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center mb-4">
        <button
            onClick={() => router.back()} // or router.push('/previous-route') for specific route
            className="flex items-center text-gray-600 hover:text-gray-900 text-sm"
          >
            <MdArrowBackIos size={16} className="mr-1" />
            Back
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Form Builder</h1>
            <p className="text-sm text-gray-500">
              {campaignId 
                ? `Creating form for Campaign: ${campaignId}` 
                : "Create a new form"
              }
            </p>
          </div>
          {campaignId && (
            <div className="text-xs text-gray-400">
              Campaign ID: {campaignId}
            </div>
          )}
        </div>
      </div>

      {/* Form Builder */}
      <div className="h-[calc(100vh-80px)]">
        <FormBuilderClientWrapper 
          initialFields={initialFields} 
          campaignId={campaignId ?? undefined}
          // If you're editing an existing form, you can pass:
          // initialTitle={existingForm?.title}
          // initialDescription={existingForm?.description}
        />
      </div>
    </main>
  );
}