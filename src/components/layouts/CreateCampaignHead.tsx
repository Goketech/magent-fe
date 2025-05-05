import { CreateCampaignProps } from "./CreateCampaign";
import { ArrowLeft } from "lucide-react";

const CreateCampaignHead: React.FC<CreateCampaignProps> = ({ handleGoBack }) => {
    return (
      <div className="flex items-start justify-between w-full mb-6">
        <button
          onClick={handleGoBack}
          className="flex items-center text-gray-600 hover:text-gray-900 text-sm"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </button>
  
        {/* Center Content */}
        <div className="text-center flex-1">
          <h2 className="text-[#212221] text-2xl">Create Campaign</h2>
          <h4 className="text-[#6A6B6A] text-sm">
            Create a campaign that gets you results, FAST!
          </h4>
        </div>
  
      </div>
    );
  };

  export default CreateCampaignHead
