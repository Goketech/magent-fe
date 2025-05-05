import React, { useState, useEffect, useMemo } from 'react';
import CampaignList, { Campaign } from './CampaignList';
import { FilterState } from './CampaignFilter';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TableHeader {
  id: string;
  label: string;
  sortable?: boolean;
}

interface CampaignListsProps {
  initialCampaigns?: Campaign[];
  itemsPerPage?: number;
  activeFilters?: FilterState;
  onViewDetails: (campaign: Campaign) => void;
}
const EMPTY_ARRAY: Campaign[] = [];
const CampaignLists: React.FC<CampaignListsProps> = ({ 
  initialCampaigns = EMPTY_ARRAY, 
  itemsPerPage = 10,
  onViewDetails,
  activeFilters = {
    industry: '',
    status: '',
    goals: '',
    startDate: '',
    endDate: '',
    searchQuery: ''
  }
}) => {
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  
  // Filter campaigns based on activeFilters
  const filteredCampaigns = useMemo(() => {
    let result = [...allCampaigns];
    
    
    if (activeFilters) { // Apply filters only if they are not empty
      // Filter by industry
      if (activeFilters.industry) {
        result = result.filter(campaign => 
          campaign.industry.toLowerCase() === activeFilters.industry.toLowerCase()
        );
      }
      
      
      if (activeFilters.status) {// Filter by status
        result = result.filter(campaign => 
          campaign.status.toLowerCase() === activeFilters.status.toLowerCase()
        );
      }
      
      // Filter by goals
      if (activeFilters.goals) {
        result = result.filter(campaign => 
          campaign.goals.toLowerCase() === activeFilters.goals.toLowerCase()
        );
      }
      
      // Filter by date range
      if (activeFilters.startDate && activeFilters.endDate) {
        // For demonstration, we'll just check if the campaign duration mentions the months
        // In a real app, you'd want to parse actual dates and compare them
        result = result.filter(campaign => {
          const [startMonth, endMonth] = campaign.duration.split('-').map(d => d.trim().split(' ')[0]);
          const filterStartMonth = new Date(activeFilters.startDate).toLocaleString('default', { month: 'short' });
          const filterEndMonth = new Date(activeFilters.endDate).toLocaleString('default', { month: 'short' });
          
          return startMonth.includes(filterStartMonth) || endMonth.includes(filterEndMonth);
        });
      }
      
      // Filter by search query
      if (activeFilters.searchQuery) {
        const query = activeFilters.searchQuery.toLowerCase();
        result = result.filter(campaign => 
          campaign.advertiser.toLowerCase().includes(query) ||
          campaign.campaignName.toLowerCase().includes(query) ||
          campaign.industry.toLowerCase().includes(query) ||
          campaign.goals.toLowerCase().includes(query)
        );
      }
    }
    
    return result;
  }, [allCampaigns, activeFilters]);

  const headers: TableHeader[] = [
    { id: "advertisers", label: "ADVERTISERS", sortable: true },
    { id: "campaign-name", label: "CAMPAIGN NAME", sortable: true },
    { id: "campaign-goals", label: "CAMPAIGN GOALS", sortable: true },
    { id: "campaign-kpis", label: "CAMPAIGN KPIs", sortable: true },
    { id: "duration", label: "DURATION", sortable: true },
    { id: "industry", label: "INDUSTRY", sortable: true },
    { id: "status", label: "STATUS", sortable: true },
    { id: "actions", label: "" }
  ];

  const sampleData: Campaign[] = [
    {
      id: 1,
      advertiser: "Modupe Akanni",
      campaignName: "NFT Push '25",
      goals: "Engagement",
      kpis: "Likes",
      duration: "Apr 15 - Apr 25",
      industry: "DAOs",
      status: "Active"
    },
    {
      id: 2,
      advertiser: "Modupe Akanni",
      campaignName: "NFT Push '25",
      goals: "Engagement",
      kpis: "Likes",
      duration: "Apr 15 - Apr 25",
      industry: "DAOs",
      status: "Active"
    },
    {
      id: 3,
      advertiser: "Modupe Akanni",
      campaignName: "NFT Push '25",
      goals: "Engagement",
      kpis: "Likes",
      duration: "Apr 15 - Apr 25",
      industry: "DAOs",
      status: "Completed"
    },
    {
      id: 4,
      advertiser: "Modupe Akanni",
      campaignName: "NFT Push '25",
      goals: "Engagement",
      kpis: "Likes",
      duration: "Apr 15 - Apr 25",
      industry: "DAOs",
      status: "Active"
    },
    {
      id: 5,
      advertiser: "Modupe Akanni",
      campaignName: "NFT Push '25",
      goals: "Engagement",
      kpis: "Likes",
      duration: "Apr 15 - Apr 25",
      industry: "DAOs",
      status: "Completed"
    },
    {
      id: 6,
      advertiser: "Modupe Akanni",
      campaignName: "NFT Push '25",
      goals: "Engagement",
      kpis: "Likes",
      duration: "Apr 15 - Apr 25",
      industry: "DAOs",
      status: "Active"
    },
    {
      id: 7,
      advertiser: "Modupe Akanni",
      campaignName: "NFT Push '25",
      goals: "Engagement",
      kpis: "Likes",
      duration: "Apr 15 - Apr 25",
      industry: "DAOs",
      status: "Completed"
    },
    {
      id: 8,
      advertiser: "Modupe Akanni",
      campaignName: "NFT Push '25",
      goals: "Engagement",
      kpis: "Likes",
      duration: "Apr 15 - Apr 25",
      industry: "DAOs",
      status: "Completed"
    },
    {
      id: 9,
      advertiser: "Modupe Akanni",
      campaignName: "NFT Push '25",
      goals: "Engagement",
      kpis: "Likes",
      duration: "Apr 15 - Apr 25",
      industry: "DAOs",
      status: "Active"
    },
    {
      id: 10,
      advertiser: "Modupe Akanni",
      campaignName: "NFT Push '25",
      goals: "Engagement",
      kpis: "Likes",
      duration: "Apr 15 - Apr 25",
      industry: "DAOs",
      status: "Completed"
    }
  ];

  // Initialize with sample data or use provided initialCampaigns
  useEffect(() => {
    const data = initialCampaigns.length > 0 ? initialCampaigns : sampleData;
    setAllCampaigns(data);
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [initialCampaigns, itemsPerPage]);
  
  // Update totalPages when filtered results change
  useEffect(() => {
    setTotalPages(Math.ceil(filteredCampaigns.length / itemsPerPage));
    setCurrentPage(1);
  }, [filteredCampaigns, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In a real app, this would fetch data for the specific page
    setLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const handleAcceptCampaign = (id: number) => {
    console.log(`Accepted campaign ${id}`);
    //API request in the nearest future
    
    setAllCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === id 
          ? { ...campaign, status: 'Completed' as 'Completed' } 
          : campaign
      )
    );
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
    
    // Sort the campaigns based on the selected column
    const sortedCampaigns = [...allCampaigns].sort((a, b) => {
      // Map header id to campaign property
      const propMap: Record<string, keyof Campaign> = {
        'advertisers': 'advertiser',
        'campaign-name': 'campaignName',
        'campaign-goals': 'goals',
        'campaign-kpis': 'kpis',
        'duration': 'duration',
        'industry': 'industry',
        'status': 'status'
      };
      
      const prop = propMap[key] as keyof Campaign;
      
      if (!prop) return 0;
      
      if (a[prop] < b[prop]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[prop] > b[prop]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setAllCampaigns(sortedCampaigns);
  };

  const getSortIcon = (headerId: string) => {
    if (!sortConfig || sortConfig.key !== headerId) {
      return null;
    }
    
    return (
      <span className="ml-1">
        {sortConfig.direction === 'asc' ? '▲' : '▼'}
      </span>
    );
  };
  
  const renderPagination = () => {
    const pages = [];
    
    pages.push(
      <button 
        key="prev" 
        className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 disabled:opacity-50"
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
      >
        <ChevronLeft size={16} className="text-gray-600" />
      </button>
    );
    
    // Current page button
    pages.push(
      <button 
        key={1} 
        className={`w-8 h-8 flex items-center justify-center rounded-md ${currentPage === 1 ? 'bg-purple-900 text-white' : 'border border-gray-300 text-gray-600'}`}
        onClick={() => handlePageChange(1)}
        disabled={loading}
      >
        1
      </button>
    );
    
    // Add more pages
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis before middle pages if needed
    if (startPage > 2) {
      pages.push(
        <span key="ellipsis-start" className="flex items-center justify-center px-2">
          ...
        </span>
      );
    }
    
    // Middle pages
    for (let i = startPage; i <= endPage; i++) {
      if (i <= totalPages && i >= 2) {
        pages.push(
          <button 
            key={i} 
            className={`w-8 h-8 flex items-center justify-center rounded-md ${currentPage === i ? 'bg-purple-900 text-white' : 'border border-gray-300 text-gray-600'}`}
            onClick={() => handlePageChange(i)}
            disabled={loading}
          >
            {i}
          </button>
        );
      }
    }
    
    // Add ellipsis after middle pages if needed
    if (endPage < totalPages - 1) {
      pages.push(
        <span key="ellipsis-end" className="flex items-center justify-center px-2">
          ...
        </span>
      );
    }
    
    // Add last page if it's not already included
    if (totalPages > 1 && endPage < totalPages) {
      pages.push(
        <button 
          key={totalPages} 
          className={`w-8 h-8 flex items-center justify-center rounded-md ${currentPage === totalPages ? 'bg-purple-900 text-white' : 'border border-gray-300 text-gray-600'}`}
          onClick={() => handlePageChange(totalPages)}
          disabled={loading}
        >
          {totalPages}
        </button>
      );
    }
    
    pages.push(
      <button 
        key="next" 
        className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 disabled:opacity-50"
        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
      >
        <ChevronRight size={16} className="text-gray-600" />
      </button>
    );
    
    return pages;
  };

  // Calculate which campaigns to display based on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCampaigns = filteredCampaigns.slice(startIndex, endIndex);
  
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-20 flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-900"></div>
          </div>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                {headers.map((header) => (
                  <th 
                    key={header.id} 
                    className={`py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header.sortable ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                    onClick={() => header.sortable && handleSort(header.id)}
                  >
                    <div className="flex items-center">
                      {header.label}
                      {header.sortable && getSortIcon(header.id)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedCampaigns.map((campaign) => (
                <CampaignList 
                  key={campaign.id} 
                  campaign={campaign} 
                  onAccept={handleAcceptCampaign}
                  onViewDetails={onViewDetails}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <div className="flex justify-center mt-6 space-x-2">
        {renderPagination()}
      </div>
    </div>
  );
};

export default CampaignLists;