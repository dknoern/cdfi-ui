import { InvestmentType } from 'types/company';
import { GeneralInfoFormModel } from 'forms/CompanyInfoForm/types';
import { companyInfoBaseInitialValue } from 'forms/constants';

export const initialValues: GeneralInfoFormModel = Object.assign(
  {
    description: '',
    fiscalYearEnd: undefined,
    investment: undefined,
    investmentType: 'NONE' as InvestmentType,
    investmentLife: {
      start: '',
      maturity: '',
    },
    tags: [],
    primaryContact: {
      name: '',
      surname: '',
      email: '',
      title: '',
      phone: '',
      id: 0,
    },
    additionalContacts: [],
    reportingStartDate: '',
  },
  companyInfoBaseInitialValue,
);
