import { FMCompanyCard } from 'types';

export const fmCompaniesCardsTemplate: FMCompanyCard[] = [1, 2, 3, 4].map(
  (item) => ({
    id: item,
    name: 'Loading...',
    portfolios: 0,
    portfolioCompanies: 0,
    users: 0,
    active: true,
  }),
);
