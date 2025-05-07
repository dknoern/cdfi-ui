export interface DelegatedSubscription {
  id: number;
  subscriptionType: string;
  expirationDate: string;
  cdfi: string;
  accessDetails: string[];
}

export type DelegatedSubscriptionEditFormData = Pick<
  DelegatedSubscription,
  'subscriptionType' | 'expirationDate' | 'cdfi' | 'accessDetails'
>;
