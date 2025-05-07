import React, { FC, useCallback } from 'react';
import { MetricSharePeriod, VoidFn } from 'types';
import { DataItem, DataCellProps } from 'types/reportedData';
import { MetricRequestStatus } from 'types/metricRequestStatus';
import { dataMan } from 'dataManagement/managers';
import { removeSpecialChars } from 'dataManagement/useReportedData/tools';
import { DataEditor, NewPeriodDataChanger } from './types';
import {
  DataRequired,
  DataChanged,
  DataDefault,
  IncomingRequest,
  OutGoingRequest,
  DisabledCell,
  InputField,
  Name,
} from './cellContent';
import { AnnualSummaryCell } from './AnnualSummaryCell';
import {
  hasValue,
  valueChanged,
  hasRequest,
  isAnnualSummaryValue,
} from './tools';

const metricMan = dataMan.managers.metrics;

type TableCellProps = {
  record: DataItem;
  title: string;
  isNewCell?: boolean;
} & Partial<Omit<DataCellProps, 'record' | 'title'>>;

interface Renderer {
  ({
    startEditValue,
    startRequestReview,
    changeData,
    reloadReport,
  }: {
    startEditValue: DataEditor;
    startRequestReview: DataEditor;
    changeData?: NewPeriodDataChanger;
    reloadReport?: VoidFn;
  }): FC<TableCellProps>;
}

export const tableCellRenderer: Renderer = ({
  startEditValue,
  startRequestReview,
  changeData,
  reloadReport,
}) => ({
  isNewCell,
  record,
  children,
  period,
  plainValue,
  dataIndex,
  title,
  ...restProps
}): JSX.Element => {
  const displayValue = removeSpecialChars(plainValue ?? '');
  const { metricId, frequency, isCatLine } = record || {};

  const startEdit = useCallback(() => {
    if (!period) return;

    startEditValue({
      metricId,
      period,
      value: displayValue,
    });
  }, [metricId, period, displayValue]);

  const startRequest = useCallback(() => {
    if (!period) return;

    startRequestReview({
      metricId,
      period,
      value: displayValue,
    });
  }, [displayValue, metricId, period]);

  // metricName or categoryName cell
  if (!dataIndex) {
    return (
      <td {...restProps}>
        <Name>{children}</Name>
      </td>
    );
  }

  // BUGFIX: wrong metric list from BE
  if (metricId && !metricMan.metricConfig[metricId]) {
    return (
      <td {...restProps}>
        <DisabledCell />
      </td>
    );
  }

  if (isAnnualSummaryValue(dataIndex) && !isCatLine) {
    return <AnnualSummaryCell value={displayValue} {...restProps} />;
  }

  let childNode = children;

  // we don't require data for 1-3 periods for ANNUAL metrics
  const dataNeeded =
    period && (frequency === MetricSharePeriod.QUARTERLY || period.quarter > 3);

  switch (true) {
    case isCatLine:
      // do nothing
      break;
    case !dataNeeded:
      childNode = <DisabledCell />;
      break;
    case isNewCell:
      if (changeData)
        childNode = (
          <InputField
            record={record}
            title={title}
            onChange={changeData}
            metricTypeConfig={metricMan.metricConfig[metricId].typeConfig}
          />
        );
      break;
    case hasRequest('incoming')(plainValue):
      childNode = (
        <IncomingRequest
          value={displayValue}
          onClick={startRequest}
          record={record}
        />
      );
      break;
    case record.requestStatus !== MetricRequestStatus.APPROVED:
      // deleted metric etc.
      childNode = displayValue;
      break;
    case hasRequest('outgoing')(plainValue):
      childNode = (
        <OutGoingRequest
          value={displayValue}
          onClick={startEdit}
          record={record}
        />
      );
      break;
    case valueChanged(plainValue, record):
      childNode = (
        <DataChanged value={displayValue} onClick={startEdit} record={record} />
      );
      break;
    case !hasValue(plainValue):
      if (period)
        childNode = (
          <DataRequired
            period={period}
            record={record}
            title={title}
            metric={metricMan.metricConfig[metricId]}
            onCommit={reloadReport}
          />
        );
      break;
    default:
      childNode = (
        <DataDefault value={displayValue} onClick={startEdit} record={record} />
      );
  }

  return <td {...restProps}>{childNode}</td>;
};
