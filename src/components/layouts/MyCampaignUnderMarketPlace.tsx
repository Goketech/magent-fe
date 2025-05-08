// "use client"

import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { MdOutlineCheckCircle } from 'react-icons/md';
import { MyCampaign, CampaignStatus  } from '@/lib/types';

// export interface Campaign {
//   id: number;
//   advertiser: string;
//   campaignName: string;
//   goals: string;
//   kpis: string;
//   duration: string;
//   industry: string;
//   status: 'Active' | 'Completed';
// }

interface CampaignListProps {
  campaign: MyCampaign;
  onAccept: (id: number) => void;
  onViewDetails: (campaign: MyCampaign) => void;
}

const MyCampaignUnderMarketPlace: React.FC<CampaignListProps> = ({ campaign, onAccept, onViewDetails }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const getStatusBadgeClass = (status: CampaignStatus | any) => {
    switch (status) {
      case "Active":
        return "bg-[#E6F4EB] text-[#009137]";
      case "Completed":
        return "bg-[#EBE6F0] text-[#330065]";
      case "Pending":
        return "bg-[#FCF4E7] text-[#DD900D]";
      case "Inactive":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleAccept = () => {
    onAccept(campaign.id);
    setIsModalOpen(true)
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const handleViewDetails = () => {
    onViewDetails(campaign);
    setShowOptions(false);
  };

  return (
    <>
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-3 px-4 text-xs">{campaign.campaignName}</td>
      <td className="py-3 px-4 text-xs">{campaign.campaignName}</td>
      <td className="py-3 px-4 text-xs">{campaign.campaignGoals}</td>
      <td className="py-3 px-4 text-xs">{campaign.campaignKPIs ? "" : "-----" }</td>
      <td className="py-3 px-4 text-xs">
        {campaign.startDate && campaign.endDate ? (
          <>
            {new Date(campaign.startDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}{" "}
            -{" "}
            {new Date(campaign.endDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </>
        ) : (
          "N/A"
        )}
      </td>
      <td className="py-3 px-4 text-xs">{campaign.industry}</td>
      <td className="py-3 px-4 text-xs">
      <span
          className={`px-[10px] py-2 rounded-md bg-[#FCF4E7] text-[#DD900D] `}
        >
          Pending
        </span>
      </td>
      <td className="py-3 px-4 text-xs">
        <div className="flex items-center gap-2">
          <button 
            className="rounded-md bg-[#330065] flex gap-3 items-center text-white px-4 py-1.5 text-xs hover:bg-purple-800 transition-colors"
            onClick={handleAccept}
          >
            <MdOutlineCheckCircle size={20}/>
            Accept
          </button>
          <div className="relative">
            <button 
              className="text-gray-500 hover:bg-gray-100 p-1 rounded-full"
              onClick={toggleOptions}
            >
              <MoreVertical size={16} />
            </button>
            
            {showOptions && (
              <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button 
                    className="block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                    onClick={handleViewDetails}
                  >
                    View details
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      console.log(`Reject campaign ${campaign.id}`);
                      setShowOptions(false);
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
    </>
  );
};

export default MyCampaignUnderMarketPlace;