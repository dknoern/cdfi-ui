import { FMCompany } from 'types';
import {
  listCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  updateMyCompany,
  getMyCompany,
} from '../operations/fmCompanyOperations';
import { ManagerDefault } from './ManagerDefault';

export class FMCompanyManager extends ManagerDefault<FMCompany[]> {
  reload = (): void => {
    this.proceedReload(listCompanies, () => {}
      //notifyUser.error(uiText('fmCompanies', 'loadError')),
    );
  };

  getCompany: typeof getCompany = (companyId: number) => {
    return getCompany(companyId);
  };

  createCompany: typeof createCompany = (data) => {
    return createCompany(data);
  };

  updateCompany: typeof updateCompany = (companyId, data) => {
    return updateCompany(companyId, data);
  };

  deleteCompany: typeof deleteCompany = (companyId: number) => {
    return deleteCompany(companyId);
  };

  getMyCompanyInfo: typeof getMyCompany = () => {
    return getMyCompany();
  };

  updateMyCompanyInfo: typeof updateMyCompany = (values) => {
    return updateMyCompany(values);
  };
}
