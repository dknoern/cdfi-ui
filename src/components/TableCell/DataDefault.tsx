import React, { FC } from 'react';
import { Button } from 'antd';
import { uiText } from 'constants/uiText';
import { TableCellButton, WithRecord } from './types';
import { DisplayValue } from './DisplayValue';
import styles from './TableCell.module.scss';

type DataDefaultProps = WithRecord<TableCellButton>;

export const DataDefault: FC<DataDefaultProps> = ({
  onClick,
  value,
  record,
}) => {
  return (
    <Button
      type="link"
      onClick={onClick}
      className={`${styles.tableButton} ${styles.dataButton}`}
      title={uiText('dataInput', 'defaultCell')}
    >
      <DisplayValue record={record} displayValue={value} />
    </Button>
  );
};
