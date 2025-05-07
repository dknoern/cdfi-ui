import { decorate, observable, computed, action } from 'mobx';
import { VoidFn, Metric, SelectOptions } from 'types';
import { GraphType } from 'types/graphs';
import { GraphData } from 'types/forecastData';
import {
  ForecastFormData,
  PreviewTableGetResult,
  PreviewTableGetParams,
  Equation4Forecast,
  Metric4Forecast,
  ForecastDataItem,
  isEquation,
  ForecastValueItem,
  ForecastCellUpdater,
} from 'types/forecast';
import { MetricRowItem } from 'types/metricTableItem';
import { DataItemType, SortableListItem } from 'types/customDataTable';
import { ReportingPeriod } from 'types/reportedData';
import { sortByOrder, notifyUser } from 'tools/index';
import {
  prettifyPeriod,
  period2DataIndex,
  periodRange2PeriodArray,
} from 'tools/reportedData';
import { reportedData } from 'dataManagement/reportedData';
import { metrics as metricsManager } from 'dataManagement/metrics';
import { workDataStore } from 'store';
import { extractPureId, prefixId, valueItems2object } from './tools';

export class CustomTableWorker<T extends ForecastFormData> {
  data: T | null = null;

  reportedData: PreviewTableGetResult | null = null;

  metricData: Map<Metric['id'], MetricRowItem> | null = null;

  activeItemId: string | null = null;

  chartViewMode: GraphType = GraphType.COLUMN;

  initWithData = (data: T): void => {
    this.data = data;

    if (this.dataItems.length) {
      this.loadReportedData();
      this.loadMetricData();
    }
  };

  reset = (): void => {
    this.data = null;
    this.reportedData = null;
    this.metricData = null;
  };

  setMetricData = (data: MetricRowItem[]): void => {
    this.metricData = new Map(data.map((item) => [item.id, item]));
  };

  loadReportedData: VoidFn = () => {
    this.reportedData = null;

    reportedData
      .getReportedDataV2(this.previewConfig)
      .then((data) => {
        this.reportedData = data;
      })
      .catch((e) => {
        notifyUser.error('forecasts', 'forecastDataLoadError');
        this.reportedData = null;
      });
  };

  loadMetricData: VoidFn = () => {
    metricsManager
      .getByCompanies([workDataStore.companyId])
      .then(this.setMetricData)
      .catch((e) => {
        notifyUser.error('forecasts', 'forecastDataLoadError');
        this.metricData = null;
      });
  };

  setActiveItemId = (id: string | null): void => {
    this.activeItemId = id;
  };

  setForecast: ForecastCellUpdater = (props) => {
    if (!this.data) return;

    const { metricId, equationId, period, value } = props;
    const dataGroup = metricId ? 'metrics' : 'equations';
    const dataItemId = metricId || equationId;
    const dataItemIndex = this.data[dataGroup].findIndex(
      (item) => item.id === dataItemId,
    );

    // we need to know
    // if there is a forecast for this period and metric/equation
    const values = (this.data[dataGroup][dataItemIndex].values ?? []).slice(); // use copy to update observable
    const periodIndexed = period2DataIndex(period);
    const existingItemIndex = values.findIndex(
      (item) => period2DataIndex(item.period) === periodIndexed,
    );
    const exists = existingItemIndex > -1;

    // if there is no forecast, and you
    // try to set new undefined / wrong
    // -> you don't need to do update anything
    if (!exists && value === undefined) return;

    if (value === undefined) {
      // delete
      values.splice(existingItemIndex, 1);
    } else {
      // modify existing or add new one
      values.splice(exists ? existingItemIndex : 0, exists ? 1 : 0, {
        period,
        value,
      });
    }

    // replace old data item entire
    this.data[dataGroup].splice(dataItemIndex, 1, {
      ...this.data[dataGroup][dataItemIndex],
      values,
    });
  };

  setChartViewMode = (mode: GraphType): void => {
    this.chartViewMode = mode;
  };

  get dataItems(): ForecastDataItem[] {
    if (!this.data) return [];

    return ([] as ForecastDataItem[])
      .concat(this.data.equations)
      .concat(this.data.metrics)
      .sort(sortByOrder);
  }

  get selectorValues(): SelectOptions<string> {
    return this.sortingItems.sort(sortByOrder).map((item) => ({
      label: item.name,
      value: prefixId(item.id, item.type),
    }));
  }

  get activeItem(): ForecastDataItem | null {
    if (!this.data || !this.activeItemId) return null;

    const itemType =
      this.activeItemId.indexOf(DataItemType.Equation) === 0
        ? DataItemType.Equation
        : DataItemType.Metric;
    let dataGroup = this.data.metrics;
    if (itemType === DataItemType.Equation) dataGroup = this.data.equations;

    const itemId = extractPureId(this.activeItemId, itemType);

    return dataGroup.find((item) => item.id === itemId) ?? null;
  }

  get itemReportedValues(): ForecastValueItem[] {
    if (!this.reportedData || !this.activeItem) return [];

    let dataGroup = this.reportedData.metrics;
    if (isEquation(this.activeItem)) {
      dataGroup = this.reportedData.equations;
    }
    const dataItem = dataGroup.find((item) => item.id === this.activeItem?.id);

    return dataItem ? dataItem.values ?? [] : [];
  }

  get previewConfig(): PreviewTableGetParams {
    const { frequency, periodStart, periodEnd, metrics, equations } = this
      .data as ForecastFormData;

    return {
      companyId: workDataStore.companyId,
      frequency,
      periodStart,
      periodEnd,
      metrics,
      equations,
    };
  }

  get periodsArray(): ReportingPeriod[] {
    if (!this.data) return [];

    const { periodStart, periodEnd, frequency } = this.data;

    return periodRange2PeriodArray(periodStart, periodEnd, frequency);
  }

  get periodTitles(): string[] {
    return this.periodsArray.map((period) => prettifyPeriod(period));
  }

  get metricNames(): Map<Metric['id'], Metric['name']> {
    if (!this.metricData) return new Map();

    return new Map(
      Array.from(this.metricData.values()).map((item) => [
        item.id,
        item.name ?? '',
      ]),
    );
  }

  get sortingItems(): SortableListItem[] {
    if (!this.data || !this.metricData) return [];

    const injectType = <T>(type: DataItemType) => (
      dataItem: T,
    ): T & { type: DataItemType } => ({ ...dataItem, type });

    const injectTypeE = injectType<Equation4Forecast>(DataItemType.Equation);
    const injectTypeM = injectType<Metric4Forecast>(DataItemType.Metric);

    return ([] as SortableListItem[])
      .concat(this.data.equations.map(injectTypeE))
      .concat(
        this.data.metrics.map(injectTypeM).map((item) => ({
          ...item,
          name: this.metricNames.get(item.id) as string,
        })),
      );
  }

  get maxOrder(): number {
    if (!this.data) return 0;

    return this.sortingItems.reduce(
      (acc, item) => ((item.order ?? 0) > acc ? item.order ?? 0 : acc),
      0,
    );
  }

  get chartData(): GraphData | null {
    if (!this.data || !this.activeItem) return null;

    const datas: GraphData['datas'] = [];

    const actualsByPeriod = valueItems2object(this.itemReportedValues);
    const forecastsByPeriod = valueItems2object(this.activeItem.values ?? []);

    datas.push({
      label: 'Actual data',
      equationId: 0,
      companyValues: [],
      values: this.periodsArray.map(
        (period) => actualsByPeriod[period2DataIndex(period)],
      ),
    });
    datas.push({
      label: 'Forecast data',
      equationId: 0,
      companyValues: [],
      values: this.periodsArray.map(
        (period) => forecastsByPeriod[period2DataIndex(period)],
      ),
    });

    return {
      companyId: null,
      date: '',
      decimalPlaces: 2,
      graphId: 0,
      notes: '',
      title: 'Forecast',
      type: this.chartViewMode,
      columnHeaders: {
        label: '',
        values: this.periodTitles.map((value) => ({ value })),
      },
      datas,
      formatChart: {
        axisLabel: 'Value',
        legend: false,
        legendPosition: 'auto',
        gridVertical: false,
        gridHorizontal: false,
        options: {},
      },
    };
  }

  get isEmpty(): boolean {
    if (!this.data) return true;

    return this.data.metrics.length < 1 && this.data.equations.length < 1;
  }

  get dataIsReady(): boolean {
    return !!this.data && !!this.reportedData && !!this.metricData;
  }
}

decorate(CustomTableWorker, {
  data: observable,
  reportedData: observable,
  metricData: observable,
  activeItemId: observable,
  chartViewMode: observable,
  initWithData: action,
  reset: action,
  loadReportedData: action,
  setActiveItemId: action,
  setForecast: action,
  setChartViewMode: action,
  dataItems: computed,
  previewConfig: computed,
  periodsArray: computed,
  periodTitles: computed,
  metricNames: computed,
  sortingItems: computed,
  maxOrder: computed,
  chartData: computed,
  selectorValues: computed,
  itemReportedValues: computed,
  isEmpty: computed,
  dataIsReady: computed,
});
