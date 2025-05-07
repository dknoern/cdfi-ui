import { FiscalQuarter, ReportingPeriod } from 'types/reportedData';
import { MetricSharePeriod } from 'types/metricSharePeriod';

export const periodRange2PeriodArray = (
  periodStart: ReportingPeriod,
  periodEnd: ReportingPeriod,
  frequency: MetricSharePeriod,
): ReportingPeriod[] => {
  const result: ReportingPeriod[] = [];
  for (let { year } = periodStart; year <= periodEnd.year; year += 1) {
    if (frequency === MetricSharePeriod.ANNUALLY) {
      result.push({ year, quarter: 4 });
    } else {
      for (let quarter = 1; quarter <= 4; quarter += 1) {
        if (
          (year > periodStart.year && year < periodEnd.year) ||
          (year === periodStart.year && quarter >= periodStart.quarter) ||
          (year === periodEnd.year && quarter <= periodEnd.quarter)
        ) {
          result.push({ year, quarter: quarter as FiscalQuarter });
        }
      }
    }
  }
  return result;
};
