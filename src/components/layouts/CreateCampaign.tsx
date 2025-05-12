import { useState } from "react";
import { useFormik } from "formik";
import { campaignFormSchema } from "../../lib/validation";
import CreateCampaignHead from "./CreateCampaignHead";
import CampaignFormBasic from "./CampaignFormBasic";
import CampaignFormMediaKit from "./CampaignFormMediaKit";
import CampaignFormMediaUpload from "./CampaignFormMediaUpload";
import CreateModal from "../ui/CreateModal";
import { MyCampaign } from "@/lib/types";

export interface CreateCampaignProps {
  handleGoBack: () => void;
  onCampaignCreate: (campaignData: any) => void;
}

const CreateCampaign: React.FC<CreateCampaignProps> = ({ handleGoBack, onCampaignCreate }) => {
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingCampaign, setPendingCampaign] = useState<any>(null);

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

  const handleConfirmLaunch = () => {
    if (pendingCampaign) {
      onCampaignCreate(pendingCampaign);
      setShowConfirmModal(false);
      setPendingCampaign(null);
    }
  };

  // Modified cancel handler
  const handleCancel = () => {
    formik.resetForm(); // Reset the form state
    handleGoBack(); // Call the original go back handler
  };

  return (
    <div>
      <CreateCampaignHead handleGoBack={handleGoBack} />
      <div className="max-w-[780px] mx-auto p-6 bg-white rounded-lg shadow">
        <form onSubmit={formik.handleSubmit} className="space-y-8 mt-6">
          <CampaignFormBasic formik={formik} />
          <CampaignFormMediaKit formik={formik} />
          <CampaignFormMediaUpload onUpload={handleMediaUpload} />

          <div className="flex justify-end gap-8">
            <button
              type="button"
              onClick={handleCancel} // Use the new cancel handler
              className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#330065] text-white rounded-full hover:bg-purple-700"
              disabled={formik.isSubmitting}
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
          // formik.setSubmitting(false); // Reset submitting state when closing modal
        }}
        onConfirm={handleConfirmLaunch}
        campaign={pendingCampaign}
      />
    </div>
  );
};

export default CreateCampaign;