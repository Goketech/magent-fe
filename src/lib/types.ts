// In your types.ts file
interface BaseCampaign {
  _id: number;
  id: string;
  name: string;
  goals: string;
  industry: string;
  status: string;
  startDate?: number;
  endDate?: number;
  targetNumber?: string;
  totalLiquidity?: string;
  mediaImage?: string;
}

// Marketplace campaign type (with advertiser)
export interface Campaign extends BaseCampaign {
  campaignName: string;
  campaignGoals: string;
  kpis: string;
  ageRange?: string;
  cpc?: string;
  totalPublishers?: number;
  advertiser: unknown; // This is the key distinguishing property
}

// User's own campaign type (without advertiser)
export interface MyCampaign extends BaseCampaign {
  campaignName: string;
  campaignGoals: string;
  age?: string;
  gender?: string;
  valuePerUser?: string;
  website?: string;
  publisherCount? : number;
  valuePerUserAmount:number;
  targetAudience?: {
    age?: string;
    gender?: string;
  }
  targetNumber?: string;
  twitter?: string;
  instagram?: string;
  media?: File[];
  kpis?: string; // Optional in MyCampaign
}

// Simple type guard functions
export function isCampaign(campaign: Campaign | MyCampaign): campaign is Campaign {
  return 'advertiser' in campaign;
}

export function isMyCampaign(campaign: Campaign | MyCampaign): campaign is MyCampaign {
  return !('advertiser' in campaign);
}