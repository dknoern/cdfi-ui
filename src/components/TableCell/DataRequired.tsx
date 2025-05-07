import React, { FC, useState, useCallback, useRef } from 'react';
import { Button, Input } from 'antd';
import { VoidFn } from 'types';
import { MetricType } from 'types/metricType';
import { Metric } from 'types/metric';
import { MetricValue } from 'types/metricValue';
import { DataItem, ReportingPeriod } from 'types/reportedData';
import { uiText } from 'constants/uiText';
import { userStore, workDataStore } from 'store';
import { saveMetricAdjustment } from 'components/ReportedDataManager/tools';
import { NewPeriodDataChanger } from './types';
import { makeCellButtonClass } from './tools';
import { InputField } from './InputField';
import { RequiredCellContent } from './RequiredCellContent';

const defaultValue = '';

// TODO
// currently metric can be undefined till data loading
type DataRequiredProps = {
  record: DataItem;
  title: string;
  period: ReportingPeriod;
  metric: Metric;
  onCommit?: VoidFn;
};

export const DataRequired: FC<DataRequiredProps> = ({
  record,
  title,
  period,
  metric,
  onCommit,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<MetricValue>(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<Input>(null);

  const commitValue = useCallback(
    (value) => {
      if (value === '') {
        setEditMode(false);
        return;
      }

      setIsLoading(true);
      saveMetricAdjustment({
        period,
        metricId: record.metricId,
        companyId:
          workDataStore.viewModeConfig.companyId ?? userStore.info.companyId,
        value,
        oldValue: '',
        reason: 'Initial data entry',
      })
        .then(() => {
          if (record.type !== MetricType.TEXT && onCommit) onCommit();
        })
        .catch(() => {
          setCurrentValue(defaultValue);
        })
        .finally(() => {
          setEditMode(false);
          setIsLoading(false);
        });
    },
    [onCommit, period, record.metricId, record.type],
  );

  const commitCurrentValue = useCallback((): void => {
    commitValue(currentValue);
  }, [commitValue, currentValue]);

  const internalChange = useCallback<NewPeriodDataChanger>(
    ({ value: inputValue, commitImmediately }) => {
      if (
        record.type === MetricType.NUMERIC &&
        Number.isNaN(Number(inputValue as string))
      )
        return;

      setCurrentValue(inputValue);

      if (commitImmediately) {
        commitValue(inputValue);
      }
    },
    [commitValue, record.type],
  );

  const startEdit = useCallback((): void => {
    setEditMode(true);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 0);
  }, []);

  const cancelEdit = useCallback(() => {
    setCurrentValue(defaultValue);
    setEditMode(false);
  }, []);

  if (editMode) {
    return (
      <InputField
        record={record}
        title={title}
        onChange={internalChange}
        onSubmit={commitCurrentValue}
        onCancel={cancelEdit}
        disabled={isLoading}
        ref={inputRef}
        metricTypeConfig={metric.typeConfig}
      />
    );
  }

  return (
    <Button
      type="link"
      onClick={startEdit}
      className={makeCellButtonClass(currentValue)}
      title={uiText('dataInput', 'dataRequiredCell')}
    >
      <RequiredCellContent
        currentValue={currentValue}
        metricTypeConfig={metric.typeConfig}
        record={record}
      />
    </Button>
  );
};
