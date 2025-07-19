import React, { useState, useEffect, useMemo } from "react";
import CampaignList, { Campaign } from "./CampaignList";
import { MyCampaign as MyCampaignType } from "@/lib/types";
import { FilterState } from "./CampaignFilter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AcceptModal from "../ui/AcceptModal";
import { apiClient } from "@/utils/apiClient";
import { useToast } from "@/hooks/use-toast";
import { updateDefaultAccountState } from "@solana/spl-token";

interface TableHeader {
  id: string;
  label: string;
  sortable?: boolean;
}

interface CampaignListsProps {
  allCampaigns: Campaign[]; // Now passed from parent
  loading: boolean; // Loading state from parent
  isEmpty: boolean; // Whether the campaign list is empty
  totalPages: number; // Pagination info from parent

  activeFilters?: FilterState;
  setAllCampaigns?: React.Dispatch<React.SetStateAction<Campaign[]>>;
  onViewDetails: (campaign: Campaign | MyCampaignType) => void;
  onCampaignCountChange?: (count: number) => void;
  mycampaigns: MyCampaignType[];
  isJoined: Record<string, "joined" | undefined>;
  handleJoinSuccess?: (campaignId: string, joinResponse: any) => void;

  itemsPerPage?: number; // Optional in case pagination is handled here
}


const EMPTY_ARRAY: Campaign[] = [];

const CampaignLists: React.FC<CampaignListsProps> = ({
  allCampaigns,
  setAllCampaigns,
  loading,
  isEmpty,
  totalPages,
  mycampaigns,
  itemsPerPage = 10,
  activeFilters = {
    industry: "",
    status: "",
    goals: "",
    startDate: "",
    endDate: "",
    searchQuery: "",
  },
  onViewDetails,
  onCampaignCountChange,
  isJoined,
  handleJoinSuccess,
}) => {
  // const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<
    Campaign | MyCampaignType | null
  >(null);

  const { toast } = useToast();


  // Load publisher campaigns from localStorage

  // Filter campaigns based on activeFilters
  const filteredCampaigns = useMemo(() => {
    let result = Array.isArray(allCampaigns) ? [...allCampaigns] : [];

    if (activeFilters) {
      // Apply filters only if they are not empty
      if (activeFilters.industry) {
        result = result.filter(
          (campaign) =>
            campaign.industry.toLowerCase() ===
            activeFilters.industry.toLowerCase()
        );
      }

      if (activeFilters.status) {
        // Filter by status
        result = result.filter(
          (campaign) =>
            campaign.status.toLowerCase() === activeFilters.status.toLowerCase()
        );
      }

      // Filter by goals
      if (activeFilters.goals) {
        result = result.filter(
          (campaign) =>
            campaign.goals.toLowerCase() === activeFilters.goals.toLowerCase()
        );
      }

      // Filter by date range
      if (activeFilters.startDate || activeFilters.endDate) {
  const filterStart = activeFilters.startDate
    ? new Date(activeFilters.startDate)
    : null;
  const filterEnd = activeFilters.endDate
    ? new Date(activeFilters.endDate)
    : null;

  result = result.filter((campaign) => {
    const campaignStart = new Date(campaign.startDate);
    const campaignEnd = new Date(campaign.endDate);

    const startsAfterOrOn = filterStart ? campaignStart >= filterStart : true;
    const endsBeforeOrOn = filterEnd ? campaignEnd <= filterEnd : true;

    return startsAfterOrOn && endsBeforeOrOn;
  });
}



      // Filter by search query
      if (activeFilters.searchQuery) {
        const query = activeFilters.searchQuery.toLowerCase();
        result = result.filter(
          (campaign) =>
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
    { id: "actions", label: "" },
  ];

  useEffect(() => {
    if (onCampaignCountChange) {
      onCampaignCountChange(allCampaigns.length); // use original length, not filteredCampaigns
    }
  }, [onCampaignCountChange, allCampaigns.length]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAcceptCampaign = (campaign: Campaign | MyCampaignType) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    // Sort the campaigns based on the selected column
    const sortedCampaigns = [...allCampaigns].sort((a, b) => {
      // Map header id to campaign property
      const propMap: Record<string, keyof Campaign> = {
        advertisers: "name",
        "campaign-name": "campaignName",
        "campaign-goals": "goals",
        "campaign-kpis": "kpis",
        duration: "duration",
        industry: "industry",
        status: "status",
      };

      const prop = propMap[key] as keyof Campaign;

      if (!prop) return 0;

      if (a[prop] < b[prop]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[prop] > b[prop]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    if (setAllCampaigns) {
      setAllCampaigns(sortedCampaigns);
    }
  };

  const getSortIcon = (headerId: string) => {
    if (!sortConfig || sortConfig.key !== headerId) {
      return null;
    }

    return (
      <span className="ml-1">{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
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
        className={`w-8 h-8 flex items-center justify-center rounded-md ${
          currentPage === 1
            ? "bg-purple-900 text-white"
            : "border border-gray-300 text-gray-600"
        }`}
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
        <span
          key="ellipsis-start"
          className="flex items-center justify-center px-2"
        >
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
            className={`w-8 h-8 flex items-center justify-center rounded-md ${
              currentPage === i
                ? "bg-purple-900 text-white"
                : "border border-gray-300 text-gray-600"
            }`}
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
        <span
          key="ellipsis-end"
          className="flex items-center justify-center px-2"
        >
          ...
        </span>
      );
    }

    // Add last page if it's not already included
    if (totalPages > 1 && endPage < totalPages) {
      pages.push(
        <button
          key={totalPages}
          className={`w-8 h-8 flex items-center justify-center rounded-md ${
            currentPage === totalPages
              ? "bg-purple-900 text-white"
              : "border border-gray-300 text-gray-600"
          }`}
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
        onClick={() =>
          currentPage < totalPages && handlePageChange(currentPage + 1)
        }
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
        ) : isEmpty ? (
          <div className="py-20 flex flex-col items-center justify-center text-center text-gray-500">
            <p className="text-lg font-medium">No campaigns found</p>
            <p className="text-sm text-gray-400 mt-1">Check back later</p>
          </div>
        ) : (
          <>
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {headers.map((header) => (
                    <th
                      key={header.id}
                      className={`py-3 px-2 md:px-4 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        header.sortable ? "cursor-pointer hover:bg-gray-50" : ""
                      }`}
                      onClick={() => header.sortable && handleSort(header.id)}
                    >
                      <div className="flex items-center">
                        {header.label}
                        {header.sortable && getSortIcon(header.id)}
                      </div>
                    </th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {displayedCampaigns.map((campaign) => (
                  <CampaignList
                    key={campaign._id}
                    mycampaigns={mycampaigns}
                    campaign={campaign}
                    onAccept={() => handleAcceptCampaign(campaign)}
                    onViewDetails={onViewDetails}
                    isJoined={isJoined[campaign._id] === "joined"}
                  />
                ))}
              </tbody>
            </table>
{/* <div className="flex justify-end items-center mt-4 px-2 md:px-4">
  <button
    className={`rounded-md flex items-center justify-center p-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-[#330065] text-white hover:bg-purple-800`}
    onClick={() => {
      localStorage.removeItem("cached_campaigns");
      fetchCampaigns();
    }}
    title="Refresh Campaigns"
  >
    <svg 
      className="w-4 h-4" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
      />
    </svg>
  </button>
</div> */}
            <div className="flex justify-center mt-6 space-x-2">
              {renderPagination()}
            </div>
          </>
        )}

        {selectedCampaign && (
          <AcceptModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            campaign={selectedCampaign}
            onJoinSuccess={handleJoinSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default CampaignLists;
