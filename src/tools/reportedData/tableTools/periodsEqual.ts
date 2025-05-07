import { ReportingPeriod } from 'types/reportedData';
import { period2DataIndex } from '../period2DataIndex';

export const periodsEqual = (
  period1: ReportingPeriod,
  period2: ReportingPeriod,
): boolean => {
  return period2DataIndex(period1) === period2DataIndex(period2);
};
