import { addressFields as addressFieldsRaw } from 'forms/constants';
import { required } from 'tools/formRules';

export const addressFields = addressFieldsRaw.map((field) => ({
  ...field,
  name: ['address', field.name],
  rules: [...field.rules, required()],
}));
