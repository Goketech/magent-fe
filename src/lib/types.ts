// types.ts
export interface Campaign {
    id: number;
    advertiser: string;
    campaignName: string;
    goals: string;
    kpis: string;
    duration: string;
    industry: string;
    status: 'Active' | 'Completed';
    
    targetNumber?: number;
    targetAudience?: string;
    ageRange?: string;
    cpc?: number | string;
    totalLiquidity?: string;
    totalPublishers?: number;
    mediaImage?: string;
  }

  export type CampaignStatus = 'Active' | 'Completed' | 'Pending' | 'Inactive';

  export interface MyCampaign {
    id: number;
  
    // Required fields
    campaignName: string;
    campaignGoals: string;
    campaignKPIs: string;
    targetNumber: number;
    industry: string;
    valuePerUser: string;
    amount: number;
    totalLiquidity: number;
    startDate: string; // Or Date if you're using actual Date objects
    endDate: string;
  
    website: string;
    twitter: string;
  
    // Optional fields
    age: string;
    gender: string;
    youtube?: string;
    instagram?: string;
    telegram?: string;
    discord?: string;
    otherResources?: string;
    otherInformation?: string;
    mediaFiles?: File[];
    status?: CampaignStatus;
  }
  