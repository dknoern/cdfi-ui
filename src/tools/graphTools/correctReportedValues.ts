import {
  GraphPreviewViewWithMetricData,
  GraphPreviewViewMetricEquationItemBase,
} from 'types/graphs';
import { correctReportedValueItem } from './correctReportedValueItem';

const correctDataItems = (
  dataItems: GraphPreviewViewMetricEquationItemBase[],
): GraphPreviewViewMetricEquationItemBase[] => {
  return dataItems.map((dataItem) => ({
    ...dataItem,
    values: dataItem.values.map((valueItem) =>
      correctReportedValueItem(valueItem, {
        decimals: dataItem.decimals,
      }),
    ),
  }));
};

// only for charts
export const correctReportedValues = (
  data: GraphPreviewViewWithMetricData,
): GraphPreviewViewWithMetricData => {
  return {
    ...data,
    metrics: correctDataItems(data.metrics),
    equations: correctDataItems(data.equations),
  };
};
