import { APIError } from 'types/apiError';
import { uiText } from 'constants/uiText';
import { notifyUser, Log } from 'tools';
import { checkResponseSucceeded } from './checkResponseSucceeded';
import { extractJsonFromResponse } from './extractJsonFromResponse';
import { checkResponseTypeIsJson } from './checkResponseTypeIsJson';

export const handleApiResponse = async (response: Response): Promise<any> => {
  if (response.status === 401 || response.status === 403) {
    Log.error('[handleResponse] got status', response.status);
    notifyUser.error(uiText('access', 'forbidden'));
    throw new APIError('API response: unauthorized', response);
  }

  const jsonAvailable = checkResponseTypeIsJson(response);
  const json = jsonAvailable ? await extractJsonFromResponse(response) : null;

  if (checkResponseSucceeded(response)) {
    return jsonAvailable ? json : response;
  }

  throw new APIError('API request failed', response, json);
};
