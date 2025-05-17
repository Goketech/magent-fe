import React, { useState, useEffect, useMemo } from 'react';
import MyCampaignList from './MyCampaignList';
import { FilterState } from './CampaignFilter';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MyCampaign as MyCampaignType } from '@/lib/types';

interface TableHeader {
  id: string;
  label: string;
  sortable?: boolean;
}

interface CampaignListsProps {
  initialCampaigns?: MyCampaignType[];
  itemsPerPage?: number;
  activeFilters?: FilterState;
  onViewDetails: (campaign: MyCampaignType) => void;
  campaigns: MyCampaignType[]
}

// const EMPTY_ARRAY: MyCampaignType[] = [];

const MyCampaignLists: React.FC<CampaignListsProps> = ({
//   initialCampaigns = EMPTY_ARRAY,
  itemsPerPage = 10,
  campaigns,

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
  const [allCampaigns, setAllCampaigns] = useState<MyCampaignType[]>([]);
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
      
    //   if (activeFilters.status) {// Filter by status
    //     result = result.filter(campaign => 
    //       campaign.status.toLowerCase() === activeFilters.status.toLowerCase()
    //     );
    //   }
      
      // Filter by goals
      if (activeFilters.goals) {
        result = result.filter(campaign => 
          campaign.campaignGoals.toLowerCase() === activeFilters.goals.toLowerCase()
        );
      }
      
      // Filter by date range
      if (activeFilters.startDate && activeFilters.endDate) {
        // Filter campaigns based on start and end dates
        result = result.filter(campaign => {
          // If we have startDate and endDate directly on the campaign object
          if (campaign.startDate && campaign.endDate) {
            const campaignStartDate = new Date(campaign.startDate);
            const campaignEndDate = new Date(campaign.endDate);
            const filterStartDate = new Date(activeFilters.startDate);
            const filterEndDate = new Date(activeFilters.endDate);
            
            // Check if date ranges overlap
            return (
              (campaignStartDate <= filterEndDate) && 
              (campaignEndDate >= filterStartDate)
            );
          }
          
          return true; // If no date info, include it
        });
      }
      
      // Filter by search query
      if (activeFilters.searchQuery) {
        const query = activeFilters.searchQuery.toLowerCase();
        result = result.filter(campaign => 
          campaign.campaignName.toLowerCase().includes(query) ||
          campaign.campaignGoals.toLowerCase().includes(query) 
        );
      }
    }

    return result;
  }, [allCampaigns, activeFilters]);

  const headers: TableHeader[] = [
    // { id: "advertisers", label: "ADVERTISERS", sortable: true },
    { id: "campaign-name", label: "CAMPAIGN NAME", sortable: true },
    { id: "campaign-goals", label: "CAMPAIGN GOALS", sortable: true },
    {id: "value-peruser", label : "VALUE PER USER", sortable: false},
    { id: "totalLiquidity", label: "TOTAL LIQUIDITY", sortable: true },
    { id: "spent", label: "SPENT", sortable: true },
    { id: "remaining", label: "REMAINING", sortable: true },
    { id: "date-range", label: "DURATION", sortable: true },
    { id: "publisher", label: "PUBLISHERS", sortable: true },
    { id: "status", label: "STATUS", sortable: false },
    { id: "actions", label: "" }
  ];

  // Initialize with sample data or use provided initialCampaigns
  useEffect(() => {
    const data = campaigns.length > 0 ? campaigns : [];
    setAllCampaigns(data);
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [campaigns, itemsPerPage]);

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

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';

    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key, direction });

    // Sort the campaigns based on the selected column
    const sortedCampaigns = [...allCampaigns].sort((a, b) => {
      // Map header id to campaign property
      const propMap: Record<string, keyof MyCampaignType> = {
        // 'advertisers': 'advertiser',
        'campaign-name': 'campaignName',
        'campaign-goals': 'campaignGoals',
        // 'campaign-kpis': 'campaignKPIs',
        'industry': 'industry'
        // 'status': 'status'
      };
      
      // Special case for date range sorting
      if (key === 'date-range') {
        const aStartDate = a.startDate ? new Date(a.startDate) : new Date(0);
        const bStartDate = b.startDate ? new Date(b.startDate) : new Date(0);
        
        if (aStartDate < bStartDate) {
          return direction === 'asc' ? -1 : 1;
        }
        if (aStartDate > bStartDate) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      }
      
      const prop = propMap[key] as keyof MyCampaignType;
      
      if (!prop) return 0;
      
    //   if (a[prop] < b[prop]) {
    //     return direction === 'asc' ? -1 : 1;
    //   }
    //   if (a[prop] > b[prop]) {
    //     return direction === 'asc' ? 1 : -1;
    //   }
      return 0;
    });

    console.log('Sorted Campaigns:', sortedCampaigns);

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
          <table className="min-w-full mb-4">
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
            <tbody className=''>
              {displayedCampaigns.map((campaign) => (
                <MyCampaignList
                  key={campaign.id}
                  campaign={campaign}
                  onViewDetails={() => onViewDetails(campaign)}
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

export default MyCampaignLists;