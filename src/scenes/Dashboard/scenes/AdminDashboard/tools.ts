import { Store } from 'antd/lib/form/interface';
import { Company, FundManagerUpdate } from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser, showAPIError } from 'tools';
import { dataMan, ManagerName } from 'dataManagement/managers';
import { FMCompanyManager } from 'dataManagement/managers/FMCompanyManager';

const mgr = dataMan.manager(ManagerName.fmCompanies) as FMCompanyManager;

export const saveFM = (
  companyId: Company['id'] | null | undefined,
  values: Store,
): Promise<void> => {
  const proceedSave = companyId
    ? (): ReturnType<typeof mgr.updateCompany> =>
        mgr.updateCompany(companyId, values as FundManagerUpdate)
    : (): ReturnType<typeof mgr.createCompany> =>
        mgr.createCompany(values as FundManagerUpdate);

  return proceedSave()
    .then(() => {
      notifyUser.ok(uiText('clients', companyId ? 'updateOk' : 'createOk'));
      mgr.reload();
    })
    .catch(
      showAPIError(
        uiText('clients', companyId ? 'updateError' : 'createError'),
      ),
    );
};

export const deleteFM = (companyId: Company['id']): Promise<void> => {
  return mgr
    .deleteCompany(companyId)
    .then(() => {
      notifyUser.ok(uiText('clients', 'deleteOk'));
      mgr.reload();
    })
    .catch(
      showAPIError(
        uiText('clients', companyId ? 'updateError' : 'createError'),
      ),
    );
};
