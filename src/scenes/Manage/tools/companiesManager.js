import { Log, BasicStore } from 'tools';
import { subscribeForRestData } from './subscribeForRestData';
import { RESTWorker } from './RESTWorker';
import { waitStoreData } from './waitStoreData';

const store = new BasicStore();

class CompaniesManager {
  restWorker = null;

  entityName = 'companies';

  constructor() {
    Log.log('[CompaniesManager] constructor');
    this.restWorker = new RESTWorker({ store, entity: this.entityName });
  }

  getAll = () => {
    Log.log('[CompaniesManager] get all');

    const storePart = this.restWorker.store;
    this.restWorker.init();

    return waitStoreData(storePart);
  };

  subscribe = (setData, setIsLoading) => {
    Log.log('[CompaniesManager] subscribe');

    this.restWorker.init();

    return subscribeForRestData({
      storePart: this.restWorker.store,
      setData,
      setIsLoading,
    });
  };

  create = (data) => {
    Log.log('[EquationsManager] create from', data);

    return this.restWorker.create(data);
  };
}
export const companiesManager = new CompaniesManager();
