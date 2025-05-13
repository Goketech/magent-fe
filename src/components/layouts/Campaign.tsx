// Campaign.tsx - Main component
import React, { useState, useMemo, useEffect } from "react";
import CampaignHead from "./CampaignHead";
import CampaignFilter, { FilterState } from "./CampaignFilter";
import CampaignLists from "./CampaignLists";
import CampaignDetails from "./CampaignDetails";
import MyCampaignLists from "./MyCampaignLists";
import CreateCampaign from "./CreateCampaign";
import MyCampaignDetails from "./MyCampaignDetails";
import EmptyState from "./EmptyState";
import {
  Campaign as CampaignType,
  MyCampaign as MyCampaignType,
} from "../../lib/types";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  transferCoin,
  developerPublicKey,
  confirmTransaction,
} from "@/utils/transferCoin";
import { start } from "repl";

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
    CampaignType | MyCampaignType | null
  >(null);
  const [createCampaign, setCreateCampaign] = useState<boolean>(false);
  const [userCampaigns, setUserCampaigns] = useState<MyCampaignType[]>([]);
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);

  const filters = useMemo(() => rawFilters, [rawFilters]);

  // Load campaigns from localStorage on component mount
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const userCampaignResponse = await fetch(
          "https://www.api.hellomagent.com/campaign/user-campaigns",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!userCampaignResponse.ok) {
          throw new Error("Failed to fetch user campaigns");
        }
        const userCampaignsData = await userCampaignResponse.json();
        const campaigns: MyCampaignType[] = userCampaignsData.map(
          (campaign: any) => ({
            id: campaign._id,
            campaignName: campaign.name,
            campaignGoals: campaign.goals,
            targetNumber: campaign.targetNumber,
            campaignKPIs: campaign.kpi,
            industry: campaign.industry,
            valuePerUser: campaign.valuePerUser,
            amount: Number(campaign.valuePerUserAmount),
            totalLiquidity: campaign.totalLiquidity,
            startDate: campaign.startDate,
            endDate: campaign.endDate,
            website: campaign.website,
            twitter: campaign.xAccount,
            youtube: campaign.youtube,
            instagram: campaign.instagram,
            telegram: campaign.telegram,
            discord: campaign.discord,
            otherResources: campaign.otherSocials,
            otherInformation: campaign.otherInfo,
            mediaFiles: campaign.media,
            status: campaign.status,
            createdAt: campaign.createdAt,
            age: campaign.targetAudience.age,
            gender: campaign.targetAudience.gender,
          })
        );

        setUserCampaigns(campaigns);
      } catch (error) {
        console.error("Failed to parse saved campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  // Save campaigns to localStorage whenever they change
  useEffect(() => {
    // Only save if we have campaigns to save
    if (userCampaigns.length > 0) {
      console.log("Saving to localStorage:", userCampaigns);
      localStorage.setItem("userCampaigns", JSON.stringify(userCampaigns));
    }
  }, [userCampaigns]);

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
  // function resetCampaignData() {
  //   localStorage.removeItem('userCampaigns');
  //   console.log('Campaign data has been reset. Reload the page to see the effect.');
  // }

  /**
   * Uploads a File to Cloudinary, returns the secure URL.
   * Detects if it's image or video based on `file.type`.
   */
  async function uploadToCloudinary(
    file: File
  ): Promise<{ url: string; type: "image" | "video" }> {
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
      type: isImage ? "image" : "video",
    };
  }

  const handleAddCampaign = async (campaignData: any) => {
    console.log(campaignData);
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

    const transactionResponse = await fetch(
      "https://www.api.hellomagent.com/transactions/create-transaction",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feature: "campaign",
          reference: `campaign_${Date.now()}`,
          amount: amountToSend,
        }),
      }
    );

    if (!transactionResponse.ok) {
      toast({
        variant: "destructive",
        description: "Failed to initiate transaction. Please try again.",
      });
      setIsCreatingCampaign(false);
      return;
    }

    const transactionData = await transactionResponse.json();
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
    const updateResponse = await fetch(
      "https://www.api.hellomagent.com/transactions/update-transaction-status",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId,
          status: "success",
          signature,
        }),
      }
    );

    if (!updateResponse.ok) {
      toast({
        variant: "destructive",
        description: "Failed to verify transaction. Please try again.",
      });
      setIsCreatingCampaign(false);
      return;
    }
    const newCampaign: MyCampaignType = {
      id: userCampaigns.length + 1, // Simple ID generation
      ...campaignData,
      status: "Active", // Default status
      createdAt: new Date().toISOString(),
      // Add any other required fields for CampaignType
    };

    // Explicitly save to localStorage immediately
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
      const response: any = await fetch(
        "https://www.api.hellomagent.com/campaign/create-campaign",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        toast({
          variant: "destructive",
          description: "Failed to create campaign. Please try again.",
        });
        setIsCreatingCampaign(false);
        return;
      }
      const data = await response.json();
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

  return (
    <div className="container mx-auto px-2 mt-[-2.5rem]">
      {selectedCampaign ? (
        "advertiser" in selectedCampaign ? (
          <CampaignDetails
            campaign={selectedCampaign}
            onBack={handleBack}
            onAccept={handleAccept}
          />
        ) : (
          <MyCampaignDetails campaign={selectedCampaign} onBack={handleBack} />
        )
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
          {userCampaigns.length === 0 ? (
            ""
          ) : (
            <CampaignFilter onFilterChange={handleFilterChange} />
          )}
          {activeView === "marketplace" ? (
            <CampaignLists
              activeFilters={filters}
              onViewDetails={handleViewDetails}
              campaigns={userCampaigns}
            />
          ) : userCampaigns.length === 0 ? (
            <EmptyState onCreateCampaign={handleCreateCampaign} />
          ) : (
            <MyCampaignLists
              activeFilters={filters}
              onViewDetails={handleViewDetails}
              campaigns={userCampaigns}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Campaign;
