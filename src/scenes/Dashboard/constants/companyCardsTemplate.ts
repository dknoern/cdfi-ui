import { PCCompanyCard } from 'types';

export const companyCardsTemplate: PCCompanyCard[] = [1, 2, 3, 4].map(
  (item) => ({
    id: item,
    name: 'Loading...',
    fiscalYearEnd: 0,
    investmentLife: { start: '', maturity: '' },
    investmentStartDate: '',
    investmentEndDate: '',
    totalInvestments: '',
    totalCommitment: '',
    investmentNumValue: 0,
    tags: [],
    contacts: [],
  }),
);
