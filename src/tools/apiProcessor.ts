import { APIURIname, IdObj } from 'types/utility';
import { APIEndpoint } from 'constants/APIEndpoint';
import { makeFetch } from './APITools';

type ApiMethod = (
  entity: APIURIname,
  idObj?: IdObj,
  data?: Record<string, any>,
  useAuth?: boolean,
) => Promise<any>;

interface ApiProcessor {
  APIURI: string;
  makeEndpoint: (entity: APIURIname, IdObj?: IdObj) => string;
}

class ApiProcessor implements ApiProcessor {
  APIURI: ApiProcessor['APIURI'];

  constructor() {
    this.APIURI = '';
  }

  makeEndpoint: ApiProcessor['makeEndpoint'] = (entity, idObj = null) =>
    APIEndpoint(entity, idObj);

  get: ApiMethod = (entity, idObj = null) => {
   return makeFetch({
      url: this.makeEndpoint(entity, idObj),
    });
  };

  post: ApiMethod = (entity, idObj = null, data = {}, useAuth) => {
   return makeFetch({
      url: this.makeEndpoint(entity, idObj),
      method: 'post',
      data,
      useAuth,
    });
  };

  put: ApiMethod = (entity, idObj = null, data = {}) => {
    return makeFetch({
      url: this.makeEndpoint(entity, idObj),
      method: 'put',
      data,
    });
  };

  patch: ApiMethod = (entity, idObj = null, data = {}) => {
    return makeFetch({
      url: this.makeEndpoint(entity, idObj),
      method: 'PATCH', // case sensitive
      data,
    });
  };

  delete: ApiMethod = (entity, idObj = null) => {
    return makeFetch({
      url: this.makeEndpoint(entity, idObj),
      method: 'delete',
      data: null,
    });
  };
}

export const apiProcessor = new ApiProcessor();
(window as any).apiProcessor = apiProcessor;
