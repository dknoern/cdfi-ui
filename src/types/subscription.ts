import { Company } from './company';

export enum SubscriptionType {
  ENTERPRISE = 'ENTERPRISE',
  ENTERPRISE_PREMIUM = 'ENTERPRISE_PREMIUM',
  ALL = 'ALL',
  MULTIPLE = 'Multiple', // Cloud 2 uses Multiple instead of All
  SINGLE = 'SINGLE',
  LIBRARY = 'LIBRARY',
  SELECT = 'SELECT',
}

export type SubscriptionCompany = {
  id: number;
  name: string;
};

export interface Subscription {
  id: number;
  type: SubscriptionType;
  subscriptionType: SubscriptionType;
  startDate: string;
  endDate: string;
  expirationDate: number;
  ownerId: Company['id'];
  subscriptionCompanies: SubscriptionCompany[];
  isPeerGroups: boolean | undefined;
  isRatingReports: boolean | undefined;
  isPerformanceMaps: boolean | undefined;
  cdfis: [];
}

export interface SubscriptionProductStatusVM {
  financialsAvailable: string;
  peerGroupsAvailable: string;
  ratingsAvailable: string;
  financialsEligible: boolean;
  financialsSelected: boolean;
  financialsCheckboxVisible: boolean;
  peerGroupsEligible: boolean;
  peerGroupsSelected: boolean;
  peerGroupsCheckboxVisible: boolean;
  ratingsEligible: boolean;
  ratingsSelected: boolean;
  ratingsCheckboxVisible: boolean;
}

export interface SubscriptionProductStatusVMSelected {
  financialsSelected: boolean;
  peerGroupsSelected: boolean;
  ratingsSelected: boolean;}

export type SubscriptionEdit = Pick<
  Subscription,
  'type' | 'startDate' | 'endDate'
> & { subscriptionCompanies: { id: Company['id']; name?: Company['name'] }[] };

export type EditableSubscription = SubscriptionEdit & {
  id?: Subscription['id'];
};
