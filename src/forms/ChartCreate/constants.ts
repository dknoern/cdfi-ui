import { GraphType, LegendPositionName, PositionsConfig } from 'types/graphs';
import { MetricSharePeriod } from 'types/metricSharePeriod';
import { EquationFormatNames, StoreData } from './types';

export const stepInfo = [
  {
    key: 'selectTemplate',
    title: 'Template/New',
  },
  {
    key: 'generalInfo',
    title: 'General Information',
  },
  {
    key: 'selectMetrics',
    title: 'Select Metrics',
  },
  {
    key: 'addEquations',
    title: 'Add Formulas',
  },
  {
    key: 'formatTable',
    title: 'Format Table',
  },
  {
    key: 'formatChart',
    title: 'Format Chart',
  },
];

const formatChartDefaultConfig = {
  axisLabel: '',
  boundMax: undefined,
  boundMin: undefined,
  gridHorizontal: true,
  gridVertical: false,
  legend: true,
  legendPosition: PositionsConfig.BOTTOM_LEFT,
  options: {},
};

export const storeInitialValues: StoreData = {
  name: '',
  description: '',
  type: GraphType.TABLE,
  frequency: MetricSharePeriod.ANNUALLY,
  periodEnd: {
    year: new Date().getFullYear(),
    quarter: 2,
  },
  periodStart: {
    year: new Date().getFullYear(),
    quarter: 1,
  },
  pcIds: [],
  titles: [],
  equations: [],
  metrics: [],
  formatChart: formatChartDefaultConfig,
};

export const legendPositionName: LegendPositionName = {
  [PositionsConfig.TOP_LEFT]: 'Top left',
  [PositionsConfig.TOP_RIGHT]: 'Top right',
  [PositionsConfig.BOTTOM_LEFT]: 'Bottom left',
  [PositionsConfig.BOTTOM_RIGHT]: 'Bottom right',
};

export const equationFormatNames: EquationFormatNames = {
  NUMBER: 'Number',
  DOLLAR: 'Currency',
  PERCENTAGE: 'Percentage',
};

export const formName = 'ChartSetup';
