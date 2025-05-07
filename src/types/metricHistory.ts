export type MetricChangeHistory = {
  id: string;
  action: string;
  created: string;
  newValue: string | number;
  oldValue: string | number;
  period: string;
  personName: string;
  reason: string;
};
