import {
  maxLength,
  minLength,
  restrictWhitespace,
  required,
} from 'tools/formRules';
import { store } from 'forms/ChartCreate/store';
import { validateEquationName } from '../components/tools';

export const decimalPlaces = [0, 1, 2];

const nameRulesCommon = [
  required(),
  maxLength(70),
  minLength(),
  restrictWhitespace(),
];

export const nameRules = {
  create: [
    ...nameRulesCommon,
    {
      validator: (_: any, value: string): Promise<void> =>
        validateEquationName(value, store.data.equations),
    },
  ],
  edit: nameRulesCommon,
};
