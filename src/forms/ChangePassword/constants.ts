import {
  MIN_LENGTH_PASSWORD,
  MAX_LENGTH_PASSWORD,
  LENGTH_RESET_CODE,
} from 'constants/validation';
import {
  required,
  minLength,
  maxLength,
  restrictWhitespace,
  matchesRegex,
} from 'tools/formRules';

export const passwordFieldRules = [
  required(),
  minLength(MIN_LENGTH_PASSWORD),
  maxLength(MAX_LENGTH_PASSWORD),
  matchesRegex.password,
];

export const resetCodeFieldRules = [
  required(),
  restrictWhitespace(),
  minLength(LENGTH_RESET_CODE),
  maxLength(LENGTH_RESET_CODE),
];
