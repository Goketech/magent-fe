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
    <div className="w-full mb-6 " ref={filterRef}>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex gap-2 items-center text-xs flex-wrap">
          <span className="text-[#330065] mr-1 ">Filter by</span>
          
          {/* Industry Filter */}
          <div className="relative">
            <button 
              className={`flex items-center border ${filterState.industry ? 'border-[#330065] bg-blue-50' : 'border-[#EFF0F2]'} rounded-md px-3 py-1.5 text-[#999999] shadow-md`}
              onClick={() => toggleDropdown('industry')}
            >
              {getFilterLabel('industry')}
              {filterState.industry && (
                <MdClose
                  size={14} 
                  className="ml-1 text-gray-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilterChange('industry', '');
                  }}
                />
              )}
              <MdOutlineFilterList size={16} />
            </button>
            {showDropdown === 'industry' && (
              <div className="absolute z-10 mt-1 w-40 bg-white border border-[#330065] rounded-md shadow-lg">
                {filterOptions.industry.map(option => (
                  <div 
                    key={option.value}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
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
              className={`flex items-center border ${filterState.status ? 'border-[#330065] bg-blue-50' : 'border-[#EFF0F2]'} rounded-md px-3 py-1.5 text-[#999999] shadow-md`}
              onClick={() => toggleDropdown('status')}
            >
              {getFilterLabel('status')}
              {filterState.status && (
                <MdClose
                  size={14} 
                  className="ml-1 text-gray-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilterChange('status', '');
                  }}
                />
              )}
              <MdOutlineFilterList size={16} />
            </button>
            {showDropdown === 'status' && (
              <div className="absolute z-10 mt-1 w-40 bg-white border border-[#330065] rounded-md shadow-lg">
                {filterOptions.status.map(option => (
                  <div 
                    key={option.value}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
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
              className={`flex items-center border ${filterState.goals ? 'border-[#330065] bg-blue-50' : 'border-[#EFF0F2]'} rounded-md px-3 py-1.5 text-[#999999] shadow-md`}
              onClick={() => toggleDropdown('goals')}
            >
              {getFilterLabel('goals')}
              {filterState.goals && (
                <MdClose 
                  size={14} 
                  className="ml-1 text-gray-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilterChange('goals', '');
                  }}
                />
              )}
              <MdOutlineFilterList size={16} />
            </button>
            {showDropdown === 'goals' && (
              <div className="absolute z-10 mt-1 w-40 bg-white border border-[#330065] rounded-md shadow-lg">
                {filterOptions.goals.map(option => (
                  <div 
                    key={option.value}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleFilterChange('goals', option.value)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Start Date Filter */}
          <div className="relative flex items-center ">
            <span className="mr-1">From</span>
            <div className="flex items-center border border-[#EFF0F2] rounded-md px-2 py-1 shadow-md">
              <input
                type="date"
                value={filterState.startDate}
                onChange={(e) => handleDateChange('startDate', e.target.value)}
                className="text-sm w-32 outline-none"
              />
              {/* <Calendar size={16} className="ml-1 text-gray-500" /> */}
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
                className="text-sm w-32 outline-none"
              />
              {/* <Calendar size={16} className="ml-1 text-gray-500" /> */}
            </div>
          </div>
          
          <button 
            className="border-[#330065] border-2 text-[#330065] rounded-md px-4 py-1.5 ml-2"
            onClick={applyFilters}
          >
            Apply filter
          </button>
          
          <button 
            className="text-gray-500 hover:text-[#999999] px-2 py-1.5"
            onClick={clearFilters}
          >
            Clear filter
          </button>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-[#EFF0F2] rounded-md pl-8 pr-4 py-1.5 w-64"
          />
          <MdSearch size={16} className="absolute left-2.5 top-2 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default CampaignFilter;