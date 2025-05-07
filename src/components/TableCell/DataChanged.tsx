import React, { FC } from 'react';
import { Button } from 'antd';
import { uiText } from 'constants/uiText';
import { TableCellButton, WithRecord } from './types';
import { DisplayValue } from './DisplayValue';
import styles from './TableCell.module.scss';

type DataChangedProps = WithRecord<TableCellButton>;

export const DataChanged: FC<DataChangedProps> = ({
  onClick,
  value,
  record,
}) => {
  return (
    <Button
      type="link"
      onClick={onClick}
      className={`${styles.tableButton} ${styles.dataChangedButton}`}
      title={uiText('dataInput', 'changeApprovedCell')}
    >
      <DisplayValue record={record} displayValue={value} />
    </Button>
  );
};
