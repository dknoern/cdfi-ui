export interface CdfiSubscription {
  cdfiId: number;
  cdfiName: string;
  isRated: boolean;
  reports: RatingReport[];
  hasPeerGroupAccess: boolean; // aeris explorer
  hasFinancialsAccess: boolean; // performance map
  hasLibraryAccess: boolean;
}

export interface RatingReport {
  ratingReport: string;
  reportDate: string;
  documentId: number;
  hasBeenDownloaded: boolean;
}