import { when } from 'mobx';
import { dataMan } from 'dataManagement';
import { apiProcessor, injectTags, performRequest } from 'tools';
import { REEditFormData, ReportingEntity, Company } from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools/notifyUser';
import { listCompanies } from '../operations/companyOperations';
import { ManagerDefault } from './ManagerDefault';

export class ReportingEntityManager extends ManagerDefault<Company[]> {
  // TODO fix tags type difference
  // between Company and ReportingEntity
  // caused by Backend structure
  reload = (): void => {
    this.proceedReload(
      () => {
        dataMan.managers.tags.init();

        // hard to read but
        // we need to inject Tags into Companies(REs)
        // because we receive only ids array
        return Promise.all([
          listCompanies(),
          when(() => dataMan.managers.tags.dataReady),
        ]).then(([REs]) => {
          return REs.map(injectTags);
        });
      },
      () => notifyUser.error(uiText('reportingEntities', 'loadError')),
    );
  };

  create = (
    model: REEditFormData,
    portfolioId?: number,
  ): Promise<ReportingEntity> => {
    return performRequest('companyCreateV2', (operationName) =>
      apiProcessor.post(operationName, portfolioId, model),
    );
  };

  update = (
    reportingEntityId: ReportingEntity['id'],
    model: REEditFormData,
  ): Promise<ReportingEntity> => {
    return performRequest('companyUpdateV2', (operationName) =>
      apiProcessor.patch(operationName, reportingEntityId, model),
    );
  };

  getById = (id: ReportingEntity['id']): Promise<ReportingEntity> => {
    return performRequest<ReportingEntity>('company', (operationName) =>
      apiProcessor.get(operationName, id),
    );
  };
}
