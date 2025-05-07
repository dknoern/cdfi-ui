import React, { FC, useRef, useCallback } from 'react';
import { InputNumber } from 'antd';
import { InputNumberProps } from 'antd/lib/input-number';
import { WithClass } from 'types';
import { inputNumberFormatter, inputNumberParser } from 'tools';

type FormattedNumberInputProps = {
  value?: number;
  onChange?: (value: number) => void;
} & WithClass;

export const FormattedNumberInput: FC<FormattedNumberInputProps> = ({
  value,
  onChange,
  className,
}) => {
  const inputValueRef = useRef<number | null>(null);

  const onInputValueChange: NonNullable<
    InputNumberProps['onChange']
  > = useCallback(
    (newValue) => {
      if (typeof newValue !== 'number' || newValue === inputValueRef.current) {
        return;
      }

      inputValueRef.current = newValue;

      if (onChange) {
        onChange(newValue);
      }
    },
    [onChange],
  );

  return (
    <InputNumber
      value={value}
      onChange={onInputValueChange}
      parser={inputNumberParser}
      formatter={inputNumberFormatter}
      placeholder="0"
      className={className}
    />
  );
};
