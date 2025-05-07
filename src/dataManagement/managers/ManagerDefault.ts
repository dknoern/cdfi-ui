import { observable, set, decorate, action, computed } from 'mobx';
import { APIError } from 'types/apiError';
import { Manager, DataStore, Data } from './types';
import { defaultState } from './constants';

export class ManagerDefault<StoreDataType = Data> implements Manager {
  store: DataStore<StoreDataType> = observable({ ...defaultState });

  resetStore = (): void => {
    set(this.store, { ...defaultState, reload: this.reload });
  };

  reload = (params?: number): void => {
    // placeholder
  };

  // use for default flow
  // when just call API and wait for result
  proceedReload = (
    getterFn: () => Promise<StoreDataType>,
    errorCallback: (e?: APIError) => void,
  ): void => {
    this.store.isLoading = true;
    getterFn()
      .then((data) => {
        set(this.store, { data, isLoading: false, hasError: false });
      })
      .catch((e: APIError) => {
        errorCallback(e);
        set(this.store, { isLoading: false, hasError: true });
      });
  };

  init = (): void => {
    if (!this.loadTriggered) {
      this.resetStore();
      this.reload();
    }
  };

  get loadTriggered(): boolean {
    return (
      this.store.data !== null || this.store.hasError || this.store.isLoading
    );
  }

  get dataReady(): boolean {
    return (
      this.store.data !== null && !this.store.hasError && !this.store.isLoading
    );
  }
}

decorate(ManagerDefault, {
  resetStore: action,
  reload: action,
  proceedReload: action,
  init: action,
  loadTriggered: computed,
  dataReady: computed,
});
