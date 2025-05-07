import { MetricColumns } from 'types/metricTableItem';
import { MODAL_WIDTH } from 'constants/ui';

export const columnsListShort = [
  MetricColumns.NAME,
  MetricColumns.ACCOUNT_CODE,
  MetricColumns.TYPE,
];

export const columnsListFull = [
  MetricColumns.NAME,
  MetricColumns.ACCOUNT_CODE,
  MetricColumns.TYPE,
  MetricColumns.GRANDPARENT_ID,
  MetricColumns.PARENT_ID,
  MetricColumns.IS_PUBLIC,
];

export const METRIC_FORM_MODAL_WIDTH = MODAL_WIDTH.MEDIUM;
export const CATEGORY_FORM_MODAL_WIDTH = MODAL_WIDTH.SMALL;
