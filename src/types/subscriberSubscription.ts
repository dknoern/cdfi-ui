import moment from "moment";

export interface SubscriptionCdfi {
  id: number;
  name: string;
  companyType: string;
  active: boolean;
}

export type SubscriberSubscriptionEditFormData = {
  accessList: string[];
  active?: boolean;
  id: number;
  cdfiCountFactSheets: number | string;
  cdfiCountImpactManagementReports: number | string;
  cdfiCountLibrary: number | string;
  cdfiCountPeerGroups: number | string;
  cdfiCountPerformanceMaps: number | string;
  cdfiCountRatingReports: number | string;
  cdfisFactSheets:  SubscriptionCdfi[];
  cdfisImpactManagementReports:  SubscriptionCdfi[];
  cdfisLibrary:  SubscriptionCdfi[];
  cdfisPeerGroups:  SubscriptionCdfi[];
  cdfisPerformanceMaps:  SubscriptionCdfi[];
  cdfisRatingReports:  SubscriptionCdfi[];
  expirationDate: string | moment.Moment;
  notes: string;
  isCustomDataReports: boolean;
  isFactSheets: boolean;
  isImpactManagementReports: boolean;
  isLibrary: boolean;
  isPeerGroups: boolean;
  isPerformanceMaps: boolean;
  isRatingReports: boolean;
  isShowPeerMetrics: boolean;
  startDate?: string | moment.Moment;
  subscriptionType: string;
  outputMapGroup: string;
  explorerFiltersEnabled: boolean;
};

export type SubscriberSubscriptionsDTO = {
  content: SubscriberSubscriptionEditFormData[];
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
};
