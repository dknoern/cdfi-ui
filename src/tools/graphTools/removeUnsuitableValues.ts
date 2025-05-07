import {
  GraphPreviewViewWithMetricData,
  GraphPreviewViewMetricEquationItemBase,
} from 'types/graphs';
import { isSuitableAsNumber } from 'tools/reportedData';

const removeUnsuitableValuesFromItem = (
  item: GraphPreviewViewMetricEquationItemBase,
): GraphPreviewViewMetricEquationItemBase => {
  return Object.assign(item, {
    values: item.values.filter((valueItem) =>
      isSuitableAsNumber(valueItem.value),
    ),
  });
};

// NOTE: Why? Infinity, NaN values are possible and they are not suitable for charts
export const removeUnsuitableValues = (
  graphData: GraphPreviewViewWithMetricData,
): GraphPreviewViewWithMetricData => {
  return {
    ...graphData,
    equations: graphData.equations.map(removeUnsuitableValuesFromItem),
    metrics: graphData.metrics.filter(removeUnsuitableValuesFromItem),
  };
};
