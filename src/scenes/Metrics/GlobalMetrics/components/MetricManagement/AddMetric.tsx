import React, { FC, useCallback } from 'react';
import { VoidFn } from 'types';
import { FormSubmitFn } from 'types/form';
import { initialValues4Global, MetricForm } from 'forms';
import { ModalWithForm } from 'modals';
import { notifyUser } from 'tools';
import { handleServerFormError } from 'tools/formTools';
import { METRIC_FORM_MODAL_WIDTH } from '../../constants';
import { addGlobalMetric } from '../tools';

type AddMetricProps = {
  onClose: VoidFn;
  onFinish: VoidFn;
  cdfiId?: number;
};
export const AddMetric: FC<AddMetricProps> = ({
  onClose,
  onFinish,
  cdfiId,
}) => {
  const onSubmit = useCallback<FormSubmitFn<void, any>>(
    (form) =>
      (values): void => {
        let payload = {
          ...values,
          maximumVariance: values.maximumVariance
            ? Number(values.maximumVariance / 100)
            : undefined,
        };
        if (cdfiId !== undefined) {
          payload = {
            ...payload,
            companyId: cdfiId,
          };
        }
        addGlobalMetric(payload)
          .then(() => {
            notifyUser.ok('metrics', 'createOk');
            onFinish();
          })
          .catch(
            handleServerFormError({
              form,
              category: 'metrics',
              messId: 'createError',
            }),
          );
      },
    [onFinish],
  );

  return (
    <ModalWithForm
      title="Create New Metric"
      formId="addGlobalMetric"
      visible
      onCancel={onClose}
      actionButtonText="Create metric"
      forceRender={false}
      width={METRIC_FORM_MODAL_WIDTH}
      showCloseButton={false}
    >
      <MetricForm
        onFinish={onSubmit}
        formId="addGlobalMetric"
        initialValues={initialValues4Global}
        isGlobal
      />
    </ModalWithForm>
  );
};
