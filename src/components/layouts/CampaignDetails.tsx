import { MdArrowBackIos } from "react-icons/md";
import { Campaign } from '../../lib/types';
import Image from "next/image";

interface CampaignDetailsProps {
  campaign: Campaign;
  onBack: () => void;
  onAccept: (id: number) => void;
}

const CampaignDetails: React.FC<CampaignDetailsProps> = ({ campaign, onBack, onAccept }) => {
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
  className="rounded-lg p-4 mb-6 text-white relative overflow-hidden"
  style={{
    backgroundImage: "url('/details.png'), linear-gradient(#330065, #330065)",
    backgroundSize: "contain",
    backgroundRepeat: "repeat",
    backgroundBlendMode: "overlay",
  }}
>
        <div className="flex justify-between items-center  ">
          <div>
            <h2 className="text-xl font-semibold mb-1">{campaign.advertiser}</h2>
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
              Pending
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Campaign Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Campaign Name</p>
              <p className="text-sm font-medium">{campaign.campaignName}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Industry</p>
              <p className="text-sm font-medium">{campaign.industry}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Campaign Goal</p>
              <p className="text-sm font-medium">{campaign.goals}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Campaign KPIs</p>
              <p className="text-sm font-medium">{campaign.kpis}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Target Number</p>
              <p className="text-sm font-medium">{campaign.targetNumber || '1000'}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Target Audience</p>
              <p className="text-sm font-medium">{campaign.ageRange || 'Age 18-34'}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Campaign Duration</p>
              <p className="text-sm font-medium">{campaign.duration}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Value Per User</p>
              <p className="text-sm font-medium">CPC: ${campaign.cpc || '0.75'} per engagement</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Total Liquidity</p>
              <p className="text-sm font-medium">{campaign.totalLiquidity || '$1,000 USDC'}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Total Publishers</p>
              <p className="text-sm font-medium">{campaign.totalPublishers || '12'}</p>
            </div>
          </div>

          <div className="mt-6">
            <button 
              className="bg-purple-800 text-white px-6 py-2 rounded-md text-sm hover:bg-purple-900 transition-colors"
              onClick={() => onAccept(campaign.id)}
            >
              Accept
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Media</h3>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
          <Image 
                src={campaign.mediaImage || "/details-image.png"} 
                alt="Campaign thumbnail"
                width={355}  // Must specify numeric value (in pixels)
                height={207}  // Must specify numeric value (in pixels)
                className="w-full h-full object-cover"
                style={{
                  objectFit: 'cover' // Alternative to className approach
                }}
              />
          </div>
          <div className="flex mt-4 gap-2">
            <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden">
            <Image 
                src={campaign.mediaImage || "/details-image.png"} 
                alt="Campaign thumbnail"
                width={77}  // Must specify numeric value (in pixels)
                height={55}  // Must specify numeric value (in pixels)
                className="w-full h-full object-cover"
                style={{
                  objectFit: 'cover' // Alternative to className approach
                }}
              /> 
            </div>
            <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden">
            <Image 
                src={campaign.mediaImage || "/details-image.png"} 
                alt="Campaign thumbnail"
                width={77}  // Must specify numeric value (in pixels)
                height={55}  // Must specify numeric value (in pixels)
                className="w-full h-full object-cover"
                style={{
                  objectFit: 'cover' // Alternative to className approach
                }}
              /> 
            </div>
            <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden">
            <Image 
                src={campaign.mediaImage || "/details-image.png"} 
                alt="Campaign thumbnail"
                width={77}  // Must specify numeric value (in pixels)
                height={55}  // Must specify numeric value (in pixels)
                className="w-full h-full object-cover"
                style={{
                  objectFit: 'cover' // Alternative to className approach
                }}
              /> 
            </div>
            <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden">
            <Image 
                src={campaign.mediaImage || "/details-image.png"} 
                alt="Campaign thumbnail"
                width={77}  // Must specify numeric value (in pixels)
                height={55}  // Must specify numeric value (in pixels)
                className="w-full h-full object-cover"
                style={{
                  objectFit: 'cover' // Alternative to className approach
                }}
              /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;