// Campaign.tsx - Main component
import React, { useState, useMemo, useEffect } from "react";
import CampaignHead from "./CampaignHead";
import CampaignFilter, { FilterState } from "./CampaignFilter";
import CampaignLists from "./CampaignLists";
import type { Campaign } from "./CampaignList";

import CampaignDetails from "./CampaignDetails";
import MyCampaignLists from "./MyCampaignLists";
import CreateCampaign from "./CreateCampaign";
import MyCampaignDetails from "./MyCampaignDetails";
import EmptyState from "./EmptyState";
import {
  Campaign as CampaignType,
  MyCampaign as MyCampaignType, PublisherCampaign
} from "../../lib/types";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  transferCoin,
  developerPublicKey,
  confirmTransaction,
} from "@/utils/transferCoin";
import { capitalizeEachWord } from "@/utils/capitalize";
import { apiClient } from "@/utils/apiClient";
import { logEvent } from "@/utils/logEvent";

const EMPTY_ARRAY: Campaign[] = [];

const Campaign: React.FC = () => {
  const { toast } = useToast();
  const { jwt } = useAuth();
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [rawFilters, setRawFilters] = useState<FilterState>({
    industry: "",
    status: "",
    goals: "",
    startDate: "",
    endDate: "",
    searchQuery: "",
  });

  const [activeView, setActiveView] = useState<"marketplace" | "myCampaigns">(
    "marketplace"
  );
  const [selectedCampaign, setSelectedCampaign] = useState<
    CampaignType | null
  >(null);
  const [selectedUserCampaign, setSelectedUserCampaign] =
    useState<MyCampaignType | null>(null);
  const [createCampaign, setCreateCampaign] = useState<boolean>(false);
  const [userCampaigns, setUserCampaigns] = useState<MyCampaignType[]>([]);
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [campaignCount, setCampaignCount] = useState(0);


  // const [joinedStatuses, setJoinedStatuses] = useState<Record<string, "joined">>({});

    const [publisherCampaigns, setPublisherCampaigns] = useState<
      PublisherCampaign[]
    >([]);
  

  const filters = useMemo(() => rawFilters, [rawFilters]);
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 10;
  const initialCampaigns = EMPTY_ARRAY

  const fetchCampaigns = async () => {
    setIsLoading(true);

    try {
      const data = await apiClient("/campaign/marketplace-campaigns", {
        method: "GET",
      });

      setAllCampaigns(data.campaigns);
      if (data.campaigns.length === 0) {
        setIsEmpty(true);
        setIsLoading(false);
      }
      setTotalPages(Math.ceil(data.campaigns.length / itemsPerPage));
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          error instanceof Error
            ? error.message
            : "Error fetching campaigns. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialCampaigns.length > 0) {
      setAllCampaigns(initialCampaigns);
      setTotalPages(Math.ceil(initialCampaigns.length / itemsPerPage));
      setIsLoading(false);
    } else {
      fetchCampaigns();
    }
  }, [initialCampaigns, itemsPerPage]);

  // Load campaigns from localStorage on component mount
useEffect(() => {
  const stored = localStorage.getItem("publisher_campaign");
  const campaigns: PublisherCampaign[] = stored ? JSON.parse(stored) : [];

  // Add "joined" status to existing entries if not present
  const patched = campaigns.map((c) => ({
    ...c,
    status: c.status || "joined", // default to 'joined' if missing
  }));

  setPublisherCampaigns(patched);

  // Update localStorage with patched values
  localStorage.setItem("publisher_campaign", JSON.stringify(patched));
}, []);

const joinedStatuses = useMemo(() => {
  const map: Record<string, "joined"> = {};
  publisherCampaigns.forEach((pc) => {
    if (pc.status === "joined") {
      map[pc.campaignId] = "joined";
    }
  });
  return map;
}, [publisherCampaigns]);
  const handleJoinSuccess = (campaignId: string, joinResponse: any) => {
    // Update the specific campaign's status to "Joined"
    
    const status = joinResponse.status;
    // Update publisher campaigns in localStorage and state
    const newPublisherCampaign: PublisherCampaign = {
      campaignId: campaignId,
      referralCode: joinResponse.referralCode || "",
      joinedAt: new Date().toISOString(),
      _id: joinResponse._id || "",
      status,
    };
  
    const updatedPublisherCampaigns = [
      ...publisherCampaigns,
      newPublisherCampaign,
    ];
    
    // UPDATE STATE FIRST, THEN LOCALSTORAGE
    setPublisherCampaigns(updatedPublisherCampaigns);
    localStorage.setItem(
      "publisher_campaign",
      JSON.stringify(updatedPublisherCampaigns)
    );
  
  };
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const userCampaignsData = await apiClient("/campaign/user-campaigns", {
          method: "GET",
        });

        const campaigns: MyCampaignType[] = userCampaignsData.map(
          (campaign: any) => ({
            id: campaign._id,
            campaignName: capitalizeEachWord(campaign.name),
            campaignGoals: capitalizeEachWord(campaign.goals),
            targetNumber: campaign.targetNumber,
            campaignKPIs: capitalizeEachWord(campaign.kpi),
            industry: capitalizeEachWord(campaign.industry),
            valuePerUser: campaign.valuePerUser,
            amount: Number(campaign.valuePerUserAmount),
            totalLiquidity: campaign.totalLiquidity,
            startDate: campaign.startDate,
            endDate: campaign.endDate,
            feedbackFormId: campaign.feedbackFormId,
            feedbackFormUrl: campaign.feedbackFormUrl,
            website: campaign.website,
            twitter: campaign.xAccount,
            youtube: campaign.youtube,
            instagram: campaign.instagram,
            telegram: campaign.telegram,
            discord: campaign.discord,
            otherResources: campaign.otherSocials,
            otherInformation: campaign.otherInfo,
            mediaFiles: campaign.media,
            status: capitalizeEachWord(campaign.status),
            createdAt: campaign.createdAt,
            age: campaign.targetAudience.age,
            gender: capitalizeEachWord(campaign.targetAudience.gender),
            publishersCount: campaign.publisherCount,
          })
        );

        setUserCampaigns(campaigns);
      } catch (error) {
        console.error("Failed to fetch user campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);
  
  const isCampaignJoined = (campaignId: string) =>
  joinedStatuses[campaignId] === "joined";

  const handleFilterChange = (newFilters: FilterState) => {
    setRawFilters(newFilters);
  };

  const handleViewDetails = (campaign: CampaignType | any) => {
    setSelectedUserCampaign(null);
    setSelectedCampaign(campaign);
  };
  const handleViewDetailsUserCampaign = (campaign: MyCampaignType | any) => {
    setSelectedCampaign;
    setSelectedUserCampaign(campaign);
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

  const handleBackUserCampaign = () => {
    setSelectedUserCampaign(null);
  };
  console.log(allCampaigns, "allCampaigns");

  /**
   * Uploads a File to Cloudinary, returns the secure URL.
   * Detects if it's image or video based on `file.type`.
   */
  async function uploadToCloudinary(
    file: File
  ): Promise<{ url: string; typeOfMedia: "image" | "video" }> {
    const isImage = file.type.startsWith("image/");
    const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

    const form = new FormData();
    form.append("file", file);
    form.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );
    form.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);

    // You could add folder/folder name if you like:
    // form.append('folder', 'campaign_media');

    const resp = await fetch(uploadUrl, {
      method: "POST",
      body: form,
    });

    if (!resp.ok) {
      toast({
        variant: "destructive",
        description: "Failed to upload media. Please try again.",
      });
      setIsCreatingCampaign(false);
      throw new Error(`Cloudinary upload failed: ${resp.statusText}`);
    }

    const json = await resp.json();
    return {
      url: json.secure_url as string,
      typeOfMedia: isImage ? "image" : "video",
    };
  }
  const handleCampaignCountChange = (count: number) => {
    setCampaignCount(count);
  };
  const handleAddCampaign = async (campaignData: any) => {
    logEvent({
      action: "click",
      category: "Button",
      label: "Login",
      value: 1,
    });

    if (!jwt) {
      toast({
        variant: "destructive",
        description: "Please connect your wallet",
      });
      setIsCreatingCampaign(false);
      return;
    }
    setIsCreatingCampaign(true);

    if (!publicKey) {
      toast({
        variant: "destructive",
        description: "Please connect your wallet",
      });
      setIsCreatingCampaign(false);
      return;
    }

    const amountToSend = Number(campaignData.totalLiquidity);

    const createTransaction = async (
      amountToSend: number,
      jwt: string | null,
      setIsCreatingCampaign: (val: boolean) => void
    ) => {
      try {
        const transactionResponse = await apiClient(
          "/transactions/create-transaction",
          {
            method: "POST",
            body: {
              feature: "campaign",
              reference: `campaign_${Date.now()}`,
              amount: amountToSend,
            },
          }
        );

        return transactionResponse;
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Failed to initiate transaction. Please try again.",
        });
        setIsCreatingCampaign(false);
        console.log("Error creating transaction:", error);
        return;
      }
    };

    const updateTransactionStatus = async (
      transactionId: string,
      signature: string,
      jwt: string | null,
      setIsCreatingCampaign: (val: boolean) => void
    ) => {
      try {
        const data = await apiClient(
          "/transactions/update-transaction-status",
          {
            method: "POST",
            body: {
              transactionId,
              status: "success",
              signature,
            },
          }
        );

        return data;
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Failed to verify transaction. Please try again.",
        });
        setIsCreatingCampaign(false);
        return;
      }
    };

    const transactionData = await createTransaction(
      amountToSend,
      jwt,
      setIsCreatingCampaign
    );

    if (!transactionData) return; // already handled the error in createTransaction

    const transactionId = transactionData.transactionId;
    let signature = "";

    try {
      signature = await transferCoin(
        connection,
        publicKey!,
        developerPublicKey,
        amountToSend,
        sendTransaction
      );

      if (!signature) {
        toast({
          variant: "destructive",
          description: "Failed to verify transaction. Please try again.",
        });
        setIsCreatingCampaign(false);
        return;
      }
      const blockHash = await connection.getLatestBlockhash();

      const transaction = await confirmTransaction(connection, {
        signature,
        ...blockHash,
      });

      if (transaction.value.err !== null) {
        toast({
          variant: "destructive",
          description: "Failed to verify transaction. Please try again.",
        });
        setIsCreatingCampaign(false);
        return;
      }

      await updateTransactionStatus(
        transactionId,
        signature,
        jwt,
        setIsCreatingCampaign
      );
    } catch (error) {
      console.error("Transaction Error:", error);
      toast({
        variant: "destructive",
        description:
          error instanceof Error
            ? error.message
            : "Failed to complete transaction. Please try again.",
      });
      setIsCreatingCampaign(false);
      return;
    }

    const newCampaign: MyCampaignType = {
      id: userCampaigns.length + 1,
      ...campaignData,
      status: "Pending", // Default status
      createdAt: new Date().toISOString(),
    };

    try {
      const uploads = await Promise.all(
        campaignData.mediaFiles.map((file: File) => uploadToCloudinary(file))
      );

      const body = {
        name: campaignData.campaignName,
        goals: campaignData.campaignGoals,
        kpi: campaignData.campaignKPIs,
        targetNumber: campaignData.targetNumber,
        publishers: 0,
        targetAudience: {
          age: campaignData.age,
          gender: campaignData.gender,
        },
        industry: campaignData.industry,
        valuePerUser: campaignData.valuePerUser,
        valuePerUserAmount: Number(campaignData.amount),
        totalLiquidity: campaignData.totalLiquidity,
        website: campaignData.website,
        xAccount: campaignData.twitter,
        transactionId: transactionId,
        media: uploads,
        startDate: campaignData.startDate,
        endDate: campaignData.endDate,
        telegram: campaignData.telegram,
        discord: campaignData.discord,
        youtube: campaignData.youtube,
        instagram: campaignData.instagram,
        otherSocials: campaignData.otherResources,
        otherInfo: campaignData.otherInformation,
      };
      const createCampaign = async (
        body: any,
        jwt: string | null,
        setIsCreatingCampaign: (val: boolean) => void
      ) => {
        try {
          const response = await apiClient("/campaign/create-campaign", {
            method: "POST",
            body,
          });

          return response;
        } catch (error) {
          toast({
            variant: "destructive",
            description: "Failed to create campaign. Please try again.",
          });
          setIsCreatingCampaign(false);
          return;
        }
      };

      // Add to campaigns array
      const updatedCampaigns = [...userCampaigns, newCampaign];

      // Update state
      setUserCampaigns(updatedCampaigns);

      toast({
        variant: "success",
        description: "Campaign created successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: `Failed to create Campaign. ${
          error instanceof Error ? error.message : "Unknown error occurred"
        }`,
      });
    }

    // Exit create campaign view
    setCreateCampaign(false);
  };
  // if (!selectedCampaign) return null;


  return (
    <div className="container mx-auto px-2 mt-[-2.5rem]">
  {selectedCampaign ? (
    <MyCampaignDetails
      campaign={selectedCampaign}
      onBack={handleBack}
      handleJoinSuccess={handleJoinSuccess}
      isCampaignJoined ={isCampaignJoined}
    />
  ) : selectedUserCampaign ? (
    <CampaignDetails
      campaign={selectedUserCampaign}
      onBack={handleBackUserCampaign}
    />
  ) : createCampaign ? (
    <CreateCampaign
      handleGoBack={handleCreateBack}
      onCampaignCreate={handleAddCampaign}
    />
  ) : (
    <>
      <CampaignHead
        handleCreateCampaign={handleCreateCampaign}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      {(activeView === "marketplace" && campaignCount > 0) ||
      (activeView === "myCampaigns" && userCampaigns.length > 0) ? (
        <CampaignFilter onFilterChange={handleFilterChange} />
      ) : (
        ""
      )}
      {activeView === "marketplace" ? (
        <CampaignLists
      allCampaigns={allCampaigns}
      loading={isLoading}
      setAllCampaigns={setAllCampaigns}
      isEmpty={isEmpty}
      totalPages={totalPages}
      activeFilters={filters}
      onViewDetails={handleViewDetails}
      onCampaignCountChange={handleCampaignCountChange}
      handleJoinSuccess={handleJoinSuccess}
      isJoined={joinedStatuses}
    />
      ) : userCampaigns.length === 0 ? (
        <EmptyState onCreateCampaign={handleCreateCampaign} />
      ) : (
        <MyCampaignLists
          activeFilters={filters}
          onViewDetails={handleViewDetailsUserCampaign}
          campaigns={userCampaigns}
        />
      )}
    </>
  )}
</div>

  );
};

export default Campaign;
