import { uiText } from '../../constants';
import { Analyst } from '../../scenes/Dashboard/scenes/CdfiDashboard/types';
import { notifyUser } from '../../tools/notifyUser';
import { ManagerDefault } from './ManagerDefault';
import { getAllAnalysts } from 'dataManagement/operations/allAnalystsOperations';

export interface AllAnalystsResults {
  analysts: Analyst[];
}
export class AllAnalystsManager extends ManagerDefault<AllAnalystsResults> {
  reload = (): void => {
    this.getAllAnalysts();
  };
  getAllAnalysts = (): void => {
    this.proceedReload(
      () =>
        Promise.all([getAllAnalysts()]).then(
          (values): AllAnalystsResults => ({ analysts: values[0] }),
        ),
      (e) => {
        notifyUser.error(uiText('allAnalysts', 'loadError'));
      },
    );
  };
}
