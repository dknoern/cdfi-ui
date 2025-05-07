import { FiscalQuarter, ReportingPeriod } from 'types/reportedData';

// Convert 12/31/2015 -> { year: 2015, quarter: 4 }
export const chartDate2period = (date: string): ReportingPeriod => {
  const [month, , year] = date.split('/', 3).map(Number);
  const quarter = Math.ceil(month / 3);
  return { year, quarter: quarter as FiscalQuarter };
};
