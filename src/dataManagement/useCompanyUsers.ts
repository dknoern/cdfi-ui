import { useState, useEffect, useCallback } from 'react';
import { User, DataHookResultWithReload, CompanyType } from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools';
import { dataMan, ManagerName } from './managers';
import { UserManager } from './managers/UserManager';

interface CompanyUsersResult extends DataHookResultWithReload {
  data: User[] | null;
}

const mgr = dataMan.manager(ManagerName.users) as UserManager;

export const useCompanyUsers = (
  companyId: number | null,
): CompanyUsersResult => {
  const [data, setData] = useState<CompanyUsersResult['data']>(null);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);

  const reload = useCallback(() => {
    if (!companyId) return;

    setError(false);
    setLoading(true);
    setData(null);

    mgr
      .getUsersByCompany(companyId)
      .then(setData)
      .catch(() => {
        notifyUser.error(uiText('users', 'loadError'));
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [companyId]);

  useEffect(() => {
    reload();
  }, [companyId, reload]);

  return { data, isLoading, hasError, reload };
};

export const useCompanyUsersByCompanyType = (
  companyType: CompanyType | null | undefined,
): CompanyUsersResult => {
  const [data, setData] = useState<CompanyUsersResult['data']>(null);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);

  const reload = useCallback(() => {
    if (!companyType) return;

    setError(false);
    setLoading(true);
    setData(null);

    mgr
      .getUsersByCompanyType(companyType)
      .then(setData)
      .catch(() => {
        notifyUser.error(uiText('users', 'loadError'));
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [companyType]);

  useEffect(() => {
    reload();
  }, [companyType, reload]);
  
  return { data, isLoading, hasError, reload };
};

