import { ReportingPeriod } from 'types/reportedData';
import { MetricSharePeriod } from 'types/metricSharePeriod';
import { periodRange2PeriodArray } from './periodRange2PeriodArray';
import { period2DataIndex } from '../period2DataIndex';

export const periodRange2IndexArray = (
  periodStart: ReportingPeriod,
  periodEnd: ReportingPeriod,
  frequency: MetricSharePeriod,
): string[] => {
  return periodRange2PeriodArray(
    periodStart,
    periodEnd,
    frequency,
  ).map((period) => period2DataIndex(period));
};
