import { useMemo } from 'react';
import { FetchHookResult, Metric } from 'types';
import { GraphPreviewViewWithMetricData } from 'types/graphs';
import { store as chartCreateStore } from 'forms/ChartCreate/store';
import { workDataStore } from 'store';
import { populatePreviewWithMetrics } from 'tools/graphTools';
import { useCompanyMetrics } from './useCompanyMetrics';
import { useCompaniesMetrics } from './useCompaniesMetrics';
import { useCreatedGraphPreview } from './useCreatedGraphPreview';

type DataType = GraphPreviewViewWithMetricData;
type Result = FetchHookResult<DataType>;

export const useCreatedGraphPreviewDeps = (forPortfolio: boolean): Result => {
  const { companyId } = workDataStore;
  const { pcIds } = chartCreateStore.data;
  const {
    data: companyMetrics,
    isLoading: companyMetricsLoading,
  } = useCompanyMetrics(forPortfolio ? 0 : companyId);
  const {
    data: portfolioMetrics,
    isLoading: portfolioMetricsLoading,
  } = useCompaniesMetrics(forPortfolio ? pcIds : []);
  const {
    data: graphPreviewData,
    isLoading: graphPreviewDataLoading,
    hasError: graphPreviewDataError,
  } = useCreatedGraphPreview(forPortfolio);
  const previewData = useMemo(() => {
    return {
      metrics: forPortfolio ? portfolioMetrics : companyMetrics,
      loading: forPortfolio ? portfolioMetricsLoading : companyMetricsLoading,
    };
  }, [
    companyMetrics,
    companyMetricsLoading,
    forPortfolio,
    portfolioMetrics,
    portfolioMetricsLoading,
  ]);

  const data = useMemo(() => {
    if (!previewData.metrics || previewData.loading) return null;
    if (!graphPreviewData || graphPreviewDataLoading) return null;

    return populatePreviewWithMetrics({
      previewData: graphPreviewData,
      metrics: previewData.metrics as Metric[],
    });
  }, [
    graphPreviewData,
    graphPreviewDataLoading,
    previewData.loading,
    previewData.metrics,
  ]);

  return {
    data,
    isLoading: previewData.loading || graphPreviewDataLoading,
    hasError: graphPreviewDataError,
  };
};
