import React from 'react';
import { Rule } from 'antd/lib/form';
import { CompanyInfoBase } from 'types';
import { CountrySelect } from 'forms/shared';
import { minLength, maxLength, restrictWhitespace } from 'tools/formRules';

const defaultTextRules = [minLength(), maxLength(), restrictWhitespace()];

type Field = {
  name: keyof CompanyInfoBase['address'];
  placeholder?: string;
  label: string;
  rules: Rule[];
  inputComponent?: React.ReactNode;
};

export const addressFields: Field[] = [
  {
    name: 'street',
    placeholder: 'Street',
    label: 'Street address',
    rules: defaultTextRules,
  },
  { name: 'city', placeholder: 'City', label: 'City', rules: defaultTextRules },
  {
    name: 'state',
    placeholder: 'State/Province',
    label: 'State/Province',
    rules: defaultTextRules,
  },
  {
    name: 'zipCode',
    placeholder: 'Zip/Mail Code',
    label: 'Zip/Mail Code',
    rules: defaultTextRules,
  },
  {
    name: 'country',
    label: 'Country',
    inputComponent: <CountrySelect />,
    rules: defaultTextRules,
  },
];
