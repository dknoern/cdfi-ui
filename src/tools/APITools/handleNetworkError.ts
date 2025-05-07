import { APIError, ApiErrorBody, ApiErrorType } from 'types/apiError';
import { errorMessages } from 'constants/errorMessages';

export const handleNetworkError = (error: unknown): void => {
  if (error instanceof APIError) throw error;

  const errorData: ApiErrorBody = { errorType: ApiErrorType.NetworkError };

  throw new APIError(
    errorMessages.common[ApiErrorType.NetworkError],
    null,
    errorData,
  );
};
