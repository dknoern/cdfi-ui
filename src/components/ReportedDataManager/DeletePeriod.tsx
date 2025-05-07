import { FC, useCallback, useEffect } from 'react';
import { VoidFn } from 'types';
import { ReportingPeriod } from 'types/reportedData';
import { uiText } from 'constants/uiText';
import { Dialog, notifyUser, showAPIError } from 'tools';
import { workDataStore } from 'store';
import { reportedData as reportedDataMgr } from 'dataManagement';

type DeletePeriodProps = {
  period: ReportingPeriod | null;
  onFinish: VoidFn;
  onCancel: VoidFn;
};
export const DeletePeriod: FC<DeletePeriodProps> = ({
  period,
  onFinish,
  onCancel,
}) => {
  const deletePeriod = useCallback(() => {
    if (!period) return;

    reportedDataMgr
      .deletePeriod({
        period,
        companyId: workDataStore.viewModeConfig.companyId || undefined,
      })
      .then(() => {
        notifyUser.ok('dataInput', 'periodDeleteOk');
        onFinish();
      })
      .catch((e) => {
        showAPIError(uiText('dataInput', 'periodDeleteError'))(e);
        onCancel();
      });
  }, [onCancel, onFinish, period]);

  useEffect(() => {
    if (!period) return;

    Dialog.confirm({
      title: uiText('dataInput', 'confirmDeletePeriodTitle'),
      content: uiText('dataInput', 'confirmDeletePeriodText'),
      onOk: deletePeriod,
      onCancel,
    });
  }, [deletePeriod, onCancel, period]);

  return null;
};
