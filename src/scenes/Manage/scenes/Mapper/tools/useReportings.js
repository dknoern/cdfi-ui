import { useState, useEffect } from 'react';
import { reportingsManager } from 'scenes/Manage/tools';

export const useReportings = (companyId) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    if (!companyId) {
      return;
    }

    setIsLoading(true);
    setData(null);
    setHasErrors(false);

    reportingsManager
      .loadReportings(companyId)
      .then(setData)
      .catch(() => {
        setHasErrors(true);
      })
      .finally(() => setIsLoading(false));
  }, [companyId]);

  return [isLoading, data, hasErrors];
};
