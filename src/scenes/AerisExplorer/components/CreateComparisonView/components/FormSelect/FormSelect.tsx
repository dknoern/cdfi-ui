import React, { ReactNode } from 'react';
import { Select, Form } from 'antd';
import styles from './FormSelect.module.scss';

type FormSelectProps = {
  identifier: string;
  label: string | ReactNode;
  disabled?: boolean;
  mode?: 'multiple' | 'tags' | undefined;
  placeholder?: string;
  options: any;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
};

export const FormSelect = ({
  identifier,
  label,
  mode = undefined,
  disabled = false,
  placeholder = '',
  options,
  value,
  onChange,
}: FormSelectProps) => {
  return (
    <Form.Item name={identifier}>
      <label htmlFor={identifier} className={styles.label}>
        {label}
      </label>
      <Select
        id={identifier}
        placeholder={placeholder}
        mode={mode}
        disabled={disabled}
        options={options}
        onChange={(val) => {
          onChange(val);
        }}
        value={value}
        allowClear
      />
    </Form.Item>
  );
};
