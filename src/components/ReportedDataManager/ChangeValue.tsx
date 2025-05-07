import React, { FC, useEffect, useState, useCallback } from 'react';
import { Store } from 'antd/lib/form/interface';
import { Company, VoidFn } from 'types';
import { MetricChangeHistory } from 'types/metricHistory';
import { UpdateValueFormData } from 'types/metricValue';
import { formatDateTime } from 'tools';
import { showAPIError } from 'tools/APITools';
import { uiText } from 'constants/uiText';
import { reportedData as reportedDataManager } from 'dataManagement';
import { userStore } from 'store';
import { ModalWithForm } from 'modals';
import { ChangeValueForm } from 'forms/DataInputParts';
import { saveMetricAdjustment } from './tools';

const FORM_ID = 'METRIC_VALUE_CHANGE';

type ChangeValueProps = {
  formData: UpdateValueFormData | null;
  onCancel: VoidFn;
  onFinish: VoidFn;
  companyId?: Company['id'];
};

export const ChangeValue: FC<ChangeValueProps> = ({
  formData,
  onCancel,
  onFinish,
  companyId,
}) => {
  const [metricChangeHistory, setMetricChangeHistory] = useState<
    MetricChangeHistory[]
  >([]);

  const usedCompanyId = companyId || userStore.info.companyId;

  useEffect(
    () => (): void => {
      if (!formData) {
        setMetricChangeHistory([]);
      }
    },
    [formData],
  );

  useEffect(() => {
    if (formData && !!formData.oldValue) {
      // add request history
      reportedDataManager
        .getMetricChangeHistory({
          companyId: usedCompanyId,
          metricId: formData.metric.id,
          periodEndDate: formData.period,
        })
        .then((result) => {
          setMetricChangeHistory(
            result.map((item) => ({
              ...item,
              id: `${item.personName}--${item.created}`,
              created: formatDateTime(item.created),
            })),
          );
        })
        .catch((e) => {
          showAPIError(uiText('perfMaps', 'historyLoadingError'))(e);
        });
    }
  }, [formData, usedCompanyId]);

  const handleRequestChange = useCallback(
    (values: Store): void => {
      if (!formData) {
        return;
      }

      saveMetricAdjustment({
        value: values.value,
        reason: values.reason,
        period: formData.period,
        metricId: formData.metric.id,
        oldValue: formData.oldValue,
        companyId: usedCompanyId,
      })
        .then(onFinish)
        .catch((e) => {
          onCancel();
        });
    },
    [formData, usedCompanyId, onFinish, onCancel],
  );

  return (
    <ModalWithForm
      formId={FORM_ID}
      onCancel={onCancel}
      title="Change value"
      visible={!!formData}
      showCloseButton={false}
      forceRender={false}
    >
      {formData && !!formData.metric && (
        <ChangeValueForm
          formId={FORM_ID}
          onFinish={handleRequestChange}
          metric={formData.metric}
          changesHistory={metricChangeHistory}
        />
      )}
    </ModalWithForm>
  );
};
