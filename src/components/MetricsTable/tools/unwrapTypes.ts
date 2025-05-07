import { MetricRowItem } from 'types/metricTableItem';

export const unwrapTypes = (metricsList: MetricRowItem[]): MetricRowItem[] => {
  return metricsList.map((item) => ({
    ...item,
    type: item.type ?? item.typeConfig?.type,
  }));
};
