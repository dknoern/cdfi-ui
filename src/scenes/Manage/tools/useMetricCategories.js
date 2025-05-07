import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { uiStore } from 'store';
import { apiProcessor, Log } from 'tools';
import { uiText } from 'constants/uiText';

export const useMetricCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState(null);

  useEffect(() => {
    uiStore.addLoading('LOAD_METRIC_CATEGORIES');
    apiProcessor.get('metricCategoryAll')
      .then(setItems)
      .catch((e) => {
        Log.error('[useMetrics]', e);
        toast(uiText('metrics', 'loadError'), {
          type: 'error',
        });
      })
      .finally(() => {
        setIsLoading(false);
        uiStore.endLoading('LOAD_METRIC_CATEGORIES');
      });
  }, []);

  return { isLoading, items, hasError: !isLoading && items === null };
};
