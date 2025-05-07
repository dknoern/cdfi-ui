import { ReportingPeriod } from 'types/reportedData';

export const period2DataIndex = (period: ReportingPeriod): string => {
  return `${period.year}q${period.quarter}`;
};
