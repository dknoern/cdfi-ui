import React, { FC, useCallback } from 'react';
import { VoidFn } from 'types';
import { FormSubmitFn } from 'types/form';
import { ModalWithForm } from 'modals';
import { notifyUser } from 'tools';
import { handleServerFormError } from 'tools/formTools';
import {
  aggregatedMetricDefaultValues,
  METRIC_FORM_MODAL_WIDTH,
} from '../../constants';
import { addAggregatedMetric } from '../tools';
import { AggregatedMetricForm } from '../../../../../forms/AggregatedMetricForm';

type AddMetricProps = {
  onClose: VoidFn;
  onFinish: VoidFn;
};
export const AddMetric: FC<AddMetricProps> = ({ onClose, onFinish }) => {
  const onSubmit = useCallback<FormSubmitFn<void, any>>(
    (form) =>
      (values): void => {
        const payload = {
          ...values,
          equationType: aggregatedMetricDefaultValues.equationType,
        };
        addAggregatedMetric(payload)
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
      title="Create Aggregated Metric"
      formId="addAggregatedMetric"
      visible
      onCancel={onClose}
      actionButtonText="Create metric"
      forceRender={false}
      width={METRIC_FORM_MODAL_WIDTH}
      showCloseButton={false}
    >
      <AggregatedMetricForm
        onFinish={onSubmit}
        formId="addAggregatedMetric"
        initialValues={aggregatedMetricDefaultValues}
      />
    </ModalWithForm>
  );
};
