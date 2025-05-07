import { PieDatum } from '@nivo/pie';
import { ChartColumnsType } from 'types/peerGroups';

export enum CompareAggregate {
  Quartile = 'Quartile',
  CDFI = 'CDFI',
}

export const transformRatingsReportToChartData = (
  reportColumns: ChartColumnsType,
): PieDatum[] => {
  return Object.keys(reportColumns).map((key) => ({
    id: key,
    label: key,
    value: reportColumns[key],
  }));
};

export const defaultReportsPageUrlParams = {
  showCalendarYearView: false,
  allYears: false,
  showInterim: false,
  showIncomplete: false,
};

export const defaultCompareAggregate = CompareAggregate.Quartile;
