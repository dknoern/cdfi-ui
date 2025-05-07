import { DashboardCardType } from '../types';

export const cardUrlParts: Record<DashboardCardType, string> = {
  [DashboardCardType.FUND_MANAGER_COMPANY]: 'fundmanager',
  [DashboardCardType.REPORTING_ENTITY]: 'entity',
  [DashboardCardType.PORTFOLIO]: 'portfolio',
  [DashboardCardType.INVESTMENT]: 'company',
};
