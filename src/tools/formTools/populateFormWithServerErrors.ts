import { FormInstance } from 'antd/es/form';
import { FormValidationError } from 'types/apiError';
import { errorMessages } from 'constants/errorMessages';
import { Log } from 'tools';
import { flattenObject } from '../objectUtils';

type ShowFormInlineValidationErrorsFnArgs = {
  form: FormInstance;
  error: FormValidationError;
  category: keyof typeof errorMessages;
};

type ShowFormInlineValidationErrorsFn = ({
  form,
  error,
  category,
}: ShowFormInlineValidationErrorsFnArgs) => void;

export const populateFormWithServerErrors: ShowFormInlineValidationErrorsFn = ({
  form,
  error,
  category,
}) => {
  const fieldValues = form.getFieldsValue();

  let flatFieldsArray: Record<string, any> = {};
  try {
    flatFieldsArray = flattenObject(fieldValues);
  } catch (e) {
    Log.error(e);
  }

  const defaultFields = Object.keys(flatFieldsArray).map((fieldName) => ({
    name: fieldName.split('.'),
    value: flatFieldsArray[fieldName],
  }));

  const fieldsWithBackendErrors = error.errorFields.map(
    ({ field, error: fieldError }) => ({
      name: field.split('.'),
      value: flatFieldsArray[field],
      errors: [errorMessages[category][fieldError]],
    }),
  );

  form.setFields([...defaultFields, ...fieldsWithBackendErrors]);
};
