import { MdArrowBackIos } from "react-icons/md";
import { MyCampaign } from "@/lib/types";
import { capitalizeEachWord } from "@/utils/capitalize";
import React, { useState } from "react";
import { MyCampaign as MyCampaignType } from "@/lib/types";
import AcceptModal from "@/components/ui/AcceptModal";
import { useToast } from "@/hooks/use-toast";

interface MyCampaignDetailsProps {
  campaign: MyCampaign;
  onBack: () => void;
  mycampaigns: MyCampaignType[];
  isCampaignJoined: (campaignId: string) => boolean;
  handleJoinSuccess?: (campaignId: string, joinResponse: any) => void;
}

const MyCampaignDetails: React.FC<MyCampaignDetailsProps> = ({
  campaign,
  onBack,
  isCampaignJoined,
  handleJoinSuccess,
  mycampaigns,
}) => {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { toast } = useToast();

  const isJoined = isCampaignJoined(campaign._id);
  const isCreatedByMe = mycampaigns.some(
    (myCamp) => myCamp.id === campaign._id
  );

  const handleCopyLink = async () => {
    try {
      // Check if feedback form URL exists
      if (!campaign.feedbackFormUrl) {
        toast({
          variant: "destructive",
          description: "No forms yet, check back later.",
        });
        return;
      }

      const publisherCampaigns = JSON.parse(
        localStorage.getItem("publisher_campaign") || "[]"
      );
      console.log("Publisher Campaigns: ", publisherCampaigns);
      const matchingCampaign = publisherCampaigns.find(
        (c: any) => c.campaignId === campaign._id
      );

      const referralCode = matchingCampaign?.referralCode;

      const urlWithReferral = referralCode
        ? `${campaign.feedbackFormUrl}?ref=${referralCode}`
        : campaign.feedbackFormUrl;

      await navigator.clipboard.writeText(urlWithReferral);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast({
        variant: "destructive",
        description: "Failed to copy link.",
      });
    }
  };
  const handleAccept = () => {
    const localStored = localStorage.getItem("wallet_connected_address");
    // Check if wallet is connected (either publicKey exists or stored address exists)
    if (localStored && localStored !== "null") {
      setIsModalOpen(true);
    } else {
      toast({
        variant: "destructive",
        description: "Please Connect Your wallet to accept the campaign.",
      });
    }
  };

  return (
    <div className="w-full p-3 sm:p-4 bg-white rounded-md shadow">
      <div className="flex items-center mb-3 sm:mb-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 text-xs sm:text-sm"
        >
          <MdArrowBackIos size={14} className="mr-1 sm:size-4" />
          Back
        </button>
      </div>

      <div
        className="rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 text-white relative overflow-hidden"
        style={{
          backgroundImage:
            "url('/details.png'), linear-gradient(#330065, #330065)",
          backgroundSize: "contain",
          backgroundRepeat: "repeat",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="flex justify-between items-start">
          <div className="pr-4">
            <h2 className="text-base sm:text-xl font-semibold mb-1">
              {capitalizeEachWord(campaign.name || "")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-10 mt-2 sm:mt-2">
              <div>
                <p className="text-xs opacity-70 py-1 sm:py-2">Campaign Goal</p>
                <p className="text-xs sm:text-sm">
                  {capitalizeEachWord(campaign?.goals || "")}
                </p>
              </div>
              <div>
                <p className="text-xs opacity-70 py-1 sm:py-2">Campaign KPIs</p>
                <p className="text-xs sm:text-sm">
                  {capitalizeEachWord(
                    "kpis" in campaign
                      ? campaign.kpis === ""
                        ? "N/A"
                        : campaign.kpis
                      : "N/A"
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs opacity-70 py-1 sm:py-2">Target Number</p>
                <p className="text-xs sm:text-sm">{campaign?.targetNumber}</p>
              </div>
              <div>
                <p className="text-xs opacity-70 py-1 sm:py-2">
                  Total Publishers
                </p>
                <p className="text-xs sm:text-sm">{campaign?.publisherCount}</p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0">
            <span className="bg-[#EBE6F0] text-[#330065] text-xs px-3 sm:px-6 py-1 sm:py-2 rounded-bl-md">
              {capitalizeEachWord(campaign?.status || "")}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div>
          <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
            Campaign Overview
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between gap-1 sm:gap-0">
              <p className="text-xs sm:text-sm text-gray-600">Campaign Name</p>
              <p className="text-xs sm:text-sm font-medium">
                {capitalizeEachWord(campaign?.name || "")}
              </p>
            </div>
            <div className="flex justify-between gap-1 sm:gap-0">
              <p className="text-xs sm:text-sm text-gray-600">Industry</p>
              <p className="text-xs sm:text-sm font-medium">
                {capitalizeEachWord(campaign?.industry || "")}
              </p>
            </div>
            <div className="flex justify-between gap-1 sm:gap-0">
              <p className="text-xs sm:text-sm text-gray-600">Campaign Goal</p>
              <p className="text-xs sm:text-sm font-medium">
                {capitalizeEachWord(campaign?.goals || "")}
              </p>
            </div>
            <div className="flex justify-between gap-1 sm:gap-0">
              <p className="text-xs sm:text-sm text-gray-600">Campaign KPIs</p>
              <p className="text-xs sm:text-sm font-medium">
                {capitalizeEachWord(campaign?.kpis || "N/A")}
              </p>
            </div>
            <div className="flex justify-between gap-1 sm:gap-0">
              <p className="text-xs sm:text-sm text-gray-600">
                Target Audience
              </p>
              <p className="text-xs sm:text-sm font-medium">
                {campaign?.targetAudience?.gender == "both"
                  ? "Male and Female"
                  : campaign?.targetAudience?.gender}{" "}
                ({campaign?.targetAudience?.age}
                {"+"})
              </p>
            </div>
            <div className="flex justify-between gap-1 sm:gap-0">
              <p className="text-xs sm:text-sm text-gray-600">
                Campaign Duration
              </p>
              <p className="text-xs sm:text-sm font-medium">
                {campaign.startDate && campaign.endDate
                  ? `${new Date(campaign.startDate).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric" }
                    )} - ${new Date(campaign.endDate).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric" }
                    )}`
                  : "N/A"}
              </p>
            </div>
            <div className="flex justify-between gap-1 sm:gap-0">
              <p className="text-xs sm:text-sm text-gray-600">Value Per User</p>
              <p className="text-xs sm:text-sm font-medium">
                {`${campaign.valuePerUser?.toUpperCase()}, $${
                  campaign.valuePerUserAmount
                } per ${campaign.goals}`}{" "}
              </p>
            </div>
            <div className="flex justify-between gap-1 sm:gap-0">
              <p className="text-xs sm:text-sm text-gray-600">
                Total Liquidity
              </p>
              <p className="text-xs sm:text-sm font-medium">
                {`$${campaign.totalLiquidity}` || "N/A"}
              </p>
            </div>
            <div className="flex justify-between gap-1 sm:gap-0">
              <p className="text-xs sm:text-sm text-gray-600">
                Total Publisher
              </p>
              <p className="text-xs sm:text-sm font-medium">
                {`${campaign.publisherCount}` || "N/A"}
              </p>
            </div>
            <div className="flex justify-between gap-1 sm:gap-0">
              <p className="text-xs sm:text-sm text-gray-600">Social Links</p>
              <div className="text-xs sm:text-sm font-medium">
                {campaign.website && (
                  <a
                    href={campaign.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline"
                  >
                    Website
                  </a>
                )}
                {campaign.twitter && (
                  <a
                    href={campaign.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-purple-600 hover:underline"
                  >
                    Twitter
                  </a>
                )}
                {campaign.instagram && (
                  <a
                    href={campaign.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-purple-600 hover:underline"
                  >
                    Instagram
                  </a>
                )}
                {!campaign.website &&
                  !campaign.twitter &&
                  !campaign.instagram &&
                  "N/A"}
              </div>
            </div>
            <div className="flex justify-center sm:justify-end">
              <button
                className={`rounded-md flex gap-3 items-center px-4 py-1.5 text-[10px] md:text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isJoined
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-[#330065] text-white hover:bg-purple-800"
                }`}
                onClick={handleAccept}
                disabled={
                  campaign.status === "completed" ||
                  campaign.status === "inactive" ||
                  isJoined ||
                  isCreatedByMe
                }
              >
                {isJoined ? "Joined" : "Accept"}
              </button>
            </div>
            <div>
              {isJoined && (
                <button
                  className="bg-gray-600 text-white px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm hover:bg-gray-700 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <>
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Copy Form Link
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
            Media
          </h3>
          {campaign.media && campaign.media.length > 0 ? (
            <>
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={URL.createObjectURL(campaign.media[0])}
                  alt="Campaign media"
                  className="w-full h-48 sm:h-64 object-cover"
                />
              </div>
              <div className="flex mt-3 sm:mt-4 gap-2 overflow-x-auto pb-2">
                {campaign.media.map((file, index) => (
                  <div
                    key={index}
                    className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="bg-gray-100 rounded-lg h-48 sm:h-64 flex items-center justify-center text-gray-400 text-xs sm:text-sm">
              No media uploaded
            </div>
          )}
        </div>
      </div>
      <AcceptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        campaign={campaign}
        onJoinSuccess={handleJoinSuccess}
      />
    </div>
  );
};

export default MyCampaignDetails;
