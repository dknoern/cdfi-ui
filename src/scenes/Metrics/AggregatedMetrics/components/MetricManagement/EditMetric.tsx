import React, { FC, useCallback } from 'react';
import { VoidFn, AggregatedMetricUpdateData } from 'types';
import { FormSubmitFn } from 'types/form';
import { ModalWithForm } from 'modals';
import { notifyUser } from 'tools';
import { handleServerFormError } from 'tools/formTools';
import {
  aggregatedMetricDefaultValues,
  METRIC_FORM_MODAL_WIDTH,
} from '../../constants';
import { updateAggregatedMetric } from '../tools';
import { AggregatedMetricForm } from '../../../../../forms/AggregatedMetricForm';

type EditMetricProps = {
  onClose: VoidFn;
  onFinish: VoidFn;
  metric: AggregatedMetricUpdateData | null;
};

export const EditMetric: FC<EditMetricProps> = ({
  onClose,
  onFinish,
  metric,
}) => {
  const onSubmit = useCallback<FormSubmitFn>(
    (form) =>
      (values): void => {
        const payload = {
          ...values,
          id: metric?.id,
          equationType: metric?.equationType,
        };
        updateAggregatedMetric(payload)
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
      title="Edit Aggregated Metric"
      formId="editAggregatedMetric"
      visible
      onCancel={onClose}
      actionButtonText="Update metric"
      forceRender={false}
      width={METRIC_FORM_MODAL_WIDTH}
      showCloseButton={false}
    >
      <AggregatedMetricForm
        onFinish={onSubmit}
        formId="editAggregatedMetric"
        initialValues={metric ?? aggregatedMetricDefaultValues}
      />
    </ModalWithForm>
  );
};
