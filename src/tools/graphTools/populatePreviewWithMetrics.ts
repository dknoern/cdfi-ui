import { Metric } from 'types/metric';
import { GraphPreviewView, GraphPreviewViewWithMetricData } from 'types/graphs';

export const populatePreviewWithMetrics = ({
  previewData,
  metrics,
}: {
  previewData: GraphPreviewView;
  metrics: Metric[];
}): GraphPreviewViewWithMetricData => {
  const availableMetrics = Object.fromEntries(
    metrics.map((item) => [item.id, item]),
  );

  return {
    ...previewData,
    metrics: previewData.metrics
      .filter((item) => !!availableMetrics[item.id]) // prevent unexpected from BE
      .map((metric) => {
        const metricFromPool = availableMetrics[metric.id] as Metric;
        const { typeConfig, name, accountCode: code } = metricFromPool;
        const { format, decimals } = typeConfig;

        return {
          ...metric,
          name,
          code,
          format,
          decimals,
        };
      }),
  };
};
