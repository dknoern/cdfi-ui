import { decorate, action, reaction, observable, set } from 'mobx';
import { VoidFn, Company } from 'types';
import { APIError } from 'types/apiError';
import { MetricValueChangeRequest } from 'types/metricValue';
import { FetchHookResult } from 'types/hooks';
import { uiText } from 'constants/uiText';
import { isArray } from 'tools';
import { showAPIError } from 'tools/APITools';
import { metrics } from 'dataManagement/metrics';
import { defaultState } from 'dataManagement/managers/constants';
import { workDataStore } from './workDataStore';
import { userStore } from './userStore';

class MVCRStoreClass {
  initialized = false;

  storeObject: FetchHookResult<MetricValueChangeRequest[]> = {
    ...defaultState,
  };

  usedCompanyId: Company['id'] | null = null;

  init: VoidFn = () => {
    if (this.initialized) return;
    this.initialized = true;

    if (userStore.isFM)
      reaction(
        () => workDataStore.viewModeConfig.companyId,
        () => {
          if (
            !!workDataStore.viewModeConfig.companyId &&
            workDataStore.viewModeConfig.companyId !== this.usedCompanyId
          ) {
            this.reload();
          }
        },
      );

    this.reload();
  };

  reset: VoidFn = () => {
    this.storeObject = { ...defaultState };
  };

  reload: VoidFn = () => {
    this.usedCompanyId = workDataStore.viewModeConfig.companyId;

    set(this.storeObject, { isLoading: true, hasError: false, data: null });

    metrics
      .getMetricValueChangeRequests(workDataStore.viewModeConfig.companyId)
      .then((data) => {
        if (isArray(data)) {
          this.storeObject = { data, isLoading: false, hasError: false };
        } else
          throw new Error('getMetricValueChangeRequests result is incorrect');
      })
      .catch((e: APIError) => {
        showAPIError(uiText('dataInput', 'requestsLoadingError'))(e);
        this.storeObject = { data: null, isLoading: false, hasError: true };
      });
  };
}
decorate(MVCRStoreClass, {
  storeObject: observable,
  initialized: observable,
  init: action,
  reset: action,
  reload: action,
});

export const MVCRStore = new MVCRStoreClass();
