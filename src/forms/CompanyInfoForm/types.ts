import {
  CompanyInfoBase,
  Contact,
  InvestmentType,
  Company,
} from 'types/company';
import { Tag } from 'types';

type InvestmentLife = {
  start: string;
  maturity: string;
};

export type GeneralInfoModel = Pick<
  Company,
  | 'name'
  | 'description'
  | 'address'
  | 'contacts'
  | 'investmentType'
  | 'reportingStartDate'
> & {
  fiscalYearEnd: number;
  tags: Tag['id'][];
  investment: number;
  investmentLife: InvestmentLife;
};

export interface GeneralInfoFormModel extends CompanyInfoBase {
  description: string;
  fiscalYearEnd?: number;
  investmentType: InvestmentType;
  investment?: number;
  investmentLife: Partial<InvestmentLife>;
  primaryContact: Contact;
  additionalContacts: Contact[];
  tags: Tag['id'][];
  reportingStartDate: Company['reportingStartDate'];
}
