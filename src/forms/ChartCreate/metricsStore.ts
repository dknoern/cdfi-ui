import { decorate, observable, action, computed } from 'mobx';
import { GlobalMetric } from 'types';
import { ExistingMetric } from 'types/customDataTable';
import { Log } from 'tools';

class MetricsStore {
  ready = false;

  metrics: GlobalMetric[] = [];

  setMetrics = (metrics: GlobalMetric[]): void => {
    Log.log('[MetricsStore] Set metrics', metrics);

    this.metrics = metrics;
    this.ready = true;
  };

  reset = (): void => {
    Log.log('[MetricsStore] Reset');

    this.metrics = [];
    this.ready = false;
  };

  safe2UseFrom = <T extends ExistingMetric>(metrics: T[]): T[] => {
    if (metrics.find((item) => !this.metricsMap.has(item.id))) {
      return metrics.filter((item) => this.metricsMap.has(item.id));
    }

    return metrics;
  };

  get metricsMap(): Map<GlobalMetric['id'], GlobalMetric> {
    return new Map(this.metrics.map((item) => [item.id, item]));
  }
}

decorate(MetricsStore, {
  ready: observable,
  metrics: observable,
  setMetrics: action,
  reset: action,
  metricsMap: computed,
});

export const metricsStore = new MetricsStore();
