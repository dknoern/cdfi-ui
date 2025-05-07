import { autorun } from 'mobx';
import { uiText } from 'constants/uiText';
import { showAPIError } from 'tools/APITools';
import { ManagerDefault } from './ManagerDefault';
import { AggregatedMetric } from '../../types';
import {
  createEquation,
  deleteEquation,
  loadGlobalAggregatedMetrics,
  updateEquation,
} from '../operations/equationOperations';

export class AggregatedMetricsManager extends ManagerDefault<
  AggregatedMetric[]
> {
  metricConfig: Record<AggregatedMetric['id'], AggregatedMetric> = {};

  constructor() {
    super();

    autorun(() => {
      if (Array.isArray(this.store.data)) {
        this.metricConfig = Object.fromEntries(
          new Map(this.store.data.map((item) => [item.id, item])),
        );
      }
    });
  }

  reloadAggregatedMetrics = (equationType?: string): void => {
    this.proceedReload(
      () => loadGlobalAggregatedMetrics(equationType),
      showAPIError(uiText('metrics', 'loadError')),
    );
  };

  createAggregatedMetric: typeof createEquation = (data) => {
    return createEquation(data);
  };

  updateAggregatedMetric: typeof updateEquation = (data) => {
    return updateEquation(data);
  };

  deleteAggregatedMetric: typeof deleteEquation = (metricId) => {
    return deleteEquation(metricId);
  };
}
