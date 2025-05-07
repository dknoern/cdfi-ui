import { MetricTypeConfig4Numeric } from 'types/metric';
import { isSuitableAsNumber } from 'tools/reportedData';
import { amount2TableValue } from './amount2TableValue';

export const prepareValue = (
  value: number,
  typeConfig: MetricTypeConfig4Numeric,
): string | number => {
  if (isSuitableAsNumber(value)) {
    return amount2TableValue(value as number, typeConfig);
  }
  return '#!ERR';
};
