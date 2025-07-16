"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MdArrowBackIos } from "react-icons/md";
import FormBuilderClientWrapper from "@/components/forms/form-builder/FormBuilderClientWrapper";
import { apiClient } from "@/utils/apiClient";
import { FormField } from "@/lib/form.types";

interface Props {
  formId?: string;
}

export default function FormBuilderClientContent({ formId }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [initialFields, setInitialFields] = useState<FormField[]>([]);
  const [initialTitle, setInitialTitle] = useState("");
  const [initialDescription, setInitialDescription] = useState("");
  const [campaignId, setCampaignId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cid = searchParams.get("campaignId");
    const isEdit = !!formId;

    if (isEdit) {
      // fetch form for editing
      const fetchForm = async () => {
        try {
          const form = await apiClient(`/form/${formId}`);
          setInitialFields(form.fields || []);
          setInitialTitle(form.title || "");
          setInitialDescription(form.description || "");
          const campaign = form.campaignId?._id || form.campaignId;
          setCampaignId(campaign);
          console.log(form, "Fetched form for editing");
        } catch (err) {
          console.error("Failed to load form", err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchForm();
    } else {
      setCampaignId(cid ?? undefined);
      setIsLoading(false);
    }
  }, [formId, searchParams]);

  if (isLoading) {
    return <div className="p-6 text-sm text-gray-600">Loading form...</div>;
  }

  return (
    <main className="h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 text-sm"
          >
            <MdArrowBackIos size={16} className="mr-1" />
            Back
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              {formId ? "Edit Form" : "Create Form"}
            </h1>
            <p className="text-sm text-gray-500">
              {campaignId
                ? `Form for Campaign: ${campaignId}`
                : "No Campaign Linked"}
            </p>
          </div>
          {campaignId && (
            <div className="text-xs text-gray-400">Campaign ID: {campaignId}</div>
          )}
        </div>
      </div>
      <div className="h-[calc(100vh-80px)]">
        <FormBuilderClientWrapper
          initialFields={initialFields}
          initialTitle={initialTitle}
          initialDescription={initialDescription}
          campaignId={campaignId}
          formId={formId}
        />
      </div>
    </main>
  );
}
