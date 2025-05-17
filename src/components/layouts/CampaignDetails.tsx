import { MdArrowBackIos } from "react-icons/md";
import Image from "next/image";

interface Campaign {
  _id: number;
  name: string;
  campaignName: string;
  goals: string;
  kpis: string;
  industry: string;
  status: string;
  startDate?: number;
  endDate?: number;
  targetNumber?: string;
  ageRange?: string;
  cpc?: string;
  totalLiquidity?: string;
  totalPublishers?: number;
  mediaImage?: string;
  // Add any other optional fields you need
}

interface CampaignDetailsProps {
  campaign: Campaign;
  onBack: () => void;
  onAccept: (id: number) => void;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({ campaign, onBack, onAccept }) => {
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
          backgroundImage: "url('/details.png'), linear-gradient(#330065, #330065)",
          backgroundSize: "contain",
          backgroundRepeat: "repeat",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold mb-1">{campaign.name}</h2>
            <div className="grid grid-cols-3 gap-10 mt-2">
              <div>
                <p className="text-xs opacity-70 py-2">Campaign Goal</p>
                <p className="text-sm">{campaign.goals}</p>
              </div>
              <div>
                <p className="text-xs opacity-70 py-2">Campaign KPIs</p>
                <p className="text-sm">{campaign.kpis}</p>
              </div>
              <div>
                <p className="text-xs opacity-70 py-2">Total Publishers</p>
                <p className="text-sm">{campaign.totalPublishers || 12}</p>
              </div>
            </div>
          </div>
          <div className='absolute top-0 right-0'>
            <span className="bg-[#FCF4E7] text-[#DD900D] text-xs px-6 py-2 rounded-bl-md">
              {campaign.status || 'Pending'}
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
              { label: "Campaign Goal", value: campaign.goals },
              { label: "Campaign KPIs", value: campaign.kpis },
              { label: "Target Number", value: campaign.targetNumber || '1000' },
              { label: "Target Audience", value: campaign.ageRange || 'Age 18-34' },
              { label: "Campaign Duration", value: campaign.name }, // This seems incorrect - should probably be duration?
              { label: "Value Per User", value: `CPC: $${campaign.cpc || '0.75'} per engagement` },
              { label: "Total Liquidity", value: campaign.totalLiquidity || '$1,000 USDC' },
              { label: "Total Publishers", value: campaign.totalPublishers || '12' },
            ].map((item, index) => (
              <div key={index} className="flex justify-between">
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button 
              className="bg-purple-800 text-white px-6 py-2 rounded-md text-sm hover:bg-purple-900 transition-colors"
              onClick={() => onAccept(campaign._id)}
            >
              Accept
            </button>
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
              <div key={i} className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden">
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
    </div>
  );
};

export default CampaignDetails;