import { useState, useEffect } from 'react';
import { DataHookResult, Tag, GlobalMetric } from 'types';
import { useCompaniesMetrics } from 'dataManagement';
import { extractTags } from 'tools/tagsTool';
import { metricDependenciesStore } from 'store';
import { MetricTableDataItem } from '../types';

interface UseMetricDepsResult extends DataHookResult {
  data: MetricTableDataItem[] | null;
}

const convertMetrics = (
  metrics: GlobalMetric[],
  tags: Tag[],
): MetricTableDataItem[] => {
  return metrics.map<MetricTableDataItem>((metric) => {
    return {
      ...metric,
      type: metric.typeConfig.type,
      tags:
        metric.tags?.map(
          (tagId) => tags.find((tag) => tag.id === tagId) as Tag,
        ) || [],
    };
  });
};

export const useMetricDeps = (companyIds?: number[]): UseMetricDepsResult => {
  const {
    data: metrics,
    isLoading: isMetricsLoading,
    hasError: isMetricsError,
  } = useCompaniesMetrics(companyIds ?? []);
  const { allTagCategories: tags } = metricDependenciesStore;
  const [data, setData] = useState<UseMetricDepsResult['data']>(null);

  useEffect(() => {
    if (metrics && tags) {
      setData(convertMetrics(metrics, extractTags(tags)));
    }
  }, [metrics, tags]);

  return {
    data,
    isLoading: isMetricsLoading,
    hasError: isMetricsError,
  };
};
