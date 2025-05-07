import { DatePickerProps } from 'antd/lib/date-picker';
import { MetricType } from 'types';
import { metricValueRules } from 'constants/forms';
import { inputNumberParser } from 'tools';
import { getPopupContainer } from 'tools/antConfig';
import styles from './TableCell.module.scss';

export const formItemProps = {
  [MetricType.TEXT]: { rules: metricValueRules.TEXT },
  [MetricType.NUMERIC]: {
    rules: metricValueRules.NUMERIC,
    getValueFromEvent: (value: string): number => Number(value),
    validateFirst: true,
  },
  [MetricType.BOTH]: {},
};

export const inputElementProps = {
  [MetricType.NUMERIC]: {
    placeholder: 'Input a number',
    decimalSeparator: '.',
    parser: inputNumberParser,
    className: styles.numberInput,
  },
  [MetricType.TEXT]: {
    placeholder: 'Input a value',
  },
};

export const TEXT_METRIC_VALUE_VISIBLE_LENGTH = 40;

export const ESC_KEY = 'Escape';
