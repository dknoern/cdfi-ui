import {
  GraphPreviewViewMetricEquationItemBase,
  GraphPreviewViewWithMetricData,
} from 'types/graphs';

export const extractMetricEquationSummaryItems = (
  graphData: GraphPreviewViewWithMetricData,
): GraphPreviewViewMetricEquationItemBase[] => {
  return graphData.metrics.concat(graphData.equations);
};
