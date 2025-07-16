import { MdArrowBackIos } from "react-icons/md";
import Image from "next/image";
import { Campaign, MyCampaign } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@/utils/apiClient";
import { useToast } from "@/hooks/use-toast";

interface FormAnalytics {
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
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [expandedFields, setExpandedFields] = useState<{
    [key: string]: boolean;
  }>({});
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
  console.log("Form Analytics:", formAnalytics);

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
    console.log("Navigating to formId:", formId);

    if (!formId) return;

    router.push(`/form/${formId}?edit=true`);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full p-4 bg-white rounded-md shadow">
      {/* Header with back button */}
      <div className="flex items-center mb-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 text-sm"
        >
          <MdArrowBackIos size={16} className="mr-1" />
          Back
        </button>
      </div>

      {/* Campaign header section */}
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
        <div className="mt-4 sm:mt-8 border-t pt-4 sm:pt-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-medium">Form Analytics</h3>
            <button
              onClick={() => setShowAnalytics(false)}
              className="text-purple-800 hover:text-purple-500 text-xs sm:text-sm"
            >
              Hide Analytics
            </button>
          </div>

          {/* Form Info */}
          <div
            className="rounded-lg p-3 sm:p-4 mb-4 sm:mb-6"
            style={{
              backgroundImage:
                "url('/details.png'), linear-gradient(#330065, #330065)",
              backgroundSize: "contain",
              backgroundRepeat: "repeat",
              backgroundBlendMode: "overlay",
            }}
          >
            <h4 className="font-medium mb-2 text-white text-sm sm:text-base">
              Form Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-white">
              <div className="">
                <span className="opacity-70">Form Title:</span>
                <span className="ml-2 font-medium">
                  {formAnalytics.form.title}
                </span>
              </div>
              <div>
                <span className="opacity-70">Status:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded text-xs ${
                    formAnalytics.form.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {formAnalytics.form.status}
                </span>
              </div>
              <div>
                <span className="opacity-70">Created:</span>
                <span className="ml-2 font-medium">
                  {formatDate(formAnalytics.form.createdAt)}
                </span>
              </div>
              <div>
                <span className="opacity-70">Public:</span>
                <span className="ml-2 font-medium">
                  {formAnalytics.form.isPublic ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-white border rounded-lg p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">
                {formAnalytics.overview.totalSubmissions}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Total Submissions
              </div>
            </div>
            <div className="bg-white border rounded-lg p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-green-600">
                {formAnalytics.overview.completedSubmissions}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-white border rounded-lg p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-orange-600">
                {formAnalytics.overview.partialSubmissions}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Partial</div>
            </div>
            <div className="bg-white border rounded-lg p-3 sm:p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-purple-600">
                {formAnalytics.overview.completionRate}%
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Completion Rate
              </div>
            </div>
          </div>

          {/* Field Analytics */}
          {formAnalytics.fieldAnalytics &&
            Object.keys(formAnalytics.fieldAnalytics).length > 0 && (
              <div className="bg-white border rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                <h4 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                  Field Responses
                </h4>
                <div className="space-y-3 sm:space-y-4">
                  {Object.entries(formAnalytics.fieldAnalytics).map(
                    ([fieldId, fieldData]) => (
                      <div
                        key={fieldId}
                        className="border-b pb-3 sm:pb-4 last:border-b-0"
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1 sm:gap-0">
                          <h5 className="font-medium text-gray-800 capitalize text-sm sm:text-base">
                            {fieldData.label}
                          </h5>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded self-start sm:self-auto">
                            {fieldData.type}
                          </span>
                        </div>

                        {/* Response breakdown */}
                        <div className="space-y-2">
                          {fieldData.responses &&
                          fieldData.responses.length > 0 ? (
                            <>
                              {(fieldData.type === "text"
                                ? expandedFields[fieldId]
                                  ? fieldData.responses
                                  : fieldData.responses.slice(-5)
                                : fieldData.responses
                              ).map((response: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center text-xs sm:text-sm"
                                >
                                  <span className="text-gray-600 flex-1 pr-2 truncate">
                                    {fieldData.type === "text"
                                      ? response._id || "No content"
                                      : response._id === "option1"
                                      ? "Option 1"
                                      : response._id === "option2"
                                      ? "Option 2"
                                      : response._id === "option3"
                                      ? "Option 3"
                                      : response._id === "option4"
                                      ? "Option 4"
                                      : response._id}
                                  </span>

                                  {/* Only show bar and count for non-text responses */}
                                  {fieldData.type !== "text" && (
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                      <div className="w-12 sm:w-20 bg-gray-200 rounded-full h-2">
                                        <div
                                          className="bg-purple-600 h-2 rounded-full"
                                          style={{
                                            width: `${
                                              (response.count /
                                                formAnalytics.overview
                                                  .totalSubmissions) *
                                              100
                                            }%`,
                                          }}
                                        ></div>
                                      </div>
                                      <span className="font-medium text-purple-600 min-w-[1.5rem] sm:min-w-[2rem] text-xs sm:text-sm">
                                        {response.count}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ))}

                              {/* Show "See more" for text inputs if more than 5 responses */}
                              {fieldData.type === "text" &&
                                fieldData.responses.length > 5 && (
                                  <button
                                    onClick={() =>
                                      setExpandedFields((prev) => ({
                                        ...prev,
                                        [fieldId]: !prev[fieldId],
                                      }))
                                    }
                                    className="text-purple-600 text-xs mt-2"
                                  >
                                    {expandedFields[fieldId]
                                      ? "See less"
                                      : "See more"}
                                  </button>
                                )}
                            </>
                          ) : (
                            <div className="text-xs sm:text-sm text-gray-500 italic">
                              No responses yet
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* div */}

          {/* Last Submission */}
          <div className="bg-white border rounded-lg p-3 sm:p-4">
            <h4 className="font-medium mb-2 text-sm sm:text-base">
              Last Submission
            </h4>
            <p className="text-xs sm:text-sm text-gray-600">
              {formAnalytics.overview.lastSubmission
                ? formatDate(formAnalytics.overview.lastSubmission)
                : "No submissions yet"}
            </p>
          </div>

          {/* Recent Submissions */}
          {formAnalytics.recentSubmissions.length > 0 && (
            <div className="mt-4 bg-white border rounded-lg p-3 sm:p-4">
              <h4 className="font-medium mb-2 text-sm sm:text-base">
                Recent Submissions
              </h4>
              <div className="space-y-2">
                {formAnalytics.recentSubmissions.map((submission, index) => (
                  <div
                    key={index}
                    className="text-xs sm:text-sm border-b pb-2 last:border-b-0"
                  >
                    <span className="text-gray-600">
                      Submission {index + 1} -{" "}
                      {formatDate(
                        submission.submittedAt || submission.createdAt
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CampaignDetails;
