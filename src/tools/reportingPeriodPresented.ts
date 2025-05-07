import { ReportingPeriod } from 'types/reportedData';
import { Nullable } from 'types/utility';

export const reportingPeriodPresented = (
  period: Nullable<Partial<ReportingPeriod>>,
): boolean => !!period && !!period.quarter && !!period.year;
