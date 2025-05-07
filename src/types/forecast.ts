import React from 'react';
import { ReportingPeriod } from './reportedData';
import { MetricTypeConfig } from './metric';
import { MetricSharePeriod } from './metricSharePeriod';
import { Company } from './company';
import { SortableItem } from './misc';
import {
  ExistingMetric,
  EquationInfo,
  MetricOrEquationId,
} from './customDataTable';
import { GraphType } from './graphs';

export type ForecastMethod = 'MANUAL' | 'GROWTH' | 'FORMULA';

export interface ForecastValueItem {
  period: ReportingPeriod;
  value: number;
}

// a "row" of provided data (e.g. one metric values)
export interface WithData {
  forecastMethod: ForecastMethod;
  formulaId?: number;
  values?: ForecastValueItem[];
}

export enum ForecastCellType {
  FORECAST_DATA = 'FORECAST_DATA',
  ACTUAL_DATA = 'ACTUAL_DATA',
  DIFFERENCE = 'DIFFERENCE',
}

type ForecastDataItemBase = WithData & SortableItem;
type ForecastDataItemFrom<T> = T & ForecastDataItemBase;
export type Metric4Forecast = ForecastDataItemFrom<ExistingMetric>;
export type Equation4Forecast = ForecastDataItemFrom<EquationInfo>;
export type ForecastDataItem = Metric4Forecast | Equation4Forecast;
export const isEquation = (
  item: ForecastDataItem | EquationInfo | ExistingMetric,
): item is EquationInfo => {
  return (item as Equation4Forecast).formula !== undefined;
};

// request POST/PATCH
// the same for GET Forecast
export interface Forecast {
  id: number;
  name: string;
  description: string;
  frequency: MetricSharePeriod;
  periodStart: ReportingPeriod;
  periodEnd: ReportingPeriod;
  metrics: Metric4Forecast[];
  equations: Equation4Forecast[];
}

// request for preview data
export interface PreviewTableGetParams {
  frequency: MetricSharePeriod;
  periodStart: ReportingPeriod;
  periodEnd: ReportingPeriod;
  companyId: Company['id'];
  metrics: ExistingMetric[];
  equations: EquationInfo[];
}

export type PreviewTableGetResult = Omit<
  Forecast,
  'id' | 'name' | 'description'
>;

// only for Forecasts-related components
export type MetricOrEquation = ExistingMetric | EquationInfo;

export interface IndexedValues {
  [key: string]: any; // number for table values, but key can be string
}

export type TableRecordType = MetricOrEquationId & {
  name: string;
  typeConfig: MetricTypeConfig;
  isForecast?: boolean;
  isDiff?: boolean;
  isGroup?: boolean;
  isChild?: boolean;
  cellType?: ForecastCellType;
  key: React.Key;
} & IndexedValues;

export type ForecastFormData = Omit<Forecast, 'id'> &
  Partial<Pick<Forecast, 'id'>>;

export type ForecastEditType = ForecastFormData & { pcId: Company['id'] };

export type EditableFields = Exclude<keyof ForecastFormData, 'id'>;

// preview used for a list
export type ForecastCard = Pick<Forecast, 'id' | 'name' | 'description'>;

export type ForecastCellUpdateData = {
  period: ReportingPeriod;
  value: number | undefined;
} & MetricOrEquationId;

export interface ForecastCellUpdater {
  (props: ForecastCellUpdateData): void;
}

export type ForecastExportSettings = {
  pcId: Company['id'];
  setId?: Forecast['id'];
  chartType: GraphType;
};
