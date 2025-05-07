import { FiscalQuarter, ReportingPeriod } from 'types/reportedData';
import { sanitizePeriodStr } from './sanitizePeriodStr';

export const parsePeriod = (periodStr: string): ReportingPeriod => {
  const split = sanitizePeriodStr(periodStr).split('q').map(Number);

  return {
    year: split[0],
    quarter: split[1] as FiscalQuarter,
  };
};
