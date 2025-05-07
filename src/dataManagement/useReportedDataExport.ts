import { useState, useCallback } from 'react';
import { notifyUser, financialExporter } from 'tools';
import { uiText } from 'constants/uiText';

type Result = {
  exportData: () => void;
  isLoading: boolean;
};

export const useReportedDataExport = (companyId: number | null): Result => {
  const [isLoading, setLoading] = useState(false);

  const exportData = useCallback(() => {
    if (!companyId) return;

    setLoading(true);

    financialExporter
      .startExport(companyId)
      .then(() => {
        notifyUser.ok(uiText('reportedData', 'exportOk'));
      })
      .catch(() => {
        notifyUser.error(uiText('reportedData', 'exportError'));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [companyId]);

  return { exportData, isLoading };
};
