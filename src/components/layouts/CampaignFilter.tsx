import {MdOutlineFilterList, MdSearch, MdClose} from "react-icons/md"
import { useState,  useEffect, useRef  } from 'react';

interface FilterOption {
  label: string;
  value: string;
}

type FilterType = 'industry' | 'status' | 'goals';

export interface FilterState {
  industry: string;
  status: string;
  goals: string;
  startDate: string;
  endDate: string;
  searchQuery: string;
}
interface CampaignFilterProps {
    onFilterChange: (filters: FilterState) => void;
  }

const CampaignFilter: React.FC<CampaignFilterProps> = ({ onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<FilterType | null>(null);
  const [filterState, setFilterState] = useState<FilterState>({
    industry: '',
    status: '',
    goals: '',
    startDate: '',
    endDate: '',
    searchQuery: ''
  });
  const filterRef = useRef<HTMLDivElement>(null);

  // Options for dropdown filters
  const filterOptions: Record<FilterType, FilterOption[]> = {
    industry: [
      { label: 'Infrastructure', value: 'Infrastructure' },
      { label: 'NFTs', value: 'NFTs' },
      { label: 'DeFi', value: 'DeFi' },
      { label: 'Gaming', value: 'Gaming' },
      { label: 'DePIN', value: 'DePIN' },
      { label: 'Consumer dApps', value: 'Consumer dApps' },
      { label: 'Payments', value: 'Payments' },
      { label: 'AI', value: 'AI' },
      { label: 'DAOs', value: 'DAOs' },
    ],
    status: [
      { label: 'Active', value: 'Active' },
      { label: 'Completed', value: 'Completed' },
      // { label: 'Pending', value: 'Pending' }
    ],
    goals: [
      { label: 'Engagement', value: 'Engagement' },
      { label: 'Waitlist', value: 'Waitlist' },
      { label: 'Feedback', value: 'Feedback' },
      { label: 'Installs', value: 'Installs' },
      { label: 'Followers', value: 'Followers' },
      { label: 'Conversion', value: 'Conversion' },
      { label: 'Signups', value: 'Signups' }
    ]
  };

  const handleFilterChange = (type: FilterType, value: string) => {
    setFilterState(prev => ({ ...prev, [type]: value }));
    setShowDropdown(null);
  };

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    setFilterState(prev => ({ ...prev, [field]: value }));
  };

  const toggleDropdown = (type: FilterType) => {
    setShowDropdown(showDropdown === type ? null : type);
  };

  const clearFilters = () => {
    const clearedState = {
        industry: '',
        status: '',
        goals: '',
        startDate: '',
        endDate: '',
        searchQuery: ''
      };
    setFilterState({
      industry: '',
      status: '',
      goals: '',
      startDate: '',
      endDate: '',
      searchQuery: ''
    });
    setSearchQuery('');

    onFilterChange(clearedState);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowDropdown(null); // Close any open dropdown
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const applyFilters = () => {
    const combinedFilters = {
        ...filterState,
        searchQuery
        
  };
  onFilterChange(combinedFilters);
};

  const getFilterLabel = (type: FilterType) => {
    const value = filterState[type];
    return value || type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
<div className="w-full mb-6" ref={filterRef}>
  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
    {/* Filters Section */}
    <div className="flex gap-2 items-center text-[10px] sm:text-xs md:text-sm flex-wrap">
      <span className="text-[#330065] mr-1 text-[10px] sm:text-xs md:text-sm font-medium">Filter by</span>
      
      {/* Industry Filter */}
      <div className="relative">
        <button 
          className={`flex items-center border ${filterState.industry ? 'border-[#330065] bg-blue-50' : 'border-[#EFF0F2]'} rounded-md px-2 sm:px-3 py-1 sm:py-1.5 text-[#999999] shadow-md text-[10px] sm:text-xs md:text-sm`}
          onClick={() => toggleDropdown('industry')}
        >
          <span className="truncate max-w-[80px] sm:max-w-none">
            {getFilterLabel('industry')}
          </span>
          {filterState.industry && (
            <MdClose
              size={12} 
              className="ml-1 text-gray-500 cursor-pointer sm:size-4"
              onClick={(e) => {
                e.stopPropagation();
                handleFilterChange('industry', '');
              }}
            />
          )}
          <MdOutlineFilterList size={14} className="sm:size-4" />
        </button>
        {showDropdown === 'industry' && (
          <div className="absolute z-10 mt-1 w-36 sm:w-40 bg-white border border-[#330065] rounded-md shadow-lg">
            {filterOptions.industry.map(option => (
              <div 
                key={option.value}
                className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-100 cursor-pointer text-[10px] sm:text-xs md:text-sm"
                onClick={() => handleFilterChange('industry', option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Status Filter */}
      <div className="relative">
        <button 
          className={`flex items-center border ${filterState.status ? 'border-[#330065] bg-blue-50' : 'border-[#EFF0F2]'} rounded-md px-2 sm:px-3 py-1 sm:py-1.5 text-[#999999] shadow-md text-[10px] sm:text-xs md:text-sm`}
          onClick={() => toggleDropdown('status')}
        >
          <span className="truncate max-w-[80px] sm:max-w-none">
            {getFilterLabel('status')}
          </span>
          {filterState.status && (
            <MdClose
              size={12} 
              className="ml-1 text-gray-500 cursor-pointer sm:size-4"
              onClick={(e) => {
                e.stopPropagation();
                handleFilterChange('status', '');
              }}
            />
          )}
          <MdOutlineFilterList size={14} className="sm:size-4" />
        </button>
        {showDropdown === 'status' && (
          <div className="absolute z-10 mt-1 w-36 sm:w-40 bg-white border border-[#330065] rounded-md shadow-lg">
            {filterOptions.status.map(option => (
              <div 
                key={option.value}
                className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-100 cursor-pointer text-[10px] sm:text-xs md:text-sm"
                onClick={() => handleFilterChange('status', option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Goals Filter */}
      <div className="relative">
        <button 
          className={`flex items-center border ${filterState.goals ? 'border-[#330065] bg-blue-50' : 'border-[#EFF0F2]'} rounded-md px-2 sm:px-3 py-1 sm:py-1.5 text-[#999999] shadow-md text-[10px] sm:text-xs md:text-sm`}
          onClick={() => toggleDropdown('goals')}
        >
          <span className="truncate max-w-[80px] sm:max-w-none">
            {getFilterLabel('goals')}
          </span>
          {filterState.goals && (
            <MdClose 
              size={12} 
              className="ml-1 text-gray-500 cursor-pointer sm:size-4"
              onClick={(e) => {
                e.stopPropagation();
                handleFilterChange('goals', '');
              }}
            />
          )}
          <MdOutlineFilterList size={14} className="sm:size-4" />
        </button>
        {showDropdown === 'goals' && (
          <div className="absolute z-10 mt-1 w-36 sm:w-40 bg-white border border-[#330065] rounded-md shadow-lg">
            {filterOptions.goals.map(option => (
              <div 
                key={option.value}
                className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-100 cursor-pointer text-[10px] sm:text-xs md:text-sm"
                onClick={() => handleFilterChange('goals', option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Date Filters - Hidden on mobile, shown on tablet+ */}
      <div className="hidden sm:flex items-center gap-2">
        {/* Start Date Filter */}
        <div className="relative flex items-center">
          <span className="mr-1 text-[10px] sm:text-xs md:text-sm">From</span>
          <div className="flex items-center border border-[#EFF0F2] rounded-md px-2 py-1 shadow-md">
            <input
              type="date"
              value={filterState.startDate}
              onChange={(e) => handleDateChange('startDate', e.target.value)}
              className="text-[10px] sm:text-xs md:text-sm w-28 sm:w-32 outline-none"
            />
          </div>
        </div>
        
        {/* End Date Filter */}
        <div className="relative flex items-center">
          <span className="mr-1 text-[10px] sm:text-xs md:text-sm">To</span>
          <div className="flex items-center border border-[#EFF0F2] rounded-md px-2 py-1 shadow-md">
            <input
              type="date"
              value={filterState.endDate}
              onChange={(e) => handleDateChange('endDate', e.target.value)}
              className="text-[10px] sm:text-xs md:text-sm w-28 sm:w-32 outline-none"
            />
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-2 w-full sm:w-auto">
        <button 
          className="border-[#330065] border-2 text-[#330065] rounded-md px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm flex-1 sm:flex-none"
          onClick={applyFilters}
        >
          Apply
        </button>
        
        <button 
          className="text-gray-500 hover:text-[#999999] px-2 py-1 sm:py-1.5 text-[10px] sm:text-xs md:text-sm"
          onClick={clearFilters}
        >
          Clear
        </button>
      </div>
    </div>
    
    {/* Search Section */}
    <div className="relative w-full sm:w-auto">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-[#EFF0F2] rounded-md pl-8 pr-4 py-1.5 w-full sm:w-64 text-[10px] sm:text-xs md:text-sm"
      />
      <MdSearch size={14} className="absolute left-2.5 top-2 text-gray-400 sm:size-4" />
    </div>
  </div>
  
  {/* Mobile Date Filters - Shown only on mobile */}
  <div className="flex sm:hidden gap-2 items-center mt-3 text-[10px]">
    <span className="text-[#330065] mr-1 font-medium">Dates:</span>
    
    {/* Start Date Filter */}
    <div className="relative flex items-center">
      <span className="mr-1">From</span>
      <div className="flex items-center border border-[#EFF0F2] rounded-md px-2 py-1 shadow-md">
        <input
          type="date"
          value={filterState.startDate}
          onChange={(e) => handleDateChange('startDate', e.target.value)}
          className="text-[10px] w-24 outline-none"
        />
      </div>
    </div>
    
    {/* End Date Filter */}
    <div className="relative flex items-center">
      <span className="mr-1">To</span>
      <div className="flex items-center border border-[#EFF0F2] rounded-md px-2 py-1 shadow-md">
        <input
          type="date"
          value={filterState.endDate}
          onChange={(e) => handleDateChange('endDate', e.target.value)}
          className="text-[10px] w-24 outline-none"
        />
      </div>
    </div>
  </div>
</div>
  );
};

export default CampaignFilter;