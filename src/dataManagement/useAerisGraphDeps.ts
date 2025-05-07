import { useMemo } from 'react';
import { Company, FetchHookResultWithReload, Metric } from 'types';
import { GraphPreviewViewWithMetricData } from 'types/graphs';
import {
  correctReportedValues,
  populatePreviewWithMetrics,
} from 'tools/graphTools';
import { useAerisGraph } from './useAerisGraph';

type DataType = GraphPreviewViewWithMetricData;
type UseGraphDepsArgs = {
  graphId?: number;
  companyId?: Company['id'];
};
type UseGraphDepsResult = FetchHookResultWithReload<DataType>;

export const useAerisGraphDeps = ({
  graphId,
  companyId,
}: UseGraphDepsArgs): UseGraphDepsResult => {
  const metrics: Metric[] = [];
  const metricsLoading = false;
  const metricsHasError = false;
  const {
    data: graph,
    isLoading: graphLoading,
    hasError: graphHasError,
    reload: reloadGraph,
  } = useAerisGraph({ graphId, companyId });

  const data = useMemo<UseGraphDepsResult['data']>(() => {
    if (!graph || graphLoading) return null;

    return correctReportedValues(
      populatePreviewWithMetrics({ previewData: graph, metrics }),
    );
  }, [graph, graphLoading, metrics]);

  return {
    data,
    isLoading: graphLoading || metricsLoading,
    hasError: metricsHasError || graphHasError,
    reload: reloadGraph,
  };
};
