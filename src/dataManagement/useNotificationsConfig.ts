import { useState, useEffect, useCallback } from 'react';
import { NotificationsConfig, Company, DataHook } from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools';
import { dataMan, ManagerName } from './managers';

type DataType = NotificationsConfig | null;

const mgr = dataMan.manager(ManagerName.notificationsConfig);

export const useNotificationsConfig: DataHook<Company['id'], DataType> = (
  id,
) => {
  const [data, setData] = useState<DataType>(null);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);

  const reload = useCallback(() => {
    if (!id) return;

    mgr
      .getByCompanyId(id)
      .then(setData)
      .catch(() => {
        notifyUser.error(uiText('notificationsConfig', 'loadError'));
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(reload, [id, reload]);

  return { data, isLoading, hasError, reload };
};
