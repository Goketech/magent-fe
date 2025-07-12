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
    <div className="w-full mb-8">
      {/* Header Section */}
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          {activeView === 'marketplace' ? 'Marketplace' : 'My campaigns'}
        </h1>
        <p className="text-xs text-[#6A6B6A] leading-relaxed">
          {activeView === 'marketplace' 
            ? 'Browse live campaigns from top web3 brands.' 
            : 'Track real-time results, manage liquidity, and see who\'s crushing it on your campaigns.'}
        </p>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-8">
        {/* Tab Buttons */}
        <div className="flex border-[#D7D7D7] border-2 overflow-hidden rounded-3xl text-xs sm:text-sm">
          <button 
            className={`px-4 py-2 font-medium transition-colors flex-1 sm:flex-none ${
              activeView === 'marketplace' 
                ? 'bg-purple-100 text-purple-900' 
                : 'text-[#6A6B6A] hover:bg-gray-100'
            }`}
            onClick={() => setActiveView('marketplace')}
          >
            Marketplace
          </button>
          <button 
            className={`px-4 py-2 font-medium transition-colors flex-1 sm:flex-none ${
              activeView === 'myCampaigns' 
                ? 'bg-purple-100 text-purple-900' 
                : 'text-[#6A6B6A] hover:bg-gray-100'
            }`}
            onClick={() => setActiveView('myCampaigns')}
          >
            My campaigns
          </button>
        </div>
        
        {/* Create Campaign Button */}
        <button 
          className="bg-[#330065] text-white px-4 py-2 rounded-3xl text-sm font-medium transition-colors hover:bg-[#4a0092] w-full sm:w-auto"
          onClick={handleCreateCampaign}
        >
          Create a campaign
        </button>
      </div>
    </div>
  );
};

export default CampaignHead;