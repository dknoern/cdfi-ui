// based on error object from handleResponse
import React, { ReactElement } from 'react';
import { APIError, ApiErrorType } from 'types/apiError';
import { errorMessages } from 'constants/errorMessages';

export const prepareErrorMessage = (
  errorObj: APIError,
  defaultMessage: string,
): string | ReactElement => {
  if (!errorObj?.data) return defaultMessage;

  const { message, errorType, errors } = errorObj.data;

  switch (errorType) {
    case ApiErrorType.NetworkError:
      return errorMessages.common[ApiErrorType.NetworkError];

    case ApiErrorType.FormValidationError:
      return (
        <>
          <span>{message}</span>
          <br />
          <span>
            {
              errorMessages.common[
                errorType as keyof typeof errorMessages.common
              ]
            }
          </span>
        </>
      );

    case ApiErrorType.Legacy:
    default:
      if (Array.isArray(errors) && errors.length > 0) {
        return (
          <>
            {message && <div>{message}</div>}
            {errors.map((err, i) => (
              <div key={i}>{err.defaultMessage}</div>
            ))}
          </>
        );
      }
      return message || defaultMessage;
  }
};
