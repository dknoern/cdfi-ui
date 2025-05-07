import { GraphPreviewViewWithMetricData } from 'types/graphs';

export const removeCompanyData = (
  graphData: GraphPreviewViewWithMetricData,
): GraphPreviewViewWithMetricData => {
  return {
    ...graphData,
    equations: graphData.equations.filter((item) => !item.pcId),
    metrics: graphData.metrics.filter((item) => !item.pcId),
  };
};
