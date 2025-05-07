import { MetricColumns } from 'types/aggregatedMetricTableItem';
import { MODAL_WIDTH } from 'constants/ui';
import { AggregatedMetric } from '../../../types';

export const columnsList = [MetricColumns.NAME, MetricColumns.METRICS];

export const METRIC_FORM_MODAL_WIDTH = MODAL_WIDTH.SMALL;

export const aggregatedMetricDefaultValues: AggregatedMetric = {
  id: 0,
  name: '',
  unitType: '',
  equationType: 'AGGREGATE',
  definition: '',
  metrics: [],
};
