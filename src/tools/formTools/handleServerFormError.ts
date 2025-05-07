import { FormInstance } from 'antd/es/form';
import { APIError, ApiErrorType } from 'types/apiError';
import { uiText } from 'constants/uiText';
import { errorMessages } from 'constants/errorMessages';
import { showAPIError } from '../APITools';
import { populateFormWithServerErrors } from './populateFormWithServerErrors';

export const handleServerFormError = (args: {
  form: FormInstance;
  category: keyof typeof errorMessages;
  messId?: string; // for using from uiText
  message?: string; // for plain message
  throwBack?: boolean;
}) => (error: APIError): void => {
  const { form, category, messId, throwBack, message } = args;
  const errorType = error.data?.errorType ?? ApiErrorType.Legacy;

  showAPIError(messId ? uiText(category, messId) : message)(error);

  if (errorType === ApiErrorType.FormValidationError) {
    populateFormWithServerErrors({ form, category, error: error.data });
  }

  if (throwBack) throw error;
};
