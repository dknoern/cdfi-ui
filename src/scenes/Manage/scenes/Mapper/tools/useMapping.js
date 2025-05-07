import { useState, useEffect } from 'react';
import { uiStore } from 'store';
import { mapsManager } from 'scenes/Manage/tools';

export const useMapping = (reportConfig) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      !reportConfig ||
      Object.values(reportConfig).find((item) => item === null)
    ) {
      return;
    }

    uiStore.addLoading('LOAD_MAPPING');

    setTimeout(() => {
      mapsManager
        .getMappings(reportConfig)
        .then(setData)
        .catch()
        .finally(() => {
          setIsLoading(false);
          uiStore.endLoading('LOAD_MAPPING');
        });
    }, 0);
  }, [reportConfig]);

  return [isLoading, data, !isLoading && data === null];
};
