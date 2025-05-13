import React from 'react';

interface EmptyStateProps {
  onCreateCampaign: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateCampaign }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    <div className="bg-purple-100 rounded-full p-6 mb-6">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6V12L16 14M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#330065" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <h3 className="text-xl font-medium mb-2">No campaigns yet, let's launch your first one!</h3>
    <p className="text-gray-500 mb-6 max-w-md">Set goals, fund your campaign, and get real results – all in one place</p>
    <button 
      onClick={onCreateCampaign}
      className="px-6 py-2 bg-[#330065] text-white rounded-full hover:bg-purple-700 flex items-center gap-2"
    >
      Let's go
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33334 8H12.6667M12.6667 8L8.00001 3.33333M12.6667 8L8.00001 12.6667" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  </div>
);

export default EmptyState;