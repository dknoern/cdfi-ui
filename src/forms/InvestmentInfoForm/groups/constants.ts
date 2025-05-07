import { InvestmentType } from 'types';
import { investmentTypeNames } from 'constants/investmentTypes';
import { ZERO_VALUE } from 'constants/validation';
import {
  maxLength,
  minLength,
  required,
  restrictWhitespace,
  minValue,
  maxTotalInvestment,
} from 'tools/formRules';

export const fieldRules = {
  name: [required(), minLength(), maxLength(), restrictWhitespace()],
  reportingEntity: [required('number')],
  primaryContactId: [required('number')],
  totalCommitment: [
    required('number'),
    minValue(ZERO_VALUE),
    maxTotalInvestment(),
  ],
  fiscalYearEnd: [required('number')],
  reportingStartDate: [required()],
};

export const investmentTypesList = (Object.keys(investmentTypeNames) as Array<
  InvestmentType
>).map((key) => ({
  value: key,
  label: investmentTypeNames[key],
}));
