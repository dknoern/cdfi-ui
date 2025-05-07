import { Rule, RuleRender } from 'antd/lib/form';
import {
  MAX_LENGTH_DEFAULT,
  MIN_VALUE,
  MIN_LENGTH_DEFAULT,
  MAX_VALUE,
  MIN_VALUE_STRING,
  MAX_VALUE_STRING,
  MIN_PERIOD_YEAR,
  MAX_PERIOD_YEAR,
} from 'constants/validation';
import { uiText } from 'constants/uiText';
import { mailFormat } from './emailTools';

type InputDataType = 'number' | 'string' | 'array' | 'date';

export const formRuleMessages = (
  value?: number | null,
  additionalInfo?: unknown,
): any => ({
  required: 'Field is required',
  whitespace: 'Field cannot be empty',
  max: {
    string: `Field cannot be longer than ${value ?? 0} characters`,
    array: `You cannot select more than ${value ?? 0} items`,
    number: `Value must be less than or equal to ${value ?? 0}`,
  },
  min: {
    string: `Field must be at least ${value ?? 0} characters`,
    array: `You must select more than ${(value ?? 0) - 1} items`,
    number: `Value must be greater than or equal to ${value ?? 0}`,
  },
  boundedNumber: `Number must be between ${additionalInfo}`,
  pattern: `Field has incorrect format`,
  password:
    'Field must contain at least one of each: lowercase letter, uppercase letter, digit and special character',
  selection: {
    array: `Select at least ${value} item(s)`,
    required: `You must select item`,
  },
  type: {
    number: 'Invalid number format',
  },
  tags: `You cannot select more than ${value ?? 0} ${additionalInfo} tags`,
  unique: `This ${additionalInfo} already exist`,
  username: `Username can contain letters, digits and the following special characters: @ . - +`,
});

export const required = (type: InputDataType = 'string'): Rule => ({
  required: true,
  type,
  message: formRuleMessages().required,
});

export const requiredNum = (type: InputDataType = 'number'): Rule => ({
  required: true,
  type,
  message: formRuleMessages().required,
});

export const requiredDate = (type: InputDataType = 'date'): Rule => ({
  required: true,
  type,
  message: formRuleMessages().required,
});

export const minLength = (
  min: number = MIN_LENGTH_DEFAULT,
  type: InputDataType = 'string',
): Rule => ({
  min,
  type,
  message: formRuleMessages(min).min[type],
});

export const maxLength = (
  max: number = MAX_LENGTH_DEFAULT,
  type: InputDataType = 'string',
): Rule => ({
  max,
  type,
  message: formRuleMessages(max).max[type],
});

export const minValue = (min: number = MIN_VALUE): Rule => ({
  min,
  type: 'number',
  message: formRuleMessages(min).min.number,
});

export const maxValue = (max: number = MAX_VALUE): Rule => ({
  max,
  type: 'number',
  message: formRuleMessages(max).max.number,
});

const chooseDisplayValue = (
  value: number,
  defaultValue: number,
  valueString: string,
  defaultValueString: string,
): number | string => {
  const isDefaultValue = value === defaultValue;
  const isDefaultValueString = valueString === defaultValueString;

  if (isDefaultValue && isDefaultValueString) return valueString;
  if (!isDefaultValue && !isDefaultValueString) return valueString;

  return value;
};

export const boundedNumberValue = (
  min: number = MIN_VALUE,
  max: number = MAX_VALUE,
  minString: string = MIN_VALUE_STRING,
  maxString: string = MAX_VALUE_STRING,
): Rule => {
  const displayedMin = chooseDisplayValue(
    min,
    MIN_VALUE,
    minString,
    MIN_VALUE_STRING,
  );
  const displayedMax = chooseDisplayValue(
    max,
    MAX_VALUE,
    maxString,
    MAX_VALUE_STRING,
  );

  return {
    min,
    max,
    type: 'number',
    message: formRuleMessages(null, `${displayedMin} and ${displayedMax}`)
      .boundedNumber,
  };
};

export const pattern = (
  regex: RegExp,
  type: InputDataType = 'string',
  isPassword = false,
  isUsername = false,
): Rule => ({
  pattern: regex,
  type,
  message: isPassword
    ? formRuleMessages().password
    : isUsername
    ? formRuleMessages().username
    : formRuleMessages().pattern,
});

export const restrictWhitespace = (type: InputDataType = 'string'): Rule => ({
  whitespace: true,
  type,
  message: formRuleMessages().whitespace,
});

export const minSelected = (min: number): Rule => ({
  min,
  required: true,
  type: 'array',
  message: formRuleMessages(min).selection.array,
});

export const isNumber = (): Rule => ({
  type: 'number',
  message: formRuleMessages().type.number,
});

export const isSelected = (type: InputDataType = 'number'): Rule => ({
  required: true,
  type,
  message: formRuleMessages().selection.required,
});

export const periodIsValid =
  (period: 'start' | 'end', part: 'year' | 'quarter'): RuleRender =>
  (formInstance): ReturnType<RuleRender> => {
    const { periodStart, periodEnd } = formInstance.getFieldsValue();

    return {
      validator(): Promise<void> {
        switch (part) {
          case 'year': {
            const year = period === 'start' ? periodStart.year : periodEnd.year;

            if (!year) {
              return Promise.reject(required('number'));
            }

            if (year < MIN_PERIOD_YEAR) {
              return Promise.reject(minValue(MIN_PERIOD_YEAR));
            }

            if (year > MAX_PERIOD_YEAR) {
              return Promise.reject(maxValue(MAX_PERIOD_YEAR));
            }

            switch (period) {
              case 'start':
                if (year > periodEnd.year) {
                  return Promise.reject(
                    uiText('forecasts', 'beginningYearIsInvalid'),
                  );
                }
                break;

              case 'end':
              default:
                if (periodStart.year > year) {
                  return Promise.reject(
                    uiText('forecasts', 'endingYearIsInvalid'),
                  );
                }
                break;
            }

            break;
          }

          case 'quarter':
          default:
            if (
              periodStart.year &&
              periodStart.year === periodEnd.year &&
              periodStart.quarter > periodEnd.quarter
            ) {
              return Promise.reject(
                uiText(
                  'forecasts',
                  period === 'start'
                    ? 'beginningQuarterIsInvalid'
                    : 'endingQuarterIsInvalid',
                ),
              );
            }
            break;
        }

        return Promise.resolve();
      },
    };
  };

export const matchesRegex: Record<
  | 'email'
  | 'phone'
  | 'phoneExtension'
  | 'accountCode'
  | 'password'
  | 'username'
  | 'initials'
  | 'multipleEmails',
  Rule
> = {
  email: pattern(new RegExp(mailFormat)),
  phone: pattern(/^[+]?[\d-()]+$/g),
  phoneExtension: pattern(/[0-9]+$/g),
  initials: pattern(/^[a-zA-Z]+$/g),
  accountCode: pattern(/^[^\s\\/#+=\-*.,%]*$/g),
  password: pattern(
    // password should contain at least one of each: lowercase letter, uppercase letter, digit, special symbol
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z\d\s]).*$/g,
    'string',
    true,
  ),
  // Usernames can contain letters a-z, A-Z, numbers 0-9 and special characters @ . + - _
  username: pattern(/^[A-Za-z0-9@.+-_]*$/g, 'string', false, true),
  multipleEmails: pattern(
    /^(\s?[^\s;]+@[^\s;]+\.[^\s;]+\s?;)*(\s?[^\s;]+@[^\s;]+\.[^\s;]+)$/g,
  ),
};

export const emailFieldRules = [
  minLength(),
  restrictWhitespace(),
  matchesRegex.email,
];

export const nameFieldRules = [minLength(1), maxLength(50)];

export const phoneFieldRules = [minLength(3), maxLength(50)];

export const usernameFieldRules = [
  minLength(3),
  maxLength(50),
  restrictWhitespace(),
  matchesRegex.username,
];

export const maxTotalInvestment = (max = 100000000000): Rule => ({
  max,
  type: 'number',
  message: uiText('investments', 'totalInvestmentIsInvalid'),
});

export const isNumericWithDecimal = (type: InputDataType = 'string'): Rule => {
  if (type === 'number') {
    return {
      type,
      min: 0,
      transform: (value) =>
        !isNaN(value) && Number(value) >= 0 ? Number(value) : NaN,
      message: formRuleMessages().type.number,
    };
  }

  return {
    pattern: /^(\d+\.?\d*|\.\d+)$/,
    type,
    message: formRuleMessages().pattern,
  };
};
