import { Nullable } from './utility';

// Common

export enum ApiErrorType {
  NetworkError = 'NETWORK_ERROR',
  FormValidationError = 'FORM_VALIDATION_ERROR',
  // Is required for compatibility with legacy implementation of backend errors
  Legacy = 'LEGACY_API_ERROR',
}

export type ApiErrorBody = {
  errorType: ApiErrorType;
};

interface APIErrorData {
  response: Nullable<Response>;
  data: Nullable<any>;
}

export class APIError extends Error implements APIErrorData {
  data: APIErrorData['data'];

  response: APIErrorData['response'];

  constructor(
    text: string,
    response: APIErrorData['response'] = null,
    data: APIErrorData['data'] = null,
  ) {
    super(text);

    this.response = response;

    if (data) {
      this.data = data;
    }
  }
}

// For forms

export type FormErrorField = {
  detailedMessage: string;
  error: string;
  errorCode: number;
  errorType: string;
  field: string;
};

export type FormValidationError = ApiErrorBody & {
  detailedMessage: string | null;
  errorCode: number | null;
  errorFields: FormErrorField[];
  message: string;
  meta: unknown;
};
