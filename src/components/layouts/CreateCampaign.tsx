import { useState } from "react";
import { useFormik } from "formik";
import { campaignFormSchema } from "../../lib/validation";
import CreateCampaignHead from "./CreateCampaignHead";
import CampaignFormBasic from "./CampaignFormBasic";
import CampaignFormMediaKit from "./CampaignFormMediaKit";
import CampaignFormMediaUpload from "./CampaignFormMediaUpload";

export interface CreateCampaignProps {
  handleGoBack: () => void;
  onCampaignCreate: (campaignData: any) => void;
}

const CreateCampaign: React.FC<CreateCampaignProps> = ({ handleGoBack, onCampaignCreate }) => {
    const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  
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
      validateOnMount: false, // Set this to false
  validateOnChange: true, // Make sure this is true
  validationSchema: campaignFormSchema,
  onSubmit: (values) => {
    const formData = {
      ...values,
      mediaFiles: mediaFiles
    };
    console.log("Form submitted:", formData);
    onCampaignCreate(formData); // Call the callback with the form data
    alert("Campaign created successfully!");
  }
    });
    // const handleFormSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     console.log("Form submitted, validation status:", formik.isValid);
    //     console.log("Form errors:", formik.errors);
    //     formik.handleSubmit(e);
    //   };
      
  
    const handleMediaUpload = (files: File[]) => {
      setMediaFiles(files);
      formik.setFieldValue("mediaFiles", files);
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
                onClick={handleGoBack}
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
      </div>
    );
  };

export default CreateCampaign;
