import { Company } from 'types';
import {
  ForecastCard,
  ForecastEditType,
  Forecast,
  ForecastCellUpdateData,
} from 'types/forecast';
import { apiProcessor } from 'tools/apiProcessor';
import { uiStore } from 'store/uiStore';
import { ManagerDefault } from './ManagerDefault';

export class ForecastManager extends ManagerDefault {
  getByCompany = (companyId: Company['id']): Promise<ForecastCard[]> => {
    return apiProcessor.get('forecasts', companyId);
  };

  getById = (id: Forecast['id']): Promise<Forecast> => {
    return apiProcessor.get('forecast', id);
  };

  create = (data: ForecastEditType): Promise<Forecast> => {
    const OPERATION = 'forecastCreate';

    uiStore.addLoading(OPERATION);

    return apiProcessor.post(OPERATION, null, data).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  update = (data: ForecastEditType): Promise<Forecast> => {
    const OPERATION = 'forecastUpdate';

    uiStore.addLoading(OPERATION);

    return apiProcessor.patch(OPERATION, data.id, data).finally(() => {
      uiStore.endLoading(OPERATION);
    });
  };

  updateForecastCell = (
    forecastSetId: Forecast['id'],
    data: ForecastCellUpdateData,
  ): Promise<void> => {
    const OPERATION = 'forecastCellUpdate';

    uiStore.addLoading(OPERATION);

    return apiProcessor
      .put(OPERATION, null, {
        ...data,
        value: data.value ?? null,
        forecastSetId,
      })
      .finally(() => {
        uiStore.endLoading(OPERATION);
      });
  };
}
