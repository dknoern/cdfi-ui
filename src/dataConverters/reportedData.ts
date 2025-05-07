import {
  ForView,
  ReportedData,
  ReportedDataMetricValue,
  ReportedDataMetricValueView,
} from 'types/reportedDataV2';
import { reportingPeriodConverters } from './reportingPeriod';

const convertReportedDataValue = ({
  value,
  period,
}: ReportedDataMetricValue): ReportedDataMetricValueView => ({
  value,
  period: reportingPeriodConverters.reportingPeriod2Str(period),
});

const server2Client = <T extends ReportedData>({
  periods,
  metrics,
  equations,
  ...reportedDataRest
}: T): ForView<T> => {
  return {
    ...reportedDataRest,
    periods: periods.map(reportingPeriodConverters.reportingPeriod2Str),
    metrics: [],
    equations: equations.map(({ values, ...equationRest }) => ({
      ...equationRest,
      values: values.map(convertReportedDataValue),
    })),
  };
};

export const reportedDataConverters = {
  server2Client,
};
