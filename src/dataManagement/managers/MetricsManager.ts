import { autorun } from 'mobx';
import {
  Metric,
  GlobalMetric,
  AssignedMetric,
  MetricSharePeriod,
  Portfolio,
  Company,
  CompanyMetric,
} from 'types';
import { ReportingPeriod } from 'types/reportedData';
import {
  MetricValueChangeRequestView,
  MetricValueChangeRequest,
} from 'types/metricValue';
import { uiText } from 'constants/uiText';
import { apiProcessor } from 'tools';
import { showAPIError } from 'tools/APITools';
import { uiStore } from 'store';
import { loadMetrics} from 'dataManagement/operations/metricOperations';
import { ManagerDefault } from './ManagerDefault';


// TODO on back-end
const convertMVCRPeriodFormat = (
  items: MetricValueChangeRequestView[],
): MetricValueChangeRequest[] => {
  const correctPeriod = (periodStr: string): ReportingPeriod => {
    const [quarter, year] = periodStr.slice(1).split('-', 2).map(Number);

    return { year, quarter: quarter as ReportingPeriod['quarter'] };
  };
  return items.map((item) => ({ ...item, period: correctPeriod(item.period) }));
};

export class MetricsManager extends ManagerDefault<Metric[]> {
  metricConfig: Record<Metric['id'], Metric> = {};

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

  reload = (cdfiId?: number): void => {
    this.proceedReload(
      () => loadMetrics(cdfiId),
      showAPIError(uiText('metrics', 'loadError')),
    );
  };

  saveGlobalMetric = (
    metric: Omit<AssignedMetric, 'id' | 'status' | 'frequency'>,
  ): Promise<void> => {
    const OPERATION = 'createGlobalMetric';

    uiStore.addLoading(OPERATION);
    return apiProcessor.post(OPERATION, null, metric).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  updateGlobalMetric = (
    metric: Omit<AssignedMetric, 'status' | 'frequency'>,
  ): Promise<void> => {
    const OPERATION = 'updateGlobalMetric';

    uiStore.addLoading(OPERATION);

    return apiProcessor.patch(OPERATION, null, metric).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  updateGlobalMetricsBatch = (metrics: {
    metricIds: Metric['id'][];
    parentId?: Metric['parentId'];
    grandParentId?: Metric['grandParentId'];
    tags?: Metric['tags'];
  }): Promise<void> => {
    const OPERATION = 'updateGlobalMetricsBatch';

    uiStore.addLoading(OPERATION);

    return apiProcessor.patch(OPERATION, null, metrics).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  // if only 1 company -> returned type is CompanyMetric
  getByCompanies = (
    companyIds: Company['id'][],
  ): Promise<GlobalMetric[] | CompanyMetric[]> => {
    const OPERATION = 'metricsByCompaniesV2';

    return apiProcessor.get(OPERATION, companyIds.join(','));
  };

  getMetricValueChangeRequests = (
    companyId: number | null,
  ): Promise<MetricValueChangeRequest[]> => {
    const OPERATION = 'listMetricValueChangeRequests';

    return apiProcessor.get(OPERATION, companyId).then(convertMVCRPeriodFormat);
  };

  getByCompany = (companyId: number): Promise<AssignedMetric[]> => {
    const OPERATION = 'metricsByCompaniesV2';

    return apiProcessor.get(OPERATION, companyId);
  };

  approveMetricValueChangeRequest = (
    requestId: number,
  ): Promise<{ message: string }> => {
    const OPERATION = 'approveMetricValueChangeRequest';

    return apiProcessor.post(OPERATION, requestId);
  };

  declineMetricValueChangeRequest = (
    requestId: number,
  ): Promise<{ message: string }> => {
    const OPERATION = 'declineMetricValueChangeRequest';

    return apiProcessor.post(OPERATION, requestId);
  };

  getByPortfolio = (
    portfolioId: Portfolio['id'],
  ): Promise<AssignedMetric[]> => {
    const OPERATION = 'portfolioMetrics';

    return apiProcessor.get(OPERATION, portfolioId);
  };

  updateMetric = (
    metric: Omit<AssignedMetric, 'status'>,
    companyId: number,
  ): Promise<void> => {
    const OPERATION = 'updateMetricV2';

    uiStore.addLoading(OPERATION);

    return apiProcessor.patch(OPERATION, companyId, metric).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  updateMetricsBatch = (
    metrics: {
      metricIds: Metric['id'][];
      frequency?: MetricSharePeriod;
      parentId?: Metric['parentId'];
      grandParentId?: Metric['grandParentId'];
      tags?: Metric['tags'];
    },
    companyId: number,
  ): Promise<void> => {
    const OPERATION = 'updateMetricsBatch';

    uiStore.addLoading(OPERATION);

    return apiProcessor.patch(OPERATION, companyId, metrics).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  saveMetric = (
    metric: Omit<AssignedMetric, 'id' | 'status'>,
    companyId: number,
  ): Promise<void> => {
    const OPERATION = 'createMetricV2';

    uiStore.addLoading(OPERATION);

    return apiProcessor.post(OPERATION, companyId, metric).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  assignMetricsToPC = (
    metrics: Pick<AssignedMetric, 'id'>[],
    companyId: number,
  ): Promise<void> => {
    const OPERATION = 'assignMetricsToPC';

    uiStore.addLoading(OPERATION);

    return apiProcessor.post(OPERATION, companyId, metrics).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  delete = ({
    metricIds,
    companyId,
  }: {
    metricIds: Metric['id'][];
    companyId?: Company['id'];
  }): Promise<void> => {
    const OPERATION = 'metricsDeleteV2';

    uiStore.addLoading(OPERATION);

    return apiProcessor
      .delete(OPERATION, { metricIds: metricIds.join(','), companyId })
      .finally(() => {
        uiStore.endLoading(OPERATION);
      });
  };

  getCdfiMetricsDataset = (
    cdfiId: number,
    dataset: string,
    showAllYears?: boolean | null,
  ): Promise<Metric[]> => {
    const OPERATION = 'cdfiMetricsData';

    return apiProcessor.get(OPERATION, {
      cdfiId: cdfiId,
      dataset: dataset,
      showAllYears: showAllYears,
    });
  };
}
