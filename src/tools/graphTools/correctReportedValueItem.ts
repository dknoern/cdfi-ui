import { MetricTypeConfig4Numeric } from 'types';
import { ReportedDataMetricValueView } from 'types/reportedDataV2';
import { isSuitableAsNumber } from 'tools/reportedData';

export const correctReportedValueItem = (
  valueItem: ReportedDataMetricValueView,
  metricTypeConfig: Pick<MetricTypeConfig4Numeric, 'decimals'>,
): ReportedDataMetricValueView => {
  const { period, value } = valueItem;
  const decimalPlaces = 2;
  if (!isSuitableAsNumber(value)) return valueItem;
  const roundedValue = Number.parseFloat(
    (value as number).toFixed(
      Number(value) > 0 && Number(value) < 2
        ? decimalPlaces
        : metricTypeConfig.decimals,
    ),
  );

  return {
    period,
    value:
      value &&
      roundedValue,
  };
};
