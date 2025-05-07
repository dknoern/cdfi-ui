/* eslint-disable @typescript-eslint/camelcase */
import { ApiErrorType } from 'types/apiError';

const messages = {
  common: {
    [ApiErrorType.FormValidationError]: 'One or more form fields have errors',
    [ApiErrorType.NetworkError]:
      'Seems like there are some connectivity issues',
  },
  tagCategories: {
    length_limits_exceed: 'Length must be between 2 and 100 symbols',
    field_not_allowed: 'Field is not allowed',
    required_field_not_provided: 'This field is required',
    not_unique_name: 'Name must be unique',
    name_equals_global_tag_category:
      "Name is equal to some of Global Categories' names",
  },
  tags: {
    name_equals_global_tag: "Name is equal to some of Global Tags' names",
    length_limits_exceed: 'Length must be between 2 and 100 symbols',
    field_not_allowed: 'Field is not allowed',
    required_field_not_provided: 'This field is required',
    not_unique_name: 'Name must be unique',
  },
  metrics: {
    metric_code_not_unique: "Metric's account code should be unique",
    metric_code_not_valid: "Metric's account code is not valid",
    not_unique_name: 'Name must be unique',
  },
  library: {
    not_unique_name: 'Name must be unique',
  },
  reportingEntity: {
    HasUniqueName: 'Name must be unique',
  },
};

// TODO make proper typing for 2nd level (currently difficult)
// export const errorMessages1: {
//   [key in keyof typeof messages]: {
//     [key2 in keyof typeof messages[key]]: string;
//   };
// } = messages;

export const errorMessages: {
  [key in keyof typeof messages]: {
    [key: string]: string;
  };
} = messages;
