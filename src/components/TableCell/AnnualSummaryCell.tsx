import React, { FC } from 'react';
import styles from './AnnualSummaryCell.module.scss';

type AnnualSummaryCellProps = {
  value?: string;
};

export const AnnualSummaryCell: FC<AnnualSummaryCellProps> = ({
  value,
  ...rest
}) => {
  return (
    <td {...rest} className={styles.cell}>
      {value}
    </td>
  );
};
