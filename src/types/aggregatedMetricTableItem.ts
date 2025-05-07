export enum MetricColumns {
  NAME = 'name',
  METRICS = 'metrics',
}

export type MetricColumnWidth = {
  [key in MetricColumns]?: string;
};
