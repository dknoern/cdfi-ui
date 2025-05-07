import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools/notifyUser';
import { listCompanies } from '../operations/pcCompanyOperations';
import { ManagerDefault } from './ManagerDefault';

export class PCCompanyManager extends ManagerDefault {
  reload = (): void => {
    this.proceedReload(listCompanies, () =>
      notifyUser.error(uiText('investments', 'loadError')),
    );
  };
}
