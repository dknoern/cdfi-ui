import { GraphPreviewViewWithMetricData } from 'types/graphs';

export const getMaxValueFromGraphData = (
  graphData: GraphPreviewViewWithMetricData,
): number => {
  return Math.max(
    ...[...graphData.metrics, ...graphData.equations]
      .filter((metric) => !metric.pcId)
      .map((metric) => metric.values)
      .map((metricValues) =>
        Math.max(
          ...metricValues.map((metricValue) => metricValue.value as number),
        ),
      ),
  );
};
