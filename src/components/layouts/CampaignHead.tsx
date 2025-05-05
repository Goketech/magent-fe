interface CampaignHeadProps {
  handleCreateCampaign: () => void;
}


const CampaignHead: React.FC<CampaignHeadProps> = ({handleCreateCampaign}) => {
  return (
    <div className="w-full mb-8 flex items-center h-full">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Marketplace</h1>
        <p className="text-xs text-[#6A6B6A]">Browse live campaigns from top web3 brands.</p>
      </div>
      
      <div className="flex justify-between items-center gap-8 ml-auto">
        <div className="flex border-[#D7D7D7] border-2 overflow-hidden rounded-3xl text-xs md:text-sm">
          <button className="bg-purple-100 px-4 py-2 font-medium text-purple-900">
            Marketplace
          </button>
          <button className="px-4 py-2 font-medium text-[#6A6B6A] hover:bg-gray-100">
            My campaigns
          </button>
        </div>
        
        <button className="bg-[#330065] text-white px-4 py-2 rounded-3xl text-sm font-medium"
        onClick={handleCreateCampaign}>
          Create a campaign
        </button>
      </div>
    </div>
  );
};

export default CampaignHead;