// In your types.ts file
interface BaseCampaign {
  _id: string;
  id: string;
  name: string;
  goals: string;
  industry: string;
  status: string;
  startDate?: number;
  endDate?: number;
  createdAt?: number;
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
  valuePerUser: string;
  valuePerUserAmount: number;
  cpc?: string;
  totalPublishers?: number;
  advertiser: unknown; // This is the key distinguishing property
}

// User's own campaign type (without advertiser)
export interface MyCampaign extends BaseCampaign {
  campaignName: string;
  campaignGoals: string;
  campaignKPIs?: string;
  age?: string;
  gender?: string;
  valuePerUser: string;
  website?: string;
  publishersCount? : number;
  publisherCount?: number;
  valuePerUserAmount:number;
  amount?: string;
  targetAudience?: {
    age?: string;
    gender?: string;
  }
  targetNumber?: string;
  twitter?: string;
  instagram?: string;
  media?: File[];
  feedbackFormId?: string;
  feedbackFormUrl?: string;
  kpis?: string; // Optional in MyCampaign
}

// Simple type guard functions
// export function isCampaign(campaign: Campaign | MyCampaign): campaign is Campaign {
//   return 'advertiser' in campaign;
// }

// export function isMyCampaign(campaign: Campaign | MyCampaign): campaign is MyCampaign {
//   return !('advertiser' in campaign);
// }