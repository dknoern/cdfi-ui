export interface AllSubscribers {
  active: boolean;
  expirationDate: Date;
  factSheetsNumber: number;
  factSheetsSlots: string | number;
  impactManagementReportsNumber: number;
  impactManagementReportsSlots: string | number;
  isCustomDataReports: boolean;
  isFactSheets: boolean;
  isImpactManagementReports: boolean;
  isLibrary: boolean;
  isPeerGroups: boolean;
  isPerformanceMaps: boolean;
  isRatingReports: boolean;
  isShowPeerMetrics: boolean;
  libraryNumber: number;
  notes: string;
  peerGroupsNumber: number;
  peerGroupsSlots: string | number;
  performanceMapsNumber: number;
  performanceMapsSlots: string | number;
  ratingReportsNumber: number;
  ratingReportsSlots: string | number;
  startDate: Date;
  name: string;
  subscriberId: number;
  subscriptionId: number;
  subscriptionType: string;
}
