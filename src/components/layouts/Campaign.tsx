// Campaign.tsx - Main component
import React, { useState, useMemo } from 'react';
import CampaignHead from './CampaignHead';
import CampaignFilter, { FilterState } from './CampaignFilter';
import CampaignLists from './CampaignLists';
import CampaignDetails from './CampaignDetails';
import CreateCampaign from './CreateCampaign'
import { Campaign as CampaignType } from '../../lib/types';

const Campaign: React.FC = () => {
  const [rawFilters, setRawFilters] = useState<FilterState>({
    industry: '',
    status: '',
    goals: '',
    startDate: '',
    endDate: '',
    searchQuery: ''
  });

  const filters = useMemo(() => rawFilters, [rawFilters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setRawFilters(newFilters);
  };

  
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignType | null>(null);
  const [createCampaign, setCreateCampaign] = useState<boolean>(false)
  // Function to handle viewing campaign details
  const handleViewDetails = (campaign: CampaignType) => {
    setSelectedCampaign(campaign);
  };
  const handleCreateCampaign = () => {
    // console.log("Create campaign Clicked")
    setCreateCampaign(true)
  }
  const handleCreateBack = () => {
    setCreateCampaign(false)
  }

  // Function to handle going back to the list view
  const handleBack = () => {
    setSelectedCampaign(null);
  };

  // Function to handle accepting a campaign
  const handleAccept = (id: number) => {
    console.log(`Accepting campaign ${id}`);
    // accept logic for the nearest future
  };

  return (
    <div className="container mx-auto px-2 mt-[-2.5rem]">
      {selectedCampaign ? (
        <CampaignDetails 
          campaign={selectedCampaign} 
          onBack={handleBack} 
          onAccept={handleAccept}
        />
      ) : createCampaign ? (
        <CreateCampaign handleGoBack={handleCreateBack} />
      ) : (
        <>
          <CampaignHead handleCreateCampaign={handleCreateCampaign}/>
          <CampaignFilter onFilterChange={handleFilterChange} />
          <CampaignLists 
            activeFilters={filters} 
            onViewDetails={handleViewDetails}
          />
        </>
      )}
    </div>
  );
};

export default Campaign;