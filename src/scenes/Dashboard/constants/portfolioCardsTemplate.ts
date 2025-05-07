import { Portfolio } from 'types';

export const portfolioCardsTemplate: Portfolio[] = [1, 2, 3, 4].map((item) => ({
  id: item,
  name: 'Loading...',
  investments: [],
  totalInvestments: '',
  tags: [],
}));
