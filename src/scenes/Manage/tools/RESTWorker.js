import { observable } from 'mobx';
import { CRUD_OPERATIONS } from 'constants/CRUDOperations';
import { uiStore } from 'store';
import { Log, apiProcessor } from 'tools';

const entity2endpointId = (entityName, operation = 'read') =>
  ({
    outputMaps: {
      [CRUD_OPERATIONS.CREATE]: 'outputMapCreate',
      [CRUD_OPERATIONS.READ]: 'outputMapsList',
      [CRUD_OPERATIONS.UPDATE]: 'outputMapUpdate',
      [CRUD_OPERATIONS.DELETE]: 'outputMapDelete',
    },
    equations: {
      [CRUD_OPERATIONS.CREATE]: 'equationCreate',
      [CRUD_OPERATIONS.READ]: 'equationsList',
      [CRUD_OPERATIONS.UPDATE]: 'equationUpdate',
      [CRUD_OPERATIONS.DELETE]: 'equationDelete',
    },
    companies: {
      [CRUD_OPERATIONS.READ]: 'companiesAll',
      [CRUD_OPERATIONS.CREATE]: 'companyCreate',
    },
    graphs: {
      [CRUD_OPERATIONS.READ]: 'graphsByCompany',
      [CRUD_OPERATIONS.CREATE]: 'graphCreate',
      [CRUD_OPERATIONS.UPDATE]: 'graphUpdate',
      [CRUD_OPERATIONS.DELETE]: 'graphDelete',
    },
    portfolios: {
      [CRUD_OPERATIONS.READ]: 'portfoliosByOwner',
      [CRUD_OPERATIONS.CREATE]: 'portfolioCreate',
      [CRUD_OPERATIONS.UPDATE]: 'portfolioUpdate',
      [CRUD_OPERATIONS.DELETE]: 'portfolioDelete',
    },
  }[entityName][operation]);

const defaultStoreValue = { isLoading: true, data: null };

export class RESTWorker {
  entity = null;

  storePart = null;

  initParams = null;

  initialized = false;

  constructor(props) {
    const { store, entity, queryParams } = props;

    this.entity = entity;
    this.initParams = queryParams;

    if (typeof store[entity] === 'undefined') {
      store[entity] = observable(defaultStoreValue);
      this.storePart = store[entity];
    }
  }

  reset = () => {
    this.storePart = observable(defaultStoreValue);
    this.initialized = false;
  };

  init = (queryParams = null) => {
    if (!this.initialized) {
      this.reload(queryParams || this.initParams || null);
      this.initialized = true;
      if (queryParams) {
        this.initParams = queryParams;
      }
    }
  };

  reload = (queryParams = null) => {
    this.storePart.isLoading = true;
    this.storePart.data = null;

    Log.log('[RESTWorker] reload', this.entity);

    uiStore.addLoading(`${this.entity}_READ`);
    return apiProcessor
      .get(
        entity2endpointId(this.entity, CRUD_OPERATIONS.READ),
        queryParams || this.initParams || null,
      )
      .then((data) => {
        if (Array.isArray(data)) {
          this.storePart.data = data;
        }
        return data;
      })
      .catch((e) => {
        this.storePart.data = null;
        Log.error('[RESTWorker] error', e);
        throw e;
      })
      .finally(() => {
        this.storePart.isLoading = false;
        uiStore.endLoading(`${this.entity}_READ`);
      });
  };

  create = (data, queryParams = null) => {
    uiStore.addLoading(`${this.entity}_CREATE`);

    return apiProcessor
      .post(
        entity2endpointId(this.entity, CRUD_OPERATIONS.CREATE),
        queryParams,
        data,
      )
      .then(() => {
        this.reload();
      })
      .catch((e) => {
        Log.error('[RESTWorker] error', e);
        throw e;
      })
      .finally(() => uiStore.endLoading(`${this.entity}_CREATE`));
  };

  update = (data, queryParams = null) => {
    uiStore.addLoading(`${this.entity}_UPDATE`);

    return apiProcessor
      .put(
        entity2endpointId(this.entity, CRUD_OPERATIONS.UPDATE),
        queryParams,
        data,
      )
      .then(() => {
        this.reload();
      })
      .catch((e) => {
        Log.error('[RESTWorker] error', e);
        throw e;
      })
      .finally(() => uiStore.endLoading(`${this.entity}_UPDATE`));
  };

  delete = (queryParams = null) => {
    uiStore.addLoading(`${this.entity}_DELETE`);

    return apiProcessor
      .delete(
        entity2endpointId(this.entity, CRUD_OPERATIONS.DELETE),
        queryParams,
      )
      .then(() => {
        this.reload();
      })
      .catch((e) => {
        Log.error('[RESTWorker] error', e);
        throw e;
      })
      .finally(() => uiStore.endLoading(`${this.entity}_DELETE`));
  };

  get store() {
    return this.storePart;
  }
}
