import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import { MyCampaign } from "@/lib/types"; // Updated import

interface MyCampaignListProps {
  campaign: MyCampaign;
  onViewDetails: (campaign: MyCampaign) => void;
}

const MyCampaignList: React.FC<MyCampaignListProps> = ({
  campaign,
  onViewDetails,
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-[#E6F4EB] text-[#009137]";
      case "Completed":
        return "bg-[#EBE6F0] text-[#330065]";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Inactive":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleViewDetails = () => {
    onViewDetails(campaign);
    setShowOptions(false);
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-3 px-4 text-xs">{campaign.name}</td>
      <td className="py-3 px-4 text-xs">{campaign.goals}</td>
      <td className="py-3 px-4 text-xs flex gap-2">
        <span className="text-[#330065] bg-[#EBE6F0] py-[4px] px-[10px] rounded-md">
          {campaign.valuePerUser || 'N/A'}
        </span>
        <span className="bg-[#E6F4EB] text-[#009137] py-[4px] px-[10px] rounded-md">
          ${campaign.amount || '0'}
        </span>
      </td>
      <td className="py-3 px-4 text-xs">${campaign.totalLiquidity || '0'} USDC</td>
      <td className="py-3 px-4 text-xs">$ 0</td>
      <td className="py-3 px-4 text-xs">$ 0</td>
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
      <td className="py-3 px-4 text-xs">{campaign.publishersCount || 0}</td>
      <td className="py-3 px-4 text-xs">
        <span
          className={`px-[10px] py-2 rounded-md bg-[#FCF4E7] text-[#DD900D] `}
        >
          {campaign.status}
        </span>
      </td>
      <td className="py-3 px-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="relative z-50">
            <button
              className="text-gray-500 hover:bg-gray-100 p-1 rounded-full"
              onClick={toggleOptions}
            >
              <MoreVertical size={16} />
            </button>

            {showOptions && (
              <div className="absolute right-4 z-[9999] top-[-2rem] mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg ">
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
                      console.log(`Edit campaign ${campaign._id}`);
                      setShowOptions(false);
                    }}
                  >
                    Edit Campaign
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default MyCampaignList;