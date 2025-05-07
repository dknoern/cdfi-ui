import { InvestmentType } from 'types';

type InvestmentTypeNames = {
  [key in InvestmentType]: string;
};

export const investmentTypeNames: InvestmentTypeNames = Object.freeze({
  NONE: 'None',
  BOND: 'Bond',
  EQUITY_FUND: 'Equity Fund',
  FIXED_INCOME_FUND: 'Fixed-Income Fund',
  GUARANTEE: 'Guarantee',
  PRIVATE_DEBT: 'Private Debt',
  PRIVATE_EQUITY: 'Private Equity',
  PUBLIC_EQUITY: 'Public Equity',
  OTHER: 'Other',
});
