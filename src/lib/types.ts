// In your types.ts file
interface BaseCampaign {
  _id: number;
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
  kpis: string;
  ageRange?: string;
  cpc?: string;
  totalPublishers?: number;
  advertiser: unknown; // This is the key distinguishing property
}

// User's own campaign type (without advertiser)
export interface MyCampaign extends BaseCampaign {
  age?: string;
  gender?: string;
  valuePerUser?: string;
  website?: string;
  publishersCount? : number;
  amount:number;
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