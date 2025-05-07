import {
  Metric,
  MetricNumericFormat,
  MetricTypeConfig4Numeric,
} from './metric';
import { Equation } from './equation';
import { Company } from './company';
import {
  ForView,
  ReportedData,
  ReportedDataBase,
  ReportedDataEquationBase,
  ReportedDataEquationView,
  ReportedDataMetricBase,
  ReportedDataMetricView,
  ReportedDataMetricView4Portfolio,
  ReportedDataPeriod,
} from './reportedDataV2';
import { Nullable } from './utility';
import { Portfolio } from './portfolio';

export enum GraphType {
  LINE = 'LINE',
  COLUMN = 'COLUMN',
  COLUMN_STACKED = 'COLUMN_STACKED',
  TABLE = 'TABLE',
  PIE = 'PIE',
}

// Graph Meta
export type GraphMeta = {
  id: number;
  title: string;
  notes: string;
  graphType: GraphType;
  unitType: MetricNumericFormat;
};

// Format Chart
export enum PositionsConfig {
  TOP_RIGHT = 'top-right',
  BOTTOM_RIGHT = 'bottom-right',
  TOP_LEFT = 'top-left',
  BOTTOM_LEFT = 'bottom-left',
}

export enum PositionDirectionsConfig {
  LEFT_TO_RIGHT = 'left-to-right',
  RIGHT_TO_LEFT = 'right-to-left',
}

export type LegendPositionName = Record<PositionsConfig, string>;

export interface FormatChartConfig {
  axisLabel: string;
  boundMin?: number | 'auto';
  boundMax?: number | 'auto';
  legend: boolean;
  legendPosition: PositionsConfig | 'auto';
  gridVertical: boolean;
  gridHorizontal: boolean;
  options: {
    [key: string]: boolean | number | string;
  };
}

type WithGraphFields<T> = T & {
  name: string;
  description: string;
  type: GraphType;
  titles: unknown[];
  formatChart: FormatChartConfig;
};

// Base

export type GraphBase = WithGraphFields<ReportedDataBase>;

// With Data

export type Graph = WithGraphFields<ReportedData>;

// Graph Preview Request

export type GraphPreviewRequestData = GraphBase;

// Graph Preview

export type GraphPreview = Graph;

// Graph Preview for UI

export type GraphPreviewView = ForView<GraphPreview>;

export type GraphPreviewViewMetricDataItem = {
  id: ReportedDataMetricView['id'];
  name: Metric['name'];
  code?: Metric['accountCode'];
  format: MetricTypeConfig4Numeric['format'];
  decimals: MetricTypeConfig4Numeric['decimals'];
  order: ReportedDataMetricView['order'];
  pcId?: ReportedDataMetricView4Portfolio['pcId'];
  values: ReportedDataMetricView['values'];
};
export type GraphPreviewViewEquationDataItem = {
  id: ReportedDataEquationView['id'];
  name: Equation['name'];
  code?: Metric['accountCode'];
  format: MetricTypeConfig4Numeric['format'];
  decimals: MetricTypeConfig4Numeric['decimals'];
  order: ReportedDataEquationView['order'];
  pcId?: ReportedDataMetricView4Portfolio['pcId'];
  values: ReportedDataMetricView['values'];
};

export type GraphPreviewViewMetricEquationItemBase =
  | GraphPreviewViewMetricDataItem
  | GraphPreviewViewEquationDataItem;

export type GraphPreviewViewMetricEquationItem = {
  id: GraphPreviewViewMetricEquationItemBase['id'] | string;
  name: GraphPreviewViewMetricEquationItemBase['name'];
  code?: GraphPreviewViewMetricEquationItemBase['code'];
  format: GraphPreviewViewMetricEquationItemBase['format'];
  decimals: GraphPreviewViewMetricEquationItemBase['decimals'];
  order: GraphPreviewViewMetricEquationItemBase['order'];
  pcId?: GraphPreviewViewMetricEquationItemBase['pcId'];
  children?: GraphPreviewViewMetricEquationItem[];
  [key: string]: number | string | null | undefined | any;
};

export type GraphPreviewViewWithMetricData = Omit<
  GraphPreviewView,
  'metrics' | 'equations'
> & {
  metrics: GraphPreviewViewMetricDataItem[];
  equations: GraphPreviewViewEquationDataItem[];
};
export type GraphPreviewViewWithOnlyEquationsData = Omit<
  GraphPreviewView,
  'equations'
> & {
  equations: GraphPreviewViewEquationDataItem[];
};

// Graph Template
export type GraphTemplate = Omit<
  Graph,
  'metrics' | 'equations' | 'periodStart' | 'periodEnd' | 'periods'
> & {
  metrics: ReportedDataMetricBase[];
  equations: ReportedDataEquationBase[];
  pcIds: Company['id'][];
  periodStart: Nullable<Partial<ReportedDataPeriod>>;
  periodEnd: Nullable<Partial<ReportedDataPeriod>>;
};

// Graph Create
export type GraphSaveData = Omit<GraphTemplate, 'equations'> & {
  portfolioId: Portfolio['id'] | null;
  equations: (Omit<ReportedDataEquationBase, 'id'> & {
    id?: ReportedDataEquationBase['id'];
  })[];
};

// Export

export type ChartExportSettings = {
  pcId: Company['id'];
  portfolioId: Portfolio['id'];
  graphId?: GraphMeta['id'];
};
