import React, { FC } from 'react';
import { VoidFn, AggregatedMetric } from 'types';
import { NotificationModal } from 'modals';
import { ModalTypes } from 'constants/ui';
import { showAPIError, notifyUser } from 'tools';
import styles from './DeleteMetric.module.scss';
import { deleteAggregatedMetrics } from '../tools';
import { uiText } from '../../../../../constants';

type DeleteMetricProps = {
  visible: boolean;
  onClose: VoidFn;
  reload: VoidFn;
  metrics: AggregatedMetric[] | [];
};

export const DeleteMetric: FC<DeleteMetricProps> = ({
  visible,
  onClose,
  reload,
  metrics,
}) => {
  const onDelete = (): void => {
    Promise.all(
      (metrics as AggregatedMetric[]).map((metric) =>
        deleteAggregatedMetrics(metric.id),
      ),
    )
      .then(() => {
        notifyUser.ok(uiText('metrics', 'deleteOk'));
        reload();
      })
      .catch(showAPIError('An error occurred while deleting metrics.'))
      .finally(onClose);
  };

  const metricNames = (metrics as AggregatedMetric[])
    .map((m) => m.name)
    .join(', ');

  return (
    <NotificationModal
      title={`Do you really want to delete '${metricNames}'?`}
      isVisible={visible}
      type={ModalTypes.Warning}
      buttonsConfig={[
        {
          id: 'deleteBtn',
          key: 'delete',
          text: 'Delete',
          action: onDelete,
          type: 'primary',
          danger: true,
        },
        {
          id: 'cancelBtn',
          key: 'cancel',
          text: 'Cancel',
          action: onClose,
          className: styles.cancelBtn,
          type: 'ghost',
        },
      ]}
    />
  );
};
