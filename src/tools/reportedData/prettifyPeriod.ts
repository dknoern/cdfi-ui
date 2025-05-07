import { ReportingPeriod } from 'types/reportedData';

export const prettifyPeriod = (period: ReportingPeriod): string => {
  return `${period.year} Q${period.quarter}`;
};
