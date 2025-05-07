import { Company } from './company';
import { User } from './user';

export enum PersonRole {
  ANALYST = 'ANALYST',
  ADMIN = 'ADMIN',
  ANALYST_PLUS = 'ANALYST_PLUS',
  FUND_MANAGER_USER = 'FUND_MANAGER_USER',
  FUND_MANAGER_ADMIN = 'FUND_MANAGER_ADMIN',
  PORTFOLIO_USER = 'PORTFOLIO_USER',
  SUPPORT = 'SUPPORT',
  STAFF = 'STAFF',
  CONTRACTOR = 'CONTRACTOR',
}

export type AuthToken = string;

// for user store
export interface UserInfo {
  userId: User['id'];
  name: User['name'];
  surname: User['surname'];
  email: User['email'];
  companyId: Company['id'];
  companyType: Company['type']
  sub: string; // email used for auth
  auth: PersonRole;
  exp: number; //token expiration time
  premium: boolean;
  firstLogin?: boolean;
  termsAccepted: boolean;
  impersonatingUsername?: string;
  impersonatingName?: string;
}
