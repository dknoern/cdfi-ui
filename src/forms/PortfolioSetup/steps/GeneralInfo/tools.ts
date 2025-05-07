import { Investment } from 'types';

export const filterInvestmentsByIds = (
  companies: Investment[],
  ids: Investment['id'][],
): Investment[] => companies.filter((company) => ids.includes(company.id));
