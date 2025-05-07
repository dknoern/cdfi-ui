import { useMemo } from 'react';
import { Company, FetchHookResultWithReload, Portfolio } from 'types';
import { GraphPreviewViewWithMetricData } from 'types/graphs';
import {
  correctReportedValues,
  populatePreviewWithMetrics,
} from 'tools/graphTools';
import { useMetrics } from './useMetrics';
import { useGraph } from './useGraph';
import { useAerisGraph } from './useAerisGraph';

type DataType = GraphPreviewViewWithMetricData;
type UseGraphDepsArgs = {
  graphId?: number;
  companyId?: Company['id'];
  portfolioId?: Portfolio['id'];
};
type UseGraphDepsResult = FetchHookResultWithReload<DataType>;

export const useGraphDeps = ({
  graphId,
  companyId,
  portfolioId,
}: UseGraphDepsArgs): UseGraphDepsResult => {
  const {
    data: metrics,
    isLoading: metricsLoading,
    hasError: metricsHasError,
  } = useMetrics();
  const {
    data: graph,
    isLoading: graphLoading,
    hasError: graphHasError,
    reload: reloadGraph,
  } = useGraph({ graphId, companyId, portfolioId });

  const data = useMemo<UseGraphDepsResult['data']>(() => {
    if (!metrics || metricsLoading) return null;
    if (!graph || graphLoading) return null;

    return correctReportedValues(
      populatePreviewWithMetrics({ previewData: graph, metrics }),
    );
  }, [graph, graphLoading, metrics, metricsLoading]);

  return {
    data,
    isLoading: graphLoading || metricsLoading,
    hasError: metricsHasError || graphHasError,
    reload: reloadGraph,
  };
};
