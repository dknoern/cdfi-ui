import { PersonRole } from 'types';

export type PersonRoleNames = {
  [key in keyof typeof PersonRole]: string;
};

export const personRoleNames: PersonRoleNames = {
  [PersonRole.ADMIN]: 'Admin',
  [PersonRole.ANALYST]: 'Analyst',
  [PersonRole.SUPPORT]: 'Support',
  [PersonRole.FUND_MANAGER_USER]: 'Client User',
  [PersonRole.FUND_MANAGER_ADMIN]: 'Client Admin',
  [PersonRole.PORTFOLIO_USER]: 'Reporting Entity User',
  [PersonRole.ANALYST_PLUS]: 'Analyst Plus',
  [PersonRole.STAFF]: 'Staff',
  [PersonRole.CONTRACTOR]: 'Contractor',
};