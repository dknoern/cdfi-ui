import { apiProcessor } from 'tools/apiProcessor';
import { Portfolio } from 'types';

export const listPortfolios = (ownerId: number): Promise<Portfolio[]> =>
  apiProcessor.get('portfoliosByOwner', ownerId);

export const getPortfolioById = (id: number): Promise<Portfolio> =>
  apiProcessor.get('portfolioById', id);
