import { Company, CompanyInfoBase } from './company';

export interface FMCompanyCard {
  id: Company['id'];
  name: Company['name'];
  portfolios: number;
  portfolioCompanies: number;
  users: number;
  active: boolean;
}

export type FundManagerUpdate = CompanyInfoBase &
  Pick<Company, 'description' | 'fiscalYearEnd' | 'type'> & {
    id?: Company['id'];
  };
