import { parsePeriod } from './parsePeriod';

export const prettifyPeriodStr = (dateStr: string): string => {
  const { year, quarter } = parsePeriod(dateStr);

  return `${year}${quarter ? ` Q${quarter}` : ''}`;
};
