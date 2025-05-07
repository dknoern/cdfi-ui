import React, { ReactNode, useCallback, useState, useMemo } from 'react';
import { Form, Input, InputNumber } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { MetricType, VoidFn, MetricTypeConfig } from 'types';
import { DataItem } from 'types/reportedData';
import { MetricValue } from 'types/metricValue';
import { DatePicker } from 'components';
import { unicodeFormat2moment } from 'tools/date';
import { NewPeriodDataChanger } from './types';
import { formItemProps, inputElementProps, ESC_KEY } from './constants';
import styles from './TableCell.module.scss';

type InputFieldProps = {
  record: DataItem;
  metricTypeConfig: MetricTypeConfig;
  title: string;
  onChange: NewPeriodDataChanger;
  onSubmit?: VoidFn;
  onCancel?: VoidFn;
  disabled?: boolean;
};

export const InputField = React.forwardRef<Input, InputFieldProps>(
  (
    {
      record,
      title,
      onChange,
      onSubmit,
      onCancel,
      disabled = false,
      metricTypeConfig,
    },
    ref,
  ) => {
    const { metricId, type } = record;
    const [hasErrors, setHasErrors] = useState(false);

    const handleKeyDown = useCallback(
      (event) => {
        if (onCancel && event.key === ESC_KEY) {
          onCancel();
        }
      },
      [onCancel],
    );

    const formItemName = useMemo(() => [record.name, title], [
      record.name,
      title,
    ]);

    const handleInputValidation = useCallback<(form: FormInstance) => void>(
      (form) => {
        form
          .validateFields([formItemName])
          .then(() => {
            setHasErrors(false);
          })
          .catch(() => {
            setHasErrors(true);
          });
      },
      [formItemName],
    );

    const renderInner = useCallback(
      (formInstance: FormInstance): ReactNode => {
        const submitHandler = (): void => {
          if (!onSubmit || hasErrors) return;

          onSubmit();
        };

        switch (type) {
          case MetricType.NUMERIC:
            return (
              <InputNumber
                {...inputElementProps[MetricType.NUMERIC]}
                onChange={(value): void => {
                  onChange({ metricId, value: value as MetricValue });
                  handleInputValidation(formInstance as FormInstance);
                }}
                onBlur={submitHandler}
                onPressEnter={submitHandler}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                ref={ref}
              />
            );
          case MetricType.TEXT:
          default:
            return (
              <Input
                {...inputElementProps[MetricType.TEXT]}
                onChange={(event): void => {
                  onChange({ metricId, value: event.target.value });
                  handleInputValidation(formInstance as FormInstance);
                }}
                onBlur={submitHandler}
                onPressEnter={submitHandler}
                disabled={disabled}
                ref={ref}
              />
            );
        }
      },
      [
        disabled,
        handleInputValidation,
        handleKeyDown,
        hasErrors,
        metricId,
        metricTypeConfig.dateFormat,
        onChange,
        onSubmit,
        ref,
        type,
      ],
    );

    return (
      <Form.Item noStyle shouldUpdate>
        {(formInstance): ReactNode => (
          <Form.Item
            name={formItemName}
            className={styles.input}
            {...formItemProps[record.type]}
          >
            {renderInner(formInstance as FormInstance)}
          </Form.Item>
        )}
      </Form.Item>
    );
  },
);
