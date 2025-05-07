import { GraphPreviewViewWithMetricData } from 'types/graphs';

export const getLegendItemsCount = (
  graphData: GraphPreviewViewWithMetricData | null,
): number => {
  if (!graphData) return 0;

  return Array.from(
    new Set(
      [...graphData.equations, ...graphData.metrics].map((item) => item.name),
    ),
  ).length;
};
