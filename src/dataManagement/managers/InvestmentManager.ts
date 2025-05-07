import { apiProcessor, performRequest } from 'tools';
import {
  Investment,
  InvestmentVM,
  InvestmentCreateData,
  InvestmentUpdateFormData,
} from 'types';
import { uiText } from 'constants/uiText';
import { notifyUser } from 'tools/notifyUser';
import {
  fixInvestmentLife,
  fixInvestmentLifeBatch,
} from 'dataConverters/investment';
import { ManagerDefault } from './ManagerDefault';

// TODO remove fixers
// caused by incorrect values from datepicker

export class InvestmentManager extends ManagerDefault<InvestmentVM[]> {
  reload = (): void => {
    this.proceedReload(this.getAll, () =>
      notifyUser.error(uiText('investments', 'loadError')),
    );
  };

  create = (data: InvestmentCreateData): Promise<Investment> => {
    const preparedData: InvestmentCreateData = {
      ...data,
      generalInfo: fixInvestmentLife(data.generalInfo),
    };
    return performRequest<Investment>('investmentAdd', (operationName) =>
      apiProcessor
        .post(operationName, null, preparedData)
        .then(fixInvestmentLife),
    );
  };

  getAll = (): Promise<InvestmentVM[]> => {
    return performRequest<InvestmentVM[]>(
      'investmentBrowse',
      (operationName) =>
        apiProcessor
          .get(operationName, null)
          .then((data) => fixInvestmentLifeBatch(data)), // somehow i cannot fix the syntax
    );
  };

  getById = (id: Investment['id']): Promise<Investment> => {
    return performRequest<Investment>('investmentRead', (operationName) =>
      apiProcessor.get(operationName, id).then(fixInvestmentLife),
    );
  };

  delete = (id: Investment['id']): Promise<Investment> => {
    return performRequest<Investment>('investmentDelete', (operationName) =>
      apiProcessor.delete(operationName, id),
    );
  };

  // TODO: id to query after BE upd
  update = (
    id: Investment['id'],
    data: InvestmentUpdateFormData,
  ): Promise<InvestmentVM> => {
    return performRequest<InvestmentVM>('investmentEdit', (operationName) =>
      apiProcessor
        .patch(operationName, null, { ...fixInvestmentLife(data), id })
        .then(fixInvestmentLife),
    );
  };
}
