import React, { FC } from 'react';
import { Button } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { ReportingPeriod } from 'types/reportedData';
import { PeriodDeleteHandler } from './types';
import styles from './ReportedDataManager.module.scss';

interface HeaderCellProps {
  period?: ReportingPeriod;
}
interface Renderer {
  (onPeriodDelete: PeriodDeleteHandler): FC<HeaderCellProps>;
}

export const headerCellRenderer: Renderer = (onPeriodDelete) => ({
  period,
  children,
  ...restProps
}): React.ReactElement => {
  if (!period || !period?.quarter) {
    return <th {...restProps}>{children}</th>;
  }

  return (
    <th {...restProps}>
      <div className={styles.periodHeaderCell}>
        <span>{children}</span>
        <Button
          type="text"
          size="small"
          icon={<DeleteFilled />}
          className={styles.button}
          onClick={(): void => {
            onPeriodDelete(period);
          }}
        />
      </div>
    </th>
  );
};
