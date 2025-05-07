import { Nullable } from 'types/utility';
import { GraphPreviewViewWithMetricData } from 'types/graphs';

export const isEmptyGraph = (
  graphData: Nullable<GraphPreviewViewWithMetricData>,
): boolean => {
  if (!graphData) return true;

  return ![...graphData.metrics, ...graphData.equations].find(
    (item) => item.values.length > 0,
  );
};
