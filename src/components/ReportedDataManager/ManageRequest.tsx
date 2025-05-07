import React, { FC, useReducer, useEffect } from 'react';
import { Button } from 'antd';
import { VoidFn } from 'types';
import { MetricChangeHistory } from 'types/metricHistory';
import { FormData4MVCR } from 'types/metricValue';
import { uiText } from 'constants/uiText';
import { BasicModal } from 'modals/BasicModal';
import { ChangeRequestForm } from 'forms/DataInputParts';
import { notifyUser, showAPIError, formatDateTime } from 'tools';
import { reportedData as reportedDataManager } from 'dataManagement';
import { metrics as metricsManager } from 'dataManagement/metrics';
import styles from './ReportedDataManager.module.scss';

type RequestActions = 'approve' | 'decline';

type ManageRequestProps = {
  metric: FormData4MVCR | null;
  onCancel: VoidFn;
  onFinish: VoidFn;
};

const requestActions = {
  approve: metricsManager.approveMetricValueChangeRequest,
  decline: metricsManager.declineMetricValueChangeRequest,
};

const metricChangeHistoryReducer = (
  state: MetricChangeHistory[],
  items: MetricChangeHistory[],
): MetricChangeHistory[] => {
  return [
    ...items.map((item) => ({
      ...item,
      id: `${item.personName}--${item.created}`,
      created: formatDateTime(item.created),
    })),
  ];
};

export const ManageRequest: FC<ManageRequestProps> = ({
  metric,
  onCancel,
  onFinish,
}) => {
  const [metricChangeHistory, setMetricChangeHistory] = useReducer(
    metricChangeHistoryReducer,
    [],
  );

  useEffect(() => {
    if (!metric) {
      setMetricChangeHistory([]);
      return;
    }

    reportedDataManager
      .getMetricChangeHistory({
        companyId: metric.companyId,
        metricId: metric.metricId,
        periodEndDate: metric.period,
      })
      .then(setMetricChangeHistory)
      .catch(
        showAPIError(
          uiText('metricValueChangeRequests', 'historyLoadingError'),
        ),
      );
  }, [metric]);

  const handleRequestAction = (type: RequestActions): void => {
    if (!metric) return;

    const action = requestActions[type];
    action(metric.requestId)
      .then((result) => {
        notifyUser.ok(result.message);
        onFinish();
      })
      .catch(
        showAPIError(uiText('metricValueChangeRequests', 'requestActionError')),
      );
  };

  return (
    <BasicModal
      visible={!!metric}
      title="Value Change Request"
      onCancel={onCancel}
      className={styles.requestManModal}
      footer={[
        <Button
          key="approveBtn"
          onClick={(): void => handleRequestAction('approve')}
          type="primary"
          className={styles.approveBtn}
        >
          Approve
        </Button>,
        <Button
          key="declineBtn"
          onClick={(): void => handleRequestAction('decline')}
          type="primary"
          className={styles.declineBtn}
        >
          Decline
        </Button>,
        <Button
          key="cancelBtn"
          type="default"
          onClick={onCancel}
          className={styles.cancelBtn}
        >
          Cancel
        </Button>,
      ]}
    >
      <ChangeRequestForm metric={metric} changesHistory={metricChangeHistory} />
    </BasicModal>
  );
};
