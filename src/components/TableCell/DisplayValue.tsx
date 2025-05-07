import React, { FC } from 'react';
import { MetricValue } from 'types/metricValue';
import { WithRecord } from './types';
import { isValueExpandable } from './tools';
import { ExpandValueButton } from './ExpandValueButton';
import styles from './TableCell.module.scss';

type DisplayValueProps = WithRecord<{
  displayValue: MetricValue;
}>;

export const DisplayValue: FC<DisplayValueProps> = React.memo(
  ({ displayValue, record }) => {
    const isLongTextValue = isValueExpandable(record, String(displayValue));

    return isLongTextValue ? (
      <>
        <span className={styles.dataValue}>{displayValue}</span>
        {isLongTextValue && (
          <ExpandValueButton
            value={displayValue}
            question={record.question as string}
          />
        )}
      </>
    ) : (
      <>{displayValue}</>
    );
  },
);
