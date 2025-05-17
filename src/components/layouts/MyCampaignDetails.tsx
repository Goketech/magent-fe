import { MdArrowBackIos } from "react-icons/md";
import { MyCampaign } from "@/lib/types"; // Updated import
import { capitalizeEachWord } from "@/utils/capitalize";

interface MyCampaignDetailsProps {
  campaign: MyCampaign;
  onBack: () => void;
}

const MyCampaignDetails: React.FC<MyCampaignDetailsProps> = ({ campaign, onBack }) => {
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
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold mb-1">
              {capitalizeEachWord(campaign.name || '')}
            </h2>
            <div className="grid grid-cols-3 gap-10 mt-2">
              <div>
                <p className="text-xs opacity-70 py-2">Campaign Goal</p>
                <p className="text-sm">{capitalizeEachWord(campaign?.goals || '')}</p>
              </div>
              <div>
                <p className="text-xs opacity-70 py-2">Campaign KPIs</p>
                <p className="text-sm">{capitalizeEachWord('kpis' in campaign ? (campaign.kpis === "" ? "N/A" : campaign.kpis) : "N/A")}</p>
              </div>
              <div>
                <p className="text-xs opacity-70 py-2">Target Number</p>
                <p className="text-sm">{campaign?.targetNumber || 'N/A'}</p>
              </div>
            </div>
          </div>
          <div className='absolute top-0 right-0'>
            <span className="bg-[#EBE6F0] text-[#330065] text-xs px-6 py-2 rounded-bl-md">
              {capitalizeEachWord(campaign?.status || '')}
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
              <p className="text-sm font-medium">{capitalizeEachWord(campaign?.name || '')}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Industry</p>
              <p className="text-sm font-medium">{capitalizeEachWord(campaign?.industry || '')}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Campaign Goal</p>
              <p className="text-sm font-medium">{capitalizeEachWord(campaign?.goals || '')}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Target Audience</p>
              <p className="text-sm font-medium">
                {campaign.age && campaign.gender 
                  ? `${campaign.age}, ${campaign.gender}`
                  : 'N/A'}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Campaign Duration</p>
              <p className="text-sm font-medium">
                {campaign.startDate && campaign.endDate 
                  ? `${new Date(campaign.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(campaign.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                  : 'N/A'}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Value Per User</p>
              <p className="text-sm font-medium">{campaign.valuePerUser || 'N/A'}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Total Liquidity</p>
              <p className="text-sm font-medium">{campaign.totalLiquidity || 'N/A'}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Social Links</p>
              <div className="text-sm font-medium">
                {campaign.website && <a href={campaign.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Website</a>}
                {campaign.twitter && <a href={campaign.twitter} target="_blank" rel="noopener noreferrer" className="ml-2 text-purple-600 hover:underline">Twitter</a>}
                {campaign.instagram && <a href={campaign.instagram} target="_blank" rel="noopener noreferrer" className="ml-2 text-purple-600 hover:underline">Instagram</a>}
                {!campaign.website && !campaign.twitter && !campaign.instagram && 'N/A'}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Media</h3>
          {campaign.media && campaign.media.length > 0 ? (
            <>
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={URL.createObjectURL(campaign.media[0])} 
                  alt="Campaign media" 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="flex mt-4 gap-2">
                {campaign.media.map((file, index) => (
                  <div key={index} className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden">
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
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center text-gray-400">
              No media uploaded
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCampaignDetails;