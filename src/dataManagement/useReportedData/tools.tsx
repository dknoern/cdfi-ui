import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ColumnType } from 'antd/lib/table';
import { MetricSharePeriod } from 'types';
import { DataItem, DataHookConfig, DataCellProps } from 'types/reportedData';
import { metricTypeCheckers } from 'tools';
import { prettifyPeriodStr, parsePeriod } from 'tools/reportedData';

const hasValue = (value: string): boolean => !!value;

// TODO chars from DATA_CHANGE_SIGN
export const removeSpecialChars = (value: string): string => {
  return value.replace(/^[[|~|^]/gm, '');
};

const isLastQuarter = (periodStr: string): boolean =>
  periodStr.slice(-1) === '4';

const renderEmptyFn = (convertEmpty: boolean) => (
  record: DataItem,
  periodStr: string,
): ReactNode => {
  if (!convertEmpty) return '';

  if (
    record.frequency === MetricSharePeriod.ANNUALLY &&
    !isLastQuarter(periodStr)
  )
    return '';

  return (
    <Link
      to={{
        pathname: '/datainput',
        state: { metricId: record.metricId, period: periodStr },
      }}
      style={{ whiteSpace: 'nowrap' }}
    >
      Please add data
    </Link>
  );
};

export const parseColumns = (
  columns: string[],
  config: DataHookConfig,
): ColumnType<DataItem>[] => {
  const { convertEmpty } = config;
  const renderEmpty = renderEmptyFn(convertEmpty || false);

  return columns.map<ColumnType<DataItem>>((col, idx) => {
    const period = parsePeriod(col);
    const dataIndex = period.quarter ? `value${idx}` : `annual${idx}`;

    return {
      title: prettifyPeriodStr(col),
      key: `value${idx}`,
      dataIndex,
      width: 150,
      render: (value, record): ReactNode =>
        hasValue(value) ? removeSpecialChars(value) : renderEmpty(record, col),
      onCell: (record: DataItem): DataCellProps => ({
        record,
        title: col,
        plainValue: record[`value${idx}`] as string,
        dataIndex,
        period,
      }),
      onHeaderCell: (...args: any): Record<string, any> => {
        return {
          period,
        };
      },
    };
  });
};

export const makeValuesObject = (
  values: string[],
): { [key: string]: string } => {
  return Object.fromEntries(values.map((value, idx) => [`value${idx}`, value]));
};

export const convertValues = (data: DataItem[]): DataItem[] => {
  return data.map((item) => ({
    ...item,
    question: metricTypeCheckers.isTextMetric(item) ? item.question : undefined,
    ...makeValuesObject(item.values),
  }));
};
