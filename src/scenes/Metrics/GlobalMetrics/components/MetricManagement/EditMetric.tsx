import React, { FC, useCallback } from 'react';
import { VoidFn } from 'types';
import { FormSubmitFn } from 'types/form';
import { ModalWithForm } from 'modals';
import { MetricForm, EditMetricType, initialValues4Global } from 'forms';
import { notifyUser } from 'tools';
import { handleServerFormError } from 'tools/formTools';
import { METRIC_FORM_MODAL_WIDTH } from '../../constants';
import { updateGlobalMetric } from '../tools';

type EditMetricProps = {
  onClose: VoidFn;
  onFinish: VoidFn;
  metric: EditMetricType | null;
};

type EditMetricValues = {
  maximumVariance?: number;
  [key: string]: any;
};

export const EditMetric: FC<EditMetricProps> = ({
  onClose,
  onFinish,
  metric,
}) => {
  const onSubmit = useCallback<FormSubmitFn>(
    (form) =>
      (values: EditMetricValues): void => {
        const payload = {
          ...values,
          maximumVariance: values.maximumVariance
            ? Number(values.maximumVariance / 100)
            : undefined,
        };
        updateGlobalMetric(metric?.id ?? 0, payload)
          .then(() => {
            notifyUser.ok('metrics', 'updateOk');
            onFinish();
          })
          .catch(
            handleServerFormError({
              form,
              category: 'metrics',
              messId: 'updateError',
            }),
          );
      },
    [metric, onFinish],
  );

  return (
    <ModalWithForm
      title="Edit metric"
      visible
      formId="editGlobalMetric"
      onCancel={onClose}
      actionButtonText="Save changes"
      forceRender={false}
      width={METRIC_FORM_MODAL_WIDTH}
      showCloseButton={false}
    >
      <MetricForm
        onFinish={onSubmit}
        initialValues={metric ?? initialValues4Global}
        formId="editGlobalMetric"
        isGlobal
      />
    </ModalWithForm>
  );
};
