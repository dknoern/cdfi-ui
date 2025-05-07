import { Rule } from 'antd/lib/form';
import { MetricType } from 'types';
import {
  maxLength,
  maxValue,
  minLength,
  minValue,
  isNumber,
  boundedNumberValue,
  restrictWhitespace,
  matchesRegex,
  usernameFieldRules,
} from 'tools/formRules';
import {
  MIN_LENGTH_TEXT,
  MAX_LENGTH_TEXT_METRIC_VALUE,
  MAX_LENGTH_TEXT,
} from '../validation';

export const metricValueRules: Record<MetricType, Rule[]> = {
  [MetricType.TEXT]: [
    maxLength(MAX_LENGTH_TEXT_METRIC_VALUE),
    minLength(MIN_LENGTH_TEXT),
    restrictWhitespace(),
  ],
  [MetricType.NUMERIC]: [
    isNumber(),
    minValue(),
    maxValue(),
    boundedNumberValue(),
  ],
  [MetricType.BOTH]: [],
};

const basicContactRules = [minLength(), maxLength(), restrictWhitespace()];

export const userFieldsRules = {
  name: basicContactRules,
  surname: basicContactRules,
  email: [
    minLength(),
    maxLength(255),
    restrictWhitespace(),
    matchesRegex.email,
  ],
  phone: [...basicContactRules, matchesRegex.phone],
  phoneExtension: [matchesRegex.phoneExtension],
  title: basicContactRules,
  notes: [minLength(), maxLength(MAX_LENGTH_TEXT), restrictWhitespace()],
  username: usernameFieldRules
};

export const cdfiFieldsRules = {
  name: basicContactRules,
  phone: [matchesRegex.phone],
  phoneExtension: [matchesRegex.phoneExtension],
};

export const AVAILABLE_YEARS_START = 2006;
export const FISCAL_YEARS_SELECT_HEIGHT = 320;

export const EMPTY_VALUE_PLACEHOLDER = 'None';
