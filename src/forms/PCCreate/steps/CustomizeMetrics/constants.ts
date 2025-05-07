import { FormStep } from 'forms/PCCreate/types';
import { MetricColumns } from 'types/metricTableItem';

export const CURRENT_STEP = FormStep.customizeMetrics;

export const columnList = [
  MetricColumns.NAME,
  MetricColumns.ACCOUNT_CODE,
  MetricColumns.TYPE,
  MetricColumns.GRANDPARENT_ID,
  MetricColumns.PARENT_ID,
  MetricColumns.TAGS,
  MetricColumns.FREQUENCY,
];
