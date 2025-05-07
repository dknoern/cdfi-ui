import {
  TagGroup,
  MetricSharePeriod,
  MetricType,
  MetricNumericFormat,
} from 'types';

export const initTagsMap = new Map([
  [TagGroup.sdgs, []],
  [TagGroup.irisplus, []],
  [TagGroup.custom, []],
]);

export const initialValues4Company = {
  name: '',
  accountCode: '',
  frequency: MetricSharePeriod.QUARTERLY,
  parentId: null,
  grandParentId: null,
  typeConfig: {
    type: MetricType.NUMERIC,
    format: MetricNumericFormat.NUMBER,
    decimals: 0,
    question: '',
  },
};

export const initialValues4Global = {
  name: '',
  accountCode: '',
  frequency: undefined,
  parentId: null,
  isPublic: true,
  grandParentId: null,
  typeConfig: {
    type: MetricType.NUMERIC,
    format: MetricNumericFormat.NUMBER,
    decimals: 0,
    question: '',
  },
};

export const decimals: string[] = ['0', '0.0', '0.00', '0.000', '0.0000'];
