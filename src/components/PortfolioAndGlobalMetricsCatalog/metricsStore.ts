import { decorate, observable, action } from 'mobx';
import { MetricSharePeriod, GlobalMetric, AssignedMetric, Metric } from 'types';

export type StoreMetric = Omit<AssignedMetric, 'status'>;

class CatalogMetricsStore {
  globalMetrics: StoreMetric[] = [];

  portfolioMetrics: StoreMetric[] = [];

  selectedIds: Metric['id'][] = [];

  init = (
    globalMetrics: GlobalMetric[],
    portfolioMetrics: StoreMetric[],
  ): void => {
    const globalMetricsData = globalMetrics.map((item) => ({
      ...item,
      frequency: MetricSharePeriod.QUARTERLY,
    }));
    this.globalMetrics = globalMetricsData;
    this.portfolioMetrics = portfolioMetrics;
  };

  setGlobalMetricData = (data: StoreMetric[]): void => {
    this.globalMetrics = data;
  };

  setPortfolioMetricData = (data: StoreMetric[]): void => {
    this.portfolioMetrics = data;
  };

  setSelectedIds = (ids: Metric['id'][]): void => {
    this.selectedIds = ids;
  };
}

decorate(CatalogMetricsStore, {
  portfolioMetrics: observable,
  globalMetrics: observable,
  selectedIds: observable,
  init: action,
  setGlobalMetricData: action,
  setPortfolioMetricData: action,
});

export const metricsStore = new CatalogMetricsStore();
