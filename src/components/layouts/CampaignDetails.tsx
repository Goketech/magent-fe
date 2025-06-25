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

  const [formAnalytics, setFormAnalytics] = useState<FormAnalytics | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFormAnalytics = async () => {
      console.log(campaign)
      try {
        setLoading(true);
        const data = await apiClient(`/form/345678/analytics`, {
          method: "GET",
        });
        setFormAnalytics(data);
      } catch (error: unknown) {
        console.log("Analytics not available yet");
        setFormAnalytics(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFormAnalytics();
  }, [campaign._id]);

  const handleViewAnalytics = () => {
    setShowAnalytics(!showAnalytics);
  };

  const handleCreateForm = () => {
    router.push(`/form/?campaignId=${campaign.id}`);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
              <button
                className="bg-[#330065] text-white px-6 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors"
                onClick={handleViewAnalytics}
                disabled={loading}
              >
                {showAnalytics ? 'Hide Analytics' : 'View Form Analytics'}
              </button>
            ) : (
              <button
                className="bg-[#330065] text-white px-6 py-2 rounded-md text-sm hover:bg-red-900 transition-colors"
                onClick={handleCreateForm}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Create Form'}
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
              className="text-purple-800 hover:text-purple-500 text-sm bg-"
            >
              Hide Analytics
            </button>
          </div>

          {/* Form Info */}
          <div className=" rounded-lg p-4 mb-6"
          style={{
          backgroundImage:
            "url('/details.png'), linear-gradient(#330065, #330065)",
          backgroundSize: "contain",
          backgroundRepeat: "repeat",
          backgroundBlendMode: "overlay",
        }}>
            <h4 className="font-medium mb-2 text-white">Form Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm text-white">
              <div className="">
                <span className="opacity-70">Form Title:</span>
                <span className="ml-2 font-medium">{formAnalytics.form.title}</span>
              </div>
              <div>
                <span className="opacity-70">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  formAnalytics.form.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {formAnalytics.form.status}
                </span>
              </div>
              <div>
                <span className="opacity-70">Created:</span>
                <span className="ml-2 font-medium">{formatDate(formAnalytics.form.createdAt)}</span>
              </div>
              <div>
                <span className="opacity-70">Public:</span>
                <span className="ml-2 font-medium">{formAnalytics.form.isPublic ? 'Yes' : 'No'}</span>
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

          {/* Last Submission */}
          <div className="bg-white border rounded-lg p-4">
            <h4 className="font-medium mb-2">Last Submission</h4>
            <p className="text-sm text-gray-600">
              {formAnalytics.overview.lastSubmission 
                ? formatDate(formAnalytics.overview.lastSubmission)
                : 'No submissions yet'}
            </p>
          </div>

          {/* Recent Submissions */}
          {formAnalytics.recentSubmissions.length > 0 && (
            <div className="mt-4 bg-white border rounded-lg p-4">
              <h4 className="font-medium mb-2">Recent Submissions</h4>
              <div className="space-y-2">
                {formAnalytics.recentSubmissions.map((submission, index) => (
                  <div key={index} className="text-sm border-b pb-2 last:border-b-0">
                    {/* Add submission details here based on your submission structure */}
                    <span className="text-gray-600">Submission {index + 1}</span>
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