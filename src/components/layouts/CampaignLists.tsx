import React, { useState, useEffect, useMemo } from 'react';
import CampaignList, { Campaign } from './CampaignList';
import { MyCampaign as MyCampaignType} from '@/lib/types';
import { FilterState } from './CampaignFilter';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from "@/context/AuthProvider";
import AcceptModal from '../ui/AcceptModal';

interface TableHeader {
  id: string;
  label: string;
  sortable?: boolean;
}

interface CampaignListsProps {
  initialCampaigns?: Campaign[];
  itemsPerPage?: number;
  activeFilters?: FilterState;
  onViewDetails: (campaign: Campaign | MyCampaignType) => void;
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
  const [loading, setLoading] = useState<boolean>(true);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | MyCampaignType | null>(null);
  const {jwt} = useAuth()
  
  // Filter campaigns based on activeFilters
  const filteredCampaigns = useMemo(() => {
    let result = Array.isArray(allCampaigns) ? [...allCampaigns] : [];
    
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
          campaign.name.toLowerCase().includes(query) ||
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

  // Fetch campaigns from the API
  const fetchCampaigns = async () => {
    setLoading(true);
    
    try {

      
      if (!jwt) {
        console.error('No authentication token found');
        setLoading(false);
        return;
      }
      
      const response = await fetch('https://www.api.hellomagent.com/campaign/marketplace-campaigns', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching campaigns: ${response.status}`);
      }
      
      const data = await response.json();
      
      console.log(data.campaigns)
      setAllCampaigns(data.campaigns);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize with API data or use provided initialCampaigns
  useEffect(() => {
    if (initialCampaigns.length > 0) {
      setAllCampaigns(initialCampaigns);
      setTotalPages(Math.ceil(initialCampaigns.length / itemsPerPage));
      setLoading(false);
    } else {
      fetchCampaigns();
    }
  }, [initialCampaigns, itemsPerPage]);
  
  // Update totalPages when filtered results change
  useEffect(() => {
    setTotalPages(Math.ceil(filteredCampaigns.length / itemsPerPage));
    setCurrentPage(1);
  }, [filteredCampaigns, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAcceptCampaign = (campaign: Campaign | MyCampaignType) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
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
        'advertisers': 'name',
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
                  key={campaign._id} 
                  campaign={campaign} 
                  onAccept={() => handleAcceptCampaign(campaign)}
                  onViewDetails={onViewDetails}
                />
              ))}
            </tbody>
          </table>
        )}
        {selectedCampaign && (
          <AcceptModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            campaign={selectedCampaign}
          />
        )}
      </div>
      
      <div className="flex justify-center mt-6 space-x-2">
        {renderPagination()}
      </div>
    </div>
  );
};

export default CampaignLists;