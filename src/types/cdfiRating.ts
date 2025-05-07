
export interface CdfiRating {
  id: string;
  activity: string;
  analystIds?: string[];
  analysts?: string[];
  dateOfAnalysis: string;
  releaseDate: string;
  impactPerformance: string;
  financialStrength: string;
  skipNotification: boolean;
  quarter: number;
  year: number;
  isPolicyPlus: boolean;
  reviewType: string;
}

export interface CdfiRatingsBase {
  ratings: CdfiRating[];
  ratedLogo: string;
  ratedLogoDownload: string;
  ratingLogo: string;
  ratingLogoDownload: string;
  ratedSinceLogo: string;
  ratedSinceLogoDownload: string;
  ratedLogoDownloadPng: string;
  ratingLogoDownloadPng: string;
  ratedSinceLogoDownloadPng: string;
}

export type CdfiRatingsInfo = CdfiRatingsBase;

export type CdfiRatingEditFormData = {
  reviewType: string;
  dateOfAnalysis: string;
  skipNotification: boolean;
  quarter: number;
  isPolicyPlus: boolean;
  year: number;
  releaseDate?: string;
  impactPerformance?: string;
  financialStrength?: string;
  analystIds?: string[];
};
