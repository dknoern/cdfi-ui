import { Company, Portfolio } from 'types';

export enum DashboardCardType {
  FUND_MANAGER_COMPANY = 'FUND_MANAGER_COMPANY',
  REPORTING_ENTITY = 'REPORTING_ENTITY',
  PORTFOLIO = 'PORTFOLIO',
  INVESTMENT = 'INVESTMENT',
}

export interface CardColumn {
  title: number | string;
  text: string;
}

export type FilterState = {
  subcategory: React.Key[];
  category: React.Key[];
};

export type EntityViewMode = 'CARDS' | 'LIST';

export type CardParent = {
  type: DashboardCardType;
  id: Portfolio['id'] | Company['id'];
};
