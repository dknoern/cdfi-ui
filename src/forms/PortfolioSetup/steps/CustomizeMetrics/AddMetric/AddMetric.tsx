import React, { FC, useCallback } from 'react';
import { GlobalMetric, VoidFn } from 'types';
import { FormSubmitFn } from 'types/form';
import { MODAL_WIDTH } from 'constants/ui';
import { ModalWithForm } from 'modals';
import { MetricForm } from 'forms/MetricForm';
import { showFormHideConfirmation } from 'tools/formTools';
import { addMetric } from './tools';

type AddMetricProps = {
  onCancel: VoidFn;
  onFinish: (createdMetric: GlobalMetric) => void;
  visible: boolean;
};
export const AddMetric: FC<AddMetricProps> = ({
  onCancel,
  onFinish,
  visible,
}) => {
  const onSubmit = useCallback<FormSubmitFn<void, any>>(
    (form) =>
      (values): void => {
        addMetric(values);
        onFinish(values);
      },
    [onFinish],
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
