import { Investment } from 'types';
import { Tag } from './tag';
import { User } from './user';

export type Contact = Partial<User> & { id: User['id'] }; // bc old data

// used only in Atlas
export enum CompanyType {
  CARS = 'CARS',
  CDFI = 'CDFI',
  INVESTOR = 'INVESTOR',
  PORTFOLIO = 'PORTFOLIO',
  ENTERPRISE = 'ENTERPRISE',
  FUND_MANAGER_COMPANY = 'FUND_MANAGER_COMPANY',
}

export type InvestmentType =
  | 'NONE'
  | 'BOND'
  | 'EQUITY_FUND'
  | 'FIXED_INCOME_FUND'
  | 'GUARANTEE'
  | 'PRIVATE_DEBT'
  | 'PRIVATE_EQUITY'
  | 'PUBLIC_EQUITY'
  | 'OTHER';

export interface CompanyInfoBase {
  name: string;
  address: {
    country: string;
    state: string;
    city: string;
    street: string;
    zipCode: string;
  };
}

export type InvestmentLife = {
  start: string;
  maturity: string;
};

// ReportingEntity
// Need to add count of investments
export type Company = CompanyInfoBase & {
  id: number;
  type?: CompanyType;
  active?: boolean;
  fiscalYearEnd: number;
  tags: Tag[];
  contacts: Contact[];
  description: string; // only for PC
  investmentStartDate: string; // only for PC
  investmentEndDate: string; // only for PC
  totalInvestments: string; // only for PC
  totalCommitment: string; // only for PC
  investmentNumValue: number; // only for PC
  investmentType: InvestmentType;
  investmentLife: InvestmentLife;
  investmentsInfo: Investment[];
  reportingStartDate: string;
};

// TODO: properly use Company, PCCompany and FMCompany
// Investment
export interface PCCompany extends Company {
  totalInvestments: string;
  investmentNumValue: number;
}

export type FMCompany = Company;

export type ReportingEntityCard = Pick<
  Company,
  'id' | 'name' | 'investmentsInfo' | 'tags'
> & {
  investmentScore: string;
};

export type PCCompanyCard = Pick<
  PCCompany,
  | 'id'
  | 'name'
  | 'tags'
  | 'contacts'
  | 'fiscalYearEnd'
  | 'investmentStartDate'
  | 'investmentEndDate'
  | 'totalCommitment'
  | 'totalInvestments'
  | 'investmentNumValue'
>;
