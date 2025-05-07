import { observable, action, decorate, computed, reaction } from 'mobx';
import { GlobalMetric, Portfolio, Company } from 'types';
import { GraphMeta } from 'types/graphs';
import { MetricRowItem } from 'types/metricTableItem';
import { SortableListItem, SwapFn, DataItemType } from 'types/customDataTable';
import { SortableItem } from 'types/misc';
import { ReportingPeriod } from 'types/reportedData';
import { uiText } from 'constants/uiText';
import { Log, notifyUser, showAPIError } from 'tools';
import { reportingPeriodPresented } from 'tools/reportingPeriodPresented';
import { metrics as metricsManager } from 'dataManagement/metrics';
import { workDataStore } from 'store';
import { StoreData, MetricTableDataItem } from './types';
import { storeInitialValues } from './constants';
import { extractAccountCodes } from './tools';
import { metricsStore } from './metricsStore';

class Store {
  graphId: GraphMeta['id'] | null = null;

  portfolioId: Portfolio['id'] | null = null;

  companyId: Company['id'] | null = null;

  templateId: GraphMeta['id'] | null = null;

  data: StoreData = storeInitialValues;

  dataLoaded = false;

  constructor() {
    reaction(
      () => this.templateId,
      () => {
        this.init();
        this.dataLoaded = false;
      },
    );
  }

  init = (): void => {
    Log.log('[ChartCreate store] init');
    this.data = storeInitialValues;
  };

  parseData = <K extends keyof StoreData, V extends StoreData[K]>(
    dataPart: K,
    value: V,
  ): void => {
    Log.log('[ChartCreate store] set', dataPart, value);
    this.data[dataPart] = value;
  };

  parseDataPart = <K extends keyof StoreData, V extends StoreData[K]>(
    dataPart: K,
    value: V,
  ): void => {
    Log.log('[ChartCreate store] set', dataPart, value);
    this.data[dataPart] = {
      ...(this.data[dataPart] as any),
      ...(value as any),
    };
  };

  reset = (): void => {
    Log.log('[ChartCreate store] Reset');

    this.data = storeInitialValues;
    this.templateId = null;
    this.dataLoaded = false;
  };

  setTemplateId = (id?: GraphMeta['id']): void => {
    this.templateId = id as number | null;
  };

  initWithData = (data: StoreData): void => {
    Log.log('[ChartCreate store] initWithData', data);
    try {
      const safeMetrics = metricsStore.safe2UseFrom(data.metrics);

      this.data = { ...data, metrics: safeMetrics };

      // TODO remove after backend fixes
      if (data.formatChart === null) {
        this.data.formatChart = storeInitialValues.formatChart;
      }
      this.dataLoaded = true;

      if (safeMetrics !== data.metrics) {
        notifyUser.warning(uiText('graphs', 'metricsUnsafe'));
      }
    } catch (e) {
      Log.error(e);
      notifyUser.error(uiText('graphs', 'templateApplyError'));
    }
  };

  // needed to init store on edit flow
  initMetricsStore = (): Promise<void> => {
    const { companyId } = workDataStore.viewModeConfig;

    return metricsManager
      .getByCompanies(companyId ? [companyId] : this.data.pcIds)
      .then(metricsStore.setMetrics)
      .catch(showAPIError(uiText('metrics', 'loadError')));
  };

  // TODO (implement for current flow)
  // remove metrics and equations if they are not available for
  // current set of metrics
  adaptMetricData = (availableMetrics: MetricTableDataItem[]): void => {
    Log.log('[ChartCreate store] adaptMetricData');

    if (availableMetrics.length < 1) {
      metricsStore.reset();
      this.data.equations = [];
      return;
    }

    const availableMetricIds = availableMetrics.map((item) => item.id);

    // calculate metrics which are not presented in loaded list
    const metricsToRemove: MetricTableDataItem['id'][] = [];
    const metricsToRemoveCodes: MetricTableDataItem['accountCode'][] = [];
    metricsStore.metrics.forEach((metricItem) => {
      if (!availableMetricIds.includes(metricItem.id)) {
        metricsToRemove.push(metricItem.id);
        metricsToRemoveCodes.push(metricItem.accountCode);
      }
    });

    if (metricsToRemove.length < 1) return;

    // array of metric codes which we will delete
    const searchEntries = [
      ...metricsToRemove.map((metricId) => String(metricId)),
      ...metricsToRemoveCodes,
    ];
    // find equations which use that metrics
    const equationsToRemove = this.data.equations
      .filter((eqItem) => {
        const usedCodes = extractAccountCodes(eqItem.formula);
        return searchEntries.some((code) => usedCodes.includes(code));
      })
      .map((eqItem) => eqItem.id);
    // and remove them
    if (equationsToRemove.length) {
      this.data.equations = this.data.equations.filter(
        (eqItem) => !equationsToRemove.includes(eqItem.id),
      );
    }

    // remove metrics
    metricsStore.setMetrics(
      metricsStore.metrics.filter(
        (metricItem) => !metricsToRemove.includes(metricItem.id),
      ),
    );
    Log.log('removed metrics:', metricsToRemove);
  };

  updateMetrics = (items: MetricRowItem['id'][]): void => {
    const orders = new Map(
      this.data.metrics.map((item) => [item.id, item.order]),
    );

    const currentMaxOrder = this.maxOrder;

    this.data.metrics = items.map((id, i) => ({
      id,
      order: orders.get(id) ?? currentMaxOrder + i,
    }));
  };

  getSortableItem = (sortableItem: SortableListItem): SortableItem => {
    const dataGroup =
      sortableItem.type === DataItemType.Equation ? 'equations' : 'metrics';
    const dataItemIndex = this.data[dataGroup].findIndex(
      (item) => item.id === sortableItem.id,
    );
    return this.data[dataGroup][dataItemIndex];
  };

  swapDataItems: SwapFn = (item1, item2) => {
    const item1pure = this.getSortableItem(item1);
    const item2pure = this.getSortableItem(item2);
    [item1pure.order, item2pure.order] = [item2pure.order, item1pure.order];
  };

  get templateLoaded(): boolean {
    return this.templateId !== null && this.dataLoaded;
  }

  get maxOrder(): number {
    return ([] as SortableItem[])
      .concat(this.data.equations)
      .concat(this.data.metrics)
      .reduce(
        (acc, item) => ((item.order ?? 0) > acc ? item.order ?? 0 : acc),
        0,
      );
  }

  get sortingItems(): SortableListItem[] {
    const metricNames = new Map(
      metricsStore.metrics.map((item) => [item.id, item.name]),
    );

    return ([] as SortableListItem[])
      .concat(
        this.data.equations.map((item) => ({
          ...item,
          type: DataItemType.Equation,
        })),
      )
      .concat(
        this.data.metrics.map((item) => ({
          ...item,
          name: metricNames.get(item.id) as string,
          type: DataItemType.Metric,
        })),
      );
  }

  get selectedMetrics(): GlobalMetric[] {
    if (!metricsStore.ready) return [];

    return this.data.metrics.map(
      (item) => metricsStore.metricsMap.get(item.id) as GlobalMetric,
    );
  }

  get periodStart(): ReportingPeriod | undefined {
    const { periodStart } = this.data;

    if (!reportingPeriodPresented(periodStart)) return undefined;

    return periodStart as ReportingPeriod;
  }

  get periodEnd(): ReportingPeriod | undefined {
    const { periodEnd } = this.data;

    if (!reportingPeriodPresented(periodEnd)) return undefined;

    return periodEnd as ReportingPeriod;
  }
}

decorate(Store, {
  data: observable,
  templateId: observable,
  dataLoaded: observable,
  parseData: action,
  init: action,
  reset: action,
  setTemplateId: action,
  initWithData: action,
  adaptMetricData: action,
  templateLoaded: computed,
  maxOrder: computed,
  updateMetrics: action,
  swapDataItems: action,
  selectedMetrics: computed,
  sortingItems: computed,
  periodStart: computed,
  periodEnd: computed,
});

export const store = new Store();
