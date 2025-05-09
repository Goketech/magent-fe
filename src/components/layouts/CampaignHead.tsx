interface CampaignHeadProps {
  handleCreateCampaign: () => void;
  activeView: 'marketplace' | 'myCampaigns';
  setActiveView: (view: 'marketplace' | 'myCampaigns') => void;
}

const CampaignHead: React.FC<CampaignHeadProps> = ({
  handleCreateCampaign,
  activeView,
  setActiveView
}) => {
  return (
    <div className="w-full mb-8 flex items-center h-full">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {activeView === 'marketplace' ? 'Marketplace' : 'My campaigns'}
        </h1>
        <p className="text-xs text-[#6A6B6A]">
          {activeView === 'marketplace' 
            ? 'Browse live campaigns from top web3 brands.' 
            : 'Track real-time results, manage liquidity, and see who\'s crushing it on your campaigns.'}
        </p>
      </div>
      
      <div className="flex justify-between items-center gap-8 ml-auto">
        <div className="flex border-[#D7D7D7] border-2 overflow-hidden rounded-3xl text-xs md:text-sm">
          <button 
            className={`px-4 py-2 font-medium ${
              activeView === 'marketplace' 
                ? 'bg-purple-100 text-purple-900' 
                : 'text-[#6A6B6A] hover:bg-gray-100'
            }`}
            onClick={() => setActiveView('marketplace')}
          >
            Marketplace
          </button>
          <button 
            className={`px-4 py-2 font-medium ${
              activeView === 'myCampaigns' 
                ? 'bg-purple-100 text-purple-900' 
                : 'text-[#6A6B6A] hover:bg-gray-100'
            }`}
            onClick={() => setActiveView('myCampaigns')}
          >
            My campaigns
          </button>
        </div>
        
        <button 
          className="bg-[#330065] text-white px-4 py-2 rounded-3xl text-sm font-medium"
          onClick={handleCreateCampaign}
        >
          Create a campaign
        </button>
      </div>
    </div>
  );
};

export default CampaignHead;