import { userStore } from 'store';
import { handleApiResponse } from './handleApiResponse';
import { handleNetworkError } from './handleNetworkError';

type MakeFetchParams = {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch' | 'PATCH';
  data?: any;
  contentType?: string;
  useAuth?: boolean;
};
export const makeFetch = ({
  url,
  method = 'get',
  data,
  contentType = 'application/json',
  useAuth = true,
}: MakeFetchParams): Promise<any> => {
  let body = data;
  if (data && !(data instanceof FormData)) {
    body = JSON.stringify(data);
  }

  const headers = new Headers();

  if (useAuth) {
    headers.append('Authorization', `Bearer ${userStore.token}`);
  }

  if (!(data instanceof FormData) && contentType !== 'auto') {
    headers.append('Content-Type', contentType);
  }

  return fetch(url, {
    method,
    headers,
    cache: 'no-cache',
    body,
  })
    .then(handleApiResponse)
    .catch(handleNetworkError);
};
