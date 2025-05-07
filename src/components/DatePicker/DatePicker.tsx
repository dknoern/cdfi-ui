import React, { ReactElement, useCallback } from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import { DatePickerProps as AntDatePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';
import { CustomAntInput } from 'types/misc';
import { DEFAULT_DATE_FORMAT } from 'constants/date';
import styles from './DatePicker.module.scss';

type DatePickerProps = Partial<
  Omit<AntDatePickerProps, 'onChange' | 'value' | 'format'>
> &
  CustomAntInput<string> & {
    format?: string;
  };

const isValidDate = (value: string | null, format?: string): boolean =>
  moment(value, format).isValid();

export const DatePicker = ({
  placeholder,
  onChange,
  value,
  name,
  format,
  ...restProps
}: DatePickerProps): ReactElement => {
  const dateFormat = format ?? DEFAULT_DATE_FORMAT;

  let pickerValue = value ? moment(value, dateFormat) : undefined;
  if (!pickerValue?.isValid()) pickerValue = undefined;

  const handleChange = useCallback<NonNullable<AntDatePickerProps['onChange']>>(
    (date, dateStr) => {
      if (onChange) onChange(isValidDate(dateStr, format) ? dateStr : '');
    },
    [onChange, format],
  );

  const handleBlur = useCallback<NonNullable<AntDatePickerProps['onBlur']>>(
    ({ target: { value: inputValue } }) => {
      if (!onChange) return;

      if (inputValue === '' || isValidDate(inputValue, format)) {
        onChange(inputValue);
      }
    },
    [format, onChange],
  );

  return (
    <AntDatePicker
      {...restProps}
      mode="date"
      name={name || 'datePicker'}
      format={dateFormat}
      onChange={handleChange}
      onBlur={handleBlur}
      className={styles.datePicker}
      placeholder={placeholder || 'Select date'}
      value={pickerValue}
    />
  );
};
