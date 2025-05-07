import { MetricSharePeriod } from './metricSharePeriod';
import { ReportingPeriod } from './reportedData';
import { Nullable } from './utility';
import { Metric } from './metric';
import { Equation } from './equation';
import { Company } from './company';

// Utility
export type WithValues<T> = T & { values: ReportedDataMetricValue[] };
export type WithPcId<T> = T & { pcId: Company['id'] };
export type WithOrder<T> = T & { order: Nullable<number> };
export type WithNew<T> = T & { new: boolean };

// Base

export type ReportedDataPeriodBase = ReportingPeriod;
export type ReportedDataMetricBase4Company = {
  id: Metric['id'];
  order: Nullable<number>;
};
export type ReportedDataMetricBase4Portfolio = WithPcId<
  ReportedDataMetricBase4Company
>;
export type ReportedDataMetricBase =
  | ReportedDataMetricBase4Company
  | ReportedDataMetricBase4Portfolio;

export type ReportedDataEquationBase = WithNew<WithOrder<Equation>>;

export type ReportedDataBase = {
  frequency: MetricSharePeriod;
  periodStart: Nullable<ReportedDataPeriodBase>;
  periodEnd: Nullable<ReportedDataPeriodBase>;
  metrics: ReportedDataMetricBase[];
  equations: ReportedDataEquationBase[];
};

// Request Data
export type ReportedDataRequestData = ReportedDataBase;

// With data

export type ReportedDataMetricValue = {
  period: ReportingPeriod;
  value: number | string | null;
};

export type ReportedDataPeriod = ReportedDataPeriodBase;

export type ReportedDataMetric4Company = WithValues<
  ReportedDataMetricBase4Company
>;
export type ReportedDataMetric4Portfolio = WithValues<
  ReportedDataMetricBase4Portfolio
>;
export type ReportedDataMetric =
  | ReportedDataMetric4Company
  | ReportedDataMetric4Portfolio;

export type ReportedDataEquation4Company = WithValues<ReportedDataEquationBase>;
export type ReportedDataEquation4Portfolio = WithPcId<
  ReportedDataEquation4Company
>;
export type ReportedDataEquation =
  | ReportedDataEquation4Company
  | ReportedDataEquation4Portfolio;

export type ReportedData = Omit<ReportedDataBase, 'metrics' | 'equations'> & {
  periods: ReportedDataPeriod[];
  metrics: ReportedDataMetric[];
  equations: ReportedDataEquation[];
};

// Processed for displaying

export type ReportedDataPeriodView = string;

export type ReportedDataMetricValueView4Company = Omit<
  ReportedDataMetricValue,
  'period'
> & {
  period: ReportedDataPeriodView;
};
export type ReportedDataMetricValueView4Portfolio = Omit<
  ReportedDataMetricValue,
  'period'
> & {
  period: ReportedDataPeriodView;
};
export type ReportedDataMetricValueView =
  | ReportedDataMetricValueView4Company
  | ReportedDataMetricValueView4Portfolio;

export type ReportedDataMetricView4Company = Omit<
  ReportedDataMetric4Company,
  'values'
> & {
  values: ReportedDataMetricValueView4Company[];
};
export type ReportedDataMetricView4Portfolio = Omit<
  ReportedDataMetric4Portfolio,
  'values'
> & {
  values: ReportedDataMetricValueView4Portfolio[];
};

export type ReportedDataMetricView =
  | ReportedDataMetricView4Company
  | ReportedDataMetricView4Portfolio;

export type ReportedDataEquationView4Company = Omit<
  ReportedDataEquation4Company,
  'values'
> & {
  values: ReportedDataMetricValueView4Company[];
};
export type ReportedDataEquationView4Portfolio = Omit<
  ReportedDataEquation4Portfolio,
  'values'
> & {
  values: ReportedDataMetricValueView4Portfolio[];
};
export type ReportedDataEquationView =
  | ReportedDataEquationView4Company
  | ReportedDataEquationView4Portfolio;

// Utility for making UI types
export type ForView<T extends ReportedData> = Omit<
  T,
  'periods' | 'metrics' | 'equations'
> & {
  periods: ReportedDataPeriodView[];
  metrics: ReportedDataMetricView[];
  equations: ReportedDataEquationView[];
};

export type ReportedDataView = ForView<ReportedData>;
