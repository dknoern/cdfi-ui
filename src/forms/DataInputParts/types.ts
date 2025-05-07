import { FormProps } from 'antd/lib/form';
import { Metric } from 'types';
import { MetricChangeHistory } from 'types/metricHistory';

export interface UpdateValueFormProps {
  metric: Metric;
  onFinish: FormProps['onFinish'];
  formId: string;
  changesHistory: MetricChangeHistory[];
}

export interface ValueFieldProps {
  metric: Metric;
  nameField: React.ReactNode;
}
