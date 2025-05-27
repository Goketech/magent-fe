import { useState } from "react";
import { useFormik } from "formik";
import { campaignFormSchema } from "../../lib/validation";
import CreateCampaignHead from "./CreateCampaignHead";
import CampaignFormBasic from "./CampaignFormBasic";
import CampaignFormMediaKit from "./CampaignFormMediaKit";
import CampaignFormMediaUpload from "./CampaignFormMediaUpload";
import CreateModal from "../ui/CreateModal";
import { MyCampaign } from "@/lib/types";
import {Loading } from "../ui/loading"

export interface CreateCampaignProps {
  handleGoBack: () => void;
  onCampaignCreate: (campaignData: any) => void;
}

const CreateCampaign: React.FC<CreateCampaignProps> = ({ handleGoBack, onCampaignCreate }) => {
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingCampaign, setPendingCampaign] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      campaignName: "",
      campaignGoals: "",
      campaignKPIs: "",
      targetNumber: "",
      age: "",
      gender: "",
      industry: "",
      valuePerUser: "",
      amount: "",
      totalLiquidity: "",
      startDate: "",
      endDate: "",
      website: "",
      twitter: "",
      youtube: "",
      instagram: "",
      telegram: "",
      discord: "",
      otherResources: "",
      otherInformation: "",
      mediaFiles: [],
    },
    validateOnMount: false,
    validateOnChange: true,
    validationSchema: campaignFormSchema,
    onSubmit: (values) => {
      const formData = { ...values, mediaFiles };
      setPendingCampaign(formData);
      setShowConfirmModal(true);
    },
  });

  const handleMediaUpload = (files: File[]) => {
    setMediaFiles(files);
    formik.setFieldValue("mediaFiles", files);
  };

  const handleConfirmLaunch = async () => {
    if (pendingCampaign) {
      try {
        setIsLoading(true);
        await onCampaignCreate(pendingCampaign);
        // Only clear modal state on success
        setShowConfirmModal(false);
        setPendingCampaign(null);
      } catch (error) {
        console.error("Error creating campaign:", error);
        // Reset submission state when error occurs
        formik.setSubmitting(false);
        
        // Force modal to close with a small timeout to ensure state updates properly
        setTimeout(() => {
          setShowConfirmModal(false);
          setPendingCampaign(null);
        }, 10);
      } finally {
        setIsLoading(false); // Hide loading indicator
        
        // Ensure form can be submitted again regardless of outcome
        formik.setSubmitting(false);
      }
    }
  };
  
  // Modified cancel handler
  const handleCancel = () => {
    formik.resetForm(); // Reset the form state
    handleGoBack(); // Call the original go back handler
  };

  return (
    <div className="relative">
      <CreateCampaignHead handleGoBack={handleGoBack} />
      <div className="max-w-[780px] mx-auto p-6 bg-white rounded-lg shadow">
        <form onSubmit={formik.handleSubmit} className="space-y-8 mt-6">
          <CampaignFormBasic formik={formik} />
          <CampaignFormMediaKit formik={formik} />
          <CampaignFormMediaUpload onUpload={handleMediaUpload} />

          <div className="flex justify-end gap-8">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#330065] text-white rounded-full hover:bg-purple-700"
              disabled={formik.isSubmitting || isLoading}
            >
              Create a campaign
            </button>
          </div>
        </form>
      </div>

      <CreateModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          formik.setSubmitting(false);
        }}
        onConfirm={handleConfirmLaunch}
        campaign={pendingCampaign}
      />

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <Loading height="40" width="40" color="#330065"/>
            <p className="mt-4 text-gray-700">Processing your campaign...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCampaign;