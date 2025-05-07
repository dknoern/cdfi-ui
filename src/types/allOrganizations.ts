import { CompanyType } from 'types';
import { PersonRole } from 'types/auth';

export interface CloudUserI {
  email: string;
  firstName: string;
  id: string;
  isActive: boolean;
  isPublicContact: boolean;
  lastName: string;
  phone: string;
  role: PersonRole;
  title: string;
  username: string;
};

export interface AllOrganizations {
name: string;
address: string;
city: string;
state: string;
active: boolean;
rated: boolean;
reporting: boolean;
fiscalYearEnd: string;
companyType: CompanyType;
dateCreated: Date;
dateUpdated: Date;
createdBy: CloudUserI;
updatedBy: CloudUserI;
};

export type CompanyTypeNames = {
  [key in keyof typeof CompanyType]: string;
};

export const companyTypeNames: CompanyTypeNames = {
  [CompanyType.CARS]: 'Aeris',
  [CompanyType.CDFI]: 'CDFI',
  [CompanyType.INVESTOR]: 'Subscriber',
  [CompanyType.PORTFOLIO]: 'Portfolio',
  [CompanyType.ENTERPRISE]: 'Enterprise',
  [CompanyType.FUND_MANAGER_COMPANY]: 'Fund Manager', 
};

