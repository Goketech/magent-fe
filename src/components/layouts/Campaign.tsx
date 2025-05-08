// Campaign.tsx - Main component
import React, { useState, useMemo } from 'react';
import CampaignHead from './CampaignHead';
import CampaignFilter, { FilterState } from './CampaignFilter';
import CampaignLists from './CampaignLists';
import CampaignDetails from './CampaignDetails';
import MyCampaignLists from './MyCampaignLists';
import CreateCampaign from './CreateCampaign'
import MyCampaignDetails from './MyCampaignDetails';
import { Campaign as CampaignType, MyCampaign as MyCampaignType } from '../../lib/types';

const Campaign: React.FC = () => {
  const [rawFilters, setRawFilters] = useState<FilterState>({
    industry: '',
    status: '',
    goals: '',
    startDate: '',
    endDate: '',
    searchQuery: ''
  });

  const [activeView, setActiveView] = useState<'marketplace' | 'myCampaigns'>('marketplace');
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignType | MyCampaignType | null>(null);
  const [createCampaign, setCreateCampaign] = useState<boolean>(false);
  const [userCampaigns, setUserCampaigns] = useState<MyCampaignType[]>([]);

  const filters = useMemo(() => rawFilters, [rawFilters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setRawFilters(newFilters);
  };

  const handleViewDetails = (campaign: CampaignType | MyCampaignType) => {
    setSelectedCampaign(campaign);
  };

  const handleCreateCampaign = () => {
    setCreateCampaign(true);
  };

  const handleCreateBack = () => {
    setCreateCampaign(false);
  };

  const handleBack = () => {
    setSelectedCampaign(null);
  };

  const handleAccept = (id: number) => {
    console.log(`Accepting campaign ${id}`);
    // accept logic
  };
  // Add this function in Campaign.tsx
const handleAddCampaign = (campaignData: any) => {
  // Create a new campaign object with an ID and other needed properties
  const newCampaign: MyCampaignType = {
    id: userCampaigns.length + 1, // Simple ID generation
    ...campaignData,
    status: 'Active', // Default status
    createdAt: new Date().toISOString(),
    // Add any other required fields for CampaignType
  };
  
  // Add to campaigns array
  setUserCampaigns(prevCampaigns => [...prevCampaigns, newCampaign]);
  
  // Exit create campaign view
  setCreateCampaign(false);
};

  return (
    <div className="container mx-auto px-2 mt-[-2.5rem]">
      {selectedCampaign ? (
        'advertiser' in selectedCampaign ? (
    <CampaignDetails 
      campaign={selectedCampaign} 
      onBack={handleBack} 
      onAccept={handleAccept}
    />
  ) : (
    <MyCampaignDetails 
      campaign={selectedCampaign} 
      onBack={handleBack}
    />
  )
      ) : createCampaign ? (
        <CreateCampaign handleGoBack={handleCreateBack}
        onCampaignCreate={handleAddCampaign}  />
      ) : (
        <>
          <CampaignHead 
            handleCreateCampaign={handleCreateCampaign}
            activeView={activeView}
            setActiveView={setActiveView}
          />
          <CampaignFilter onFilterChange={handleFilterChange} />
          {activeView === 'marketplace' ? (
            <CampaignLists 
              activeFilters={filters} 
              onViewDetails={handleViewDetails}
            />
          ) : (
            <MyCampaignLists 
  activeFilters={filters}
  onViewDetails={handleViewDetails}
  campaigns={userCampaigns} // Pass the campaigns
/>
          )}
        </>
      )}
    </div>
  );
};

export default Campaign;