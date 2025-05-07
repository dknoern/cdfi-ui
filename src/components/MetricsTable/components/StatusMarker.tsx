import React, { FC } from 'react';
import { Tooltip } from 'antd';
import { InfoCircleFilled } from '@ant-design/icons';
import { MetricRequestStatus } from 'types/metricRequestStatus';
import { metricRequestStatusToText } from 'components/MetricsTable/constants';
import styles from './StatusMarker.module.scss';

const styleToStatusMapping = {
  [MetricRequestStatus.PENDING_APPROVAL]: styles.pending,
  [MetricRequestStatus.NOT_REQUIRED]: styles.notRequired,
  [MetricRequestStatus.DECLINED]: styles.notRequired,
  [MetricRequestStatus.APPROVED]: styles.accepted,
};

type StatusMarkerProps = {
  status: MetricRequestStatus;
};

export const StatusMarker: FC<StatusMarkerProps> = ({ status }) => {
  return (
    <Tooltip
      title={`This metric is ${
        metricRequestStatusToText[
          status as keyof typeof metricRequestStatusToText
        ]
      }`}
      overlayClassName={styles.overlay}
    >
      <InfoCircleFilled
        className={`${styles.icon} ${styleToStatusMapping[status]}`}
      />
    </Tooltip>
  );
};
