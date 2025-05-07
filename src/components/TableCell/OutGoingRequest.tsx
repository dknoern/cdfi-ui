import React, { FC } from 'react';
import { Button } from 'antd';
import { uiText } from 'constants/uiText';
import { TableCellButton, WithRecord } from './types';
import { DisplayValue } from './DisplayValue';
import styles from './TableCell.module.scss';

type OutGoingRequestProps = WithRecord<TableCellButton>;

export const OutGoingRequest: FC<OutGoingRequestProps> = ({
  onClick,
  value,
  record,
}) => {
  return (
    <Button
      type="link"
      onClick={onClick}
      className={`${styles.tableButton} ${styles.withOutgoingRequest}`}
      title={uiText('dataInput', 'outgoingRequestCell')}
    >
      <DisplayValue record={record} displayValue={value} />
    </Button>
  );
};
