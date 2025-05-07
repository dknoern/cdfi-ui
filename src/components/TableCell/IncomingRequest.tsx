import React, { FC } from 'react';
import { Button } from 'antd';
import { uiText } from 'constants/uiText';
import { TableCellButton, WithRecord } from './types';
import { DisplayValue } from './DisplayValue';
import styles from './TableCell.module.scss';

type IncomingRequestProps = WithRecord<TableCellButton>;

export const IncomingRequest: FC<IncomingRequestProps> = ({
  onClick,
  value,
  record,
}) => {
  return (
    <Button
      type="link"
      onClick={onClick}
      className={`${styles.tableButton} ${styles.withIncomingRequestButton}`}
      title={uiText('dataInput', 'incomingRequestCell')}
    >
      <DisplayValue record={record} displayValue={value} />
    </Button>
  );
};
