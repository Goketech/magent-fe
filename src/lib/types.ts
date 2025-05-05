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