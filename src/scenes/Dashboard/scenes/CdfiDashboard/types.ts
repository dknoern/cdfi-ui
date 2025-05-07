import { Company } from 'types';

export type WithCompanyTypeProps = {
  companyType: Company['type'];
  cdfiId: number;
  cdfiName: string;
};

export type Analyst = {
  id: number,
  firstName: string,
  lastName: string 
}

