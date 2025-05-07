import { Metric, Company } from 'types';
import { ReportingPeriod } from 'types/reportedData';
import { MetricValue } from 'types/metricValue';
import { uiText } from 'constants/uiText';
import { showAPIError, notifyUser } from 'tools';
import { reportedData as reportedDataManager } from 'dataManagement';

interface AdjustmentSaver {
  (props: {
    period: ReportingPeriod;
    metricId: Metric['id'];
    value: MetricValue;
    reason: string;
    oldValue: MetricValue;
    companyId: Company['id'];
  }): ReturnType<typeof reportedDataManager.saveMetricAdjustment>;
}
export const saveMetricAdjustment: AdjustmentSaver = ({
  period,
  metricId,
  value,
  reason,
  oldValue,
  companyId,
}) => {
  return reportedDataManager
    .saveMetricAdjustment({
      newValue: value,
      comment: reason,
      periodEndDate: period,
      metricId,
      oldValue,
      companyId,
    })
    .then((result) => {
      notifyUser.ok(uiText('perfMaps', 'inputSaveOk'));
      return result;
    })
    .catch((e) => {
      showAPIError(uiText('perfMaps', 'inputSaveError'))(e);
      throw e;
    });
};
