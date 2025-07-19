// "use client"

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { MdOutlineCheckCircle } from "react-icons/md";
import { useToast } from "@/hooks/use-toast";
import { capitalizeEachWord } from "@/utils/capitalize";
import { MyCampaign as MyCampaignType } from "@/lib/types";

import { useWallet } from "@solana/wallet-adapter-react";

export interface Campaign {
  _id: string;
  name: string;
  campaignName: string;
  goals: string;
  kpis: string;
  duration: string;
  endDate: number;
  startDate: number;
  industry: string;
  status: "Active" | "completed" | "Pending" | "Inactive" | "Joined";
}

interface CampaignListProps {
  campaign: Campaign;
  onAccept: (id: string) => void;
  mycampaigns: MyCampaignType[];
  onViewDetails: (campaign: Campaign) => void;
  isJoined?: boolean;
}

const CampaignList: React.FC<CampaignListProps> = ({
  campaign,
  onAccept,
  onViewDetails,
  mycampaigns,
  isJoined,
}) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const { publicKey, signMessage, connected } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#E6F4EB] text-[#009137]";
      case "completed":
        return "bg-[#EBE6F0] text-[#330065]";
      case "pending":
        return "bg-[#FCF4E7] text-[#DD900D]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  const isCreatedByMe = mycampaigns.some(
    (myCamp) => myCamp.id === campaign._id
  );

  console.log(mycampaigns, "mycampaigns");

  const handleAccept = () => {
    const localStored = localStorage.getItem("wallet_connected_address");
    // Check if wallet is connected (either publicKey exists or stored address exists)
    if (
      localStored &&
      localStored !== "null" &&
      connected &&
      localStored === publicKey?.toBase58()
    ) {
      setIsModalOpen(true);
      onAccept(campaign._id);
    } else {
      toast({
        variant: "destructive",
        description: "Please Connect Your wallet to accept the campaign.",
      });
    }
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
      <tr
        className="border-b border-gray-200 hover:bg-gray-50"
        key={campaign._id}
      >
        <td className="py-3 px-4 text-[10px] md:text-xs">
          {capitalizeEachWord(campaign?.name)}
        </td>
        <td className="py-3 px-4 text-[10px] md:text-xs">
          {capitalizeEachWord(campaign?.name)}
        </td>
        <td className="py-3 px-4 text-[10px] md:text-xs">
          {capitalizeEachWord(campaign?.goals)}
        </td>
        <td className="py-3 px-4 text-[10px] md:text-xs">
          {capitalizeEachWord(
            "kpis" in campaign
              ? campaign.kpis === ""
                ? "N/A"
                : campaign.kpis
              : "N/A"
          )}
        </td>
        <td className="py-3 px-4 text-[10px] md:text-xs">
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
        <td className="py-3 px-4 text-[10px] md:text-xs">
          {capitalizeEachWord(campaign?.industry)}
        </td>
        <td className="py-3 px-4 text-[10px] md:text-xs">
          <span
            className={`px-[10px] py-2 rounded-md text-[10px] md:text-xs ${getStatusBadgeClass(
              campaign?.status
            )}`}
          >
            {capitalizeEachWord(campaign?.status)}
          </span>
        </td>
        <td className="py-3 px-4 text-[10px] md:text-xs">
          <div className="flex items-center gap-2">
            <button
  className={`rounded-md flex gap-3 items-center px-4 py-1.5 text-[10px] md:text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
    isJoined
      ? "bg-green-600 text-white hover:bg-green-700"
      : "bg-[#330065] text-white hover:bg-purple-800"
  }`}
  onClick={handleAccept}
  disabled={
    campaign.status === "completed" ||
    campaign.status === "Inactive" ||
    isJoined ||
    isCreatedByMe
  }
>
  <MdOutlineCheckCircle size={20} />
  {isJoined ? "Joined" : "Accept"}
</button>


            <div>
              <div className="relative">
                <button
                  className="text-gray-500 hover:bg-gray-100 p-1 rounded-full"
                  onClick={toggleOptions}
                >
                  <MoreVertical size={16} />
                </button>

                {showOptions && (
                  <div className="fixed w-32 right-3 bg-white border border-gray-200 rounded-md shadow-lg pointer-events-auto z-30">
                    <div className="py-1">
                      <button
                        className="block w-full text-left px-4 py-2 text-[10px] md:text-xs text-gray-700 hover:bg-gray-100"
                        onClick={handleViewDetails}
                      >
                        View details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default CampaignList;
