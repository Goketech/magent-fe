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
  onAccept: (id: number) => void;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({
  campaign,
  onBack,
  onAccept,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [formAnalytics, setFormAnalytics] = useState<FormAnalytics | null>(
    null
  );
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFormAnalytics = async () => {
      try {
        setIsLoading(true); // Add this
        const data = await apiClient(`/form/${campaign.feedbackFormId}/analytics`, {
          method: "GET",
        });
        setFormAnalytics(data);
      } catch (error: unknown) {
        toast({
          variant: "destructive",
          description: "Analytics not available yet",
        });
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
    router.push(`/form/?campaignId=${campaign.id}`);
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
        className="rounded-lg p-4 mb-6 text-white relative overflow-hidden"
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
            <h2 className="text-xl font-semibold mb-1">
              {campaign.campaignName}
            </h2>
            <div className="grid grid-cols-4 gap-10 mt-2">
              <div>
                <p className="text-xs opacity-70 py-2">Campaign Goal</p>
                <p className="text-sm">{campaign.campaignGoals}</p>
              </div>
              <div>
                <p className="text-xs opacity-70 py-2">Campaign KPIs</p>
                <p className="text-sm">
                  {campaign.campaignKPIs === "" ? "N/A" : campaign.campaignKPIs}
                </p>
              </div>
              <div>
                <p className="text-xs opacity-70 py-2">Total Publishers</p>
                <p className="text-sm">{campaign.publishersCount || 12}</p>
              </div>
              <div>
                <p className="text-xs opacity-70 py-2">Target Number</p>
                <p className="text-sm">{campaign.targetNumber}</p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0">
            <span className="bg-[#FCF4E7] text-[#DD900D] text-xs px-6 py-2 rounded-bl-md">
              {campaign.status || "Pending"}
            </span>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left column - Campaign details */}
        <div>
          <h3 className="text-lg font-medium mb-4">Campaign Overview</h3>
          <div className="space-y-4">
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
              <div key={index} className="flex justify-between">
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              className="bg-[#330065] text-white px-6 py-2 rounded-md text-sm hover:bg-purple-500 transition-colors"
              onClick={() => onAccept(campaign._id)}
            >
              Accept
            </button>
          </div>

          <div className="mt-6">
            {formAnalytics ? (
              <div className="flex items-center gap-4">
                <button
                  className="bg-[#330065] text-white px-6 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors"
                  onClick={handleViewAnalytics}
                  disabled={isLoading}
                >
                  {showAnalytics ? "Hide Analytics" : "View Form Analytics"}
                </button>

                <button
                  className="bg-gray-600 text-white px-6 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors flex items-center gap-2"
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <>
                      <svg
                        className="w-4 h-4"
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
                        className="w-4 h-4"
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
              </div>
            ) : (
              <button
                className="bg-[#330065] text-white px-6 py-2 rounded-md text-sm hover:bg-red-900 transition-colors"
                onClick={handleCreateForm}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Create Form"}
              </button>
            )}
          </div>
        </div>

        {/* Right column - Media */}
        <div>
          <h3 className="text-lg font-medium mb-4">Media</h3>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={campaign.mediaImage || "/details-image.png"}
              alt="Campaign media"
              width={355}
              height={207}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex mt-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden"
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
        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Form Analytics</h3>
            <button
              onClick={() => setShowAnalytics(false)}
              className="text-purple-800 hover:text-purple-500 text-sm"
            >
              Hide Analytics
            </button>
          </div>

          {/* Form Info */}
          <div
            className="rounded-lg p-4 mb-6"
            style={{
              backgroundImage:
                "url('/details.png'), linear-gradient(#330065, #330065)",
              backgroundSize: "contain",
              backgroundRepeat: "repeat",
              backgroundBlendMode: "overlay",
            }}
          >
            <h4 className="font-medium mb-2 text-white">Form Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm text-white">
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
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {formAnalytics.overview.totalSubmissions}
              </div>
              <div className="text-sm text-gray-600">Total Submissions</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {formAnalytics.overview.completedSubmissions}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {formAnalytics.overview.partialSubmissions}
              </div>
              <div className="text-sm text-gray-600">Partial</div>
            </div>
            <div className="bg-white border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formAnalytics.overview.completionRate}%
              </div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </div>
          </div>

          {/* Field Analytics */}
          {formAnalytics.fieldAnalytics && Object.keys(formAnalytics.fieldAnalytics).length > 0 && (
            <div className="bg-white border rounded-lg p-4 mb-6">
              <h4 className="font-medium mb-4">Field Responses</h4>
              <div className="space-y-4">
                {Object.entries(formAnalytics.fieldAnalytics).map(([fieldId, fieldData]) => (
                  <div key={fieldId} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-medium text-gray-800 capitalize">
                        {fieldData.label}
                      </h5>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {fieldData.type}
                      </span>
                    </div>
                    
                    {/* Response breakdown */}
                    <div className="space-y-2">
                      {fieldData.responses && fieldData.responses.length > 0 ? (
                        fieldData.responses.map((response:any, index : any) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">
                              {response._id === 'option1' ? 'Option 1' :
                               response._id === 'option2' ? 'Option 2' :
                               response._id === 'option3' ? 'Option 3' :
                               response._id === 'option4' ? 'Option 4' :
                               response._id}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-purple-600 h-2 rounded-full"
                                  style={{
                                    width: `${(response.count / formAnalytics.overview.totalSubmissions) * 100}%`
                                  }}
                                ></div>
                              </div>
                              <span className="font-medium text-purple-600 min-w-[2rem]">
                                {response.count}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500 italic">No responses yet</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Last Submission */}
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-medium mb-2">Last Submission</h4>
            <p className="text-sm text-gray-600">
              {formAnalytics.overview.lastSubmission
                ? formatDate(formAnalytics.overview.lastSubmission)
                : "No submissions yet"}
            </p>
          </div>

          {/* Recent Submissions */}
          {formAnalytics.recentSubmissions.length > 0 && (
            <div className="mt-4 bg-white border rounded-lg p-4">
              <h4 className="font-medium mb-2">Recent Submissions</h4>
              <div className="space-y-2">
                {formAnalytics.recentSubmissions.map((submission, index) => (
                  <div
                    key={index}
                    className="text-sm border-b pb-2 last:border-b-0"
                  >
                    <span className="text-gray-600">
                      Submission {index + 1} - {formatDate(submission.submittedAt || submission.createdAt)}
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
