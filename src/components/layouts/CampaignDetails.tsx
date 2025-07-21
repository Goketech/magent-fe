import { MdArrowBackIos } from "react-icons/md";
import Image from "next/image";
import { Campaign, MyCampaign } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@/utils/apiClient";
import { useToast } from "@/hooks/use-toast";
import { FormAnalyticsPanel } from "./FormAnalyticsPanel";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export interface FormAnalytics {
  overview: {
    totalSubmissions: number;
    completedSubmissions: number;
    partialSubmissions: number;
    completionRate: number;
    lastSubmission: string | null;
  };
  submissionsOverTime: any[];
  fieldAnalytics: Record<string, any>;
  recentSubmissions: any[];
  form: {
    title: string;
    status: string;
    createdAt: string;
    isPublic: boolean;
  };
}

interface CampaignDetailsProps {
  campaign: MyCampaign;
  onBack: () => void;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({
  campaign,
  onBack,
}) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [formAnalytics, setFormAnalytics] = useState<FormAnalytics | null>(
    null
  );
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [navigating, setNavigating] = useState(false);

  const getStatusBadgeClass = (status: any) => {
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

  useEffect(() => {
    const fetchFormAnalytics = async () => {
      try {
        setIsLoading(true); // Add this
        const data = await apiClient(
          `/form/${campaign.feedbackFormId}/analytics`,
          {
            method: "GET",
          }
        );
        setFormAnalytics(data);
      } catch (error: unknown) {
        setFormAnalytics(null);
      } finally {
        setIsLoading(false); // Change this from setLoading(false)
      }
    };

    fetchFormAnalytics();
  }, [campaign._id]);

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-900"></div>
      </div>
    );
  }

  const handleViewAnalytics = () => {
    setShowAnalytics(!showAnalytics);
  };
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(campaign.feedbackFormUrl || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleCreateForm = () => {
    setNavigating(true);
    router.push(`/form/?campaignId=${campaign.id}`);
  };
  const handleEditForm = () => {
    setNavigating(true);
    const formId = campaign.feedbackFormId?.split("/").pop();

    if (!formId) return;

    router.push(`/form/${formId}?edit=true`);
  };

  return (
    <div className="w-full p-4 bg-white rounded-md shadow">
      <div className="flex items-center mb-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 text-sm"
        >
          <MdArrowBackIos size={16} className="mr-1" />
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
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-1">
              {campaign.campaignName}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 lg:gap-10 mt-2">
              <div>
                <p className="text-xs opacity-70 py-1 sm:py-2">Campaign Goal</p>
                <p className="text-xs sm:text-sm">{campaign.campaignGoals}</p>
              </div>
              <div>
                <p className="text-xs opacity-70 py-1 sm:py-2">Campaign KPIs</p>
                <p className="text-xs sm:text-sm">
                  {campaign.campaignKPIs === "" ? "N/A" : campaign.campaignKPIs}
                </p>
              </div>
              <div>
                <p className="text-xs opacity-70 py-1 sm:py-2">
                  Total Publishers
                </p>
                <p className="text-xs sm:text-sm">
                  {campaign.publishersCount || 12}
                </p>
              </div>
              <div>
                <p className="text-xs opacity-70 py-1 sm:py-2">Target Number</p>
                <p className="text-xs sm:text-sm">{campaign.targetNumber}</p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0">
            <span
              className={`${getStatusBadgeClass(
                campaign.status
              )} text-xs px-3 sm:px-6 py-1 sm:py-2 rounded-bl-md`}
            >
              {campaign.status}
            </span>
          </div>
        </div>
      </div>

      {/* Two-column layout - responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Left column - Campaign details */}
        <div>
          <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
            Campaign Overview
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {[
              { label: "Campaign Name", value: campaign.campaignName },
              { label: "Industry", value: campaign.industry },
              { label: "Campaign Goal", value: campaign.campaignGoals },
              {
                label: "Campaign KPIs",
                value:
                  campaign.campaignKPIs === "" ? "N/A" : campaign.campaignKPIs,
              },
              {
                label: "Target Number",
                value: campaign.targetNumber || "1000",
              },
              { label: "Target Audience", value: campaign.age },
              {
                label: "Campaign Duration",
                value:
                  campaign.createdAt && campaign.endDate
                    ? `${new Date(campaign.createdAt).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" }
                      )} - ${new Date(campaign.endDate).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric" }
                      )}`
                    : "N/A",
              },
              {
                label: "Value Per User",
                value: `CPC: $${
                  campaign.valuePerUser || "0.75"
                } per engagement`,
              },
              {
                label: "Total Liquidity",
                value: campaign.totalLiquidity || "$1,000 USDC",
              },
              { label: "Total Publishers", value: campaign.publishersCount },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start sm:items-center"
              >
                <p className="text-xs sm:text-sm text-gray-600 flex-1 pr-2">
                  {item.label}
                </p>
                <p className="text-xs sm:text-sm font-medium text-right flex-1">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 sm:mt-6">
            {formAnalytics ? (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
                <button
                  className="bg-[#330065] text-white px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm hover:bg-purple-700 transition-colors"
                  onClick={handleViewAnalytics}
                  disabled={isLoading}
                >
                  {showAnalytics ? "Hide Analytics" : "View Form Analytics"}
                </button>

                <button
                  className="bg-gray-600 text-white px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
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

                <button
                  className="bg-[#330065] text-white px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm hover:bg-blue-700 transition-colors"
                  onClick={handleEditForm}
                  disabled={isLoading || navigating}
                >
                  {isLoading || navigating ? "Redirecting.." : "Edit Form"}
                </button>
              </div>
            ) : (
              <button
                className="bg-[#330065] text-white px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm hover:bg-purple-900 transition-colors w-full sm:w-auto"
                onClick={handleCreateForm}
                disabled={isLoading || navigating}
              >
                {isLoading || navigating ? "Redirecting.." : "Create Form"}
              </button>
            )}
          </div>
        </div>

        {/* Right column - Media */}
        <div>
          <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
            Media
          </h3>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={campaign.mediaImage || "/details-image.png"}
              alt="Campaign media"
              width={355}
              height={207}
              className="w-full h-48 sm:h-52 lg:h-full object-cover"
            />
          </div>
          <div className="flex mt-3 sm:mt-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 rounded-md overflow-hidden"
              >
                <Image
                  src={campaign.mediaImage || "/details-image.png"}
                  alt="Campaign thumbnail"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      {formAnalytics && showAnalytics && (
        <FormAnalyticsPanel
          formAnalytics={formAnalytics}
          setShowAnalytics={setShowAnalytics}
        />
      )}
    </div>
  );
};

export default CampaignDetails;
