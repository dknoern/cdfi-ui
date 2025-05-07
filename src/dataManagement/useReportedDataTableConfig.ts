import { useEffect } from 'react';
import { toJS } from 'mobx';
import { useObserver } from 'mobx-react';
import { Company } from 'types';
import { Nullable } from 'types/utility';
import { dataMan, DataStore, ManagerName } from 'dataManagement/managers';

const dataMgr = dataMan.manager(ManagerName.reportedDataTableConfig);

export const useReportedDataTableConfig = (
  companyId: Nullable<Company['id']>,
): DataStore => {
  useEffect(dataMgr.resetStore, [companyId]);

  useEffect(() => {
    if (!companyId) return;

    dataMgr.init();
  }, [companyId]);

  return useObserver(() => toJS(dataMgr.store));
};
