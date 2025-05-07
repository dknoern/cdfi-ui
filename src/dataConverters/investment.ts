import { Investment } from 'types';

// for similar types
type Fixable = Pick<Investment, 'investmentLife'>;

const needToFix = (value: string): boolean => value.length < 6;
const fixValue = (value: string): string => (needToFix(value) ? '' : value);

export const fixInvestmentLife = <T extends Fixable>(investment: T): T => {
  const { start = '', maturity = '' } = investment.investmentLife ?? {};
  if (needToFix(start) || needToFix(maturity)) {
    const investmentLife = {
      start: fixValue(start),
      maturity: fixValue(maturity),
    };
    return { ...investment, investmentLife };
  }
  return investment;
};

export const fixInvestmentLifeBatch = <T extends Fixable>(
  investments: T[],
): T[] => investments.map(fixInvestmentLife);
