import { DATA_CHANGE_SIGN, DataItem } from 'types/reportedData';
import { MetricType } from 'types';
import { MetricValue } from 'types/metricValue';
import { userStore } from 'store';
import { TEXT_METRIC_VALUE_VISIBLE_LENGTH } from './constants';
import styles from './TableCell.module.scss';

export const valueChanged = (
  value: string | undefined,
  record?: DataItem,
): boolean => {
  return (
    typeof value === 'string' &&
    value.substr(0, 1) === DATA_CHANGE_SIGN.APPROVED
  );
};

export const hasRequest = (requestType: 'incoming' | 'outgoing') => (
  value: string | undefined,
): boolean => {
  if (!value) return false;

  const checkSign =
    requestType === 'incoming'
      ? DATA_CHANGE_SIGN.PENDING_INCOMING
      : DATA_CHANGE_SIGN.PENDING_OUTGOING;

  return value.substr(0, 1) === checkSign;
};

export const hasValue = (plainValue: string | undefined): boolean => {
  return !!plainValue && !!plainValue.length;
};

export const makeCellButtonClass = (currentValue: MetricValue): string => {
  return `${styles.tableButton} ${
    currentValue !== '' || userStore.isFM
      ? styles.dataButton
      : styles.dataNeededButton
  }`;
};

export const isAnnualSummaryValue = (dataIndex: string): boolean =>
  dataIndex.indexOf('annual') > -1;

export const isValueExpandable = (
  data: DataItem,
  displayValue: string,
): boolean => {
  return (
    data.type === MetricType.TEXT &&
    displayValue.length > TEXT_METRIC_VALUE_VISIBLE_LENGTH
  );
};
