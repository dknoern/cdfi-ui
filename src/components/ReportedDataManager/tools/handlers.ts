import { Metric } from 'types';
import { ReportingPeriod } from 'types/reportedData';
import {
  UpdateValueFormData,
  FormData4MVCR,
  MetricValue,
  MetricValueChangeRequest,
} from 'types/metricValue';
import { uiText } from 'constants/uiText';
import { notifyUser, metricTypeCheckers } from 'tools';
import { RequestConfig } from '../types';

interface FormDataSetter {
  (data: UpdateValueFormData): void;
}

export const editValue = (metrics: Metric[], setFormData: FormDataSetter) => ({
  metricId,
  period,
  value,
}: {
  metricId: Metric['id'];
  period: ReportingPeriod;
  value: MetricValue;
}): void => {
  const metric = metrics.find((metricItem) => metricItem.id === metricId);

  if (!metric) {
    notifyUser.warning(uiText('reportedData', 'metricDeleted'));
    return;
  }

  let oldValue = value;
  if (metricTypeCheckers.isNumericMetric(metric)) {
    oldValue = (value as string).replace(/,/g, ''); // remove formatting
    oldValue = oldValue.replace(/\(([0-9.]+)\)/i, '-$1'); // convert negative representation to number
  }

  // start modal with Data edit and change history
  setFormData({
    period,
    oldValue,
    metric,
  });
};

interface FormDataSetter4RequestManager {
  (data: FormData4MVCR): void;
}
export const manageRequest = (
  requests: MetricValueChangeRequest[],
  setFormData: FormDataSetter4RequestManager,
) => ({ metricId, period }: RequestConfig): void => {
  if (requests.length < 1 || !metricId || !period) return;

  const request = requests?.find(
    (item) =>
      item.metricId === metricId &&
      item.period.year === period.year &&
      item.period.quarter === period.quarter,
  );

  if (!request) {
    notifyUser.error(`There is no request for this metric and period`);
    return;
  }

  setFormData({
    metricId,
    name: request.metricName,
    value: request.newValue,
    reason: request.requestReason ?? '',
    requestId: request.requestId,
    period,
    companyId: request.companyId,
  });
};
