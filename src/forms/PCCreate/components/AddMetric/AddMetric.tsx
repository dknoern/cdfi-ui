import React, { FC, useCallback } from 'react';
import { VoidFn } from 'types';
import { FormSubmitFn } from 'types/form';
import { MODAL_WIDTH } from 'constants/ui';
import { ModalWithForm } from 'modals';
import { MetricForm } from 'forms/MetricForm';
import { addMetric } from 'forms/PCCreate/steps/CustomizeMetrics/tools';
import { showFormHideConfirmation } from 'tools/formTools';

type AddMetricProps = {
  onCancel: VoidFn;
  visible: boolean;
};
export const AddMetric: FC<AddMetricProps> = ({ onCancel, visible }) => {
  const onSubmit = useCallback<FormSubmitFn>(
    (form) => (values): void => {
      addMetric(values);
      onCancel();
    },
    [onCancel],
  );

  const handleHide = useCallback(() => {
    showFormHideConfirmation(onCancel);
  }, [onCancel]);

  return (
    <ModalWithForm
      title="Create New Metric"
      visible={visible}
      formId="addMetric"
      onCancel={handleHide}
      actionButtonText="Create metric"
      forceRender={false}
      width={MODAL_WIDTH.MEDIUM}
      showCloseButton={false}
    >
      <MetricForm onFinish={onSubmit} formId="addMetric" />
    </ModalWithForm>
  );
};
