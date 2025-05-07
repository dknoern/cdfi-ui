import React, { ReactNode } from 'react';
import { MetricChangeHistory } from 'types/metricHistory';
import styles from './DataInputForms.module.scss';

export const makeText4MetricChange = (item: MetricChangeHistory): ReactNode => {
  return (
    <>
      Value was changed from{' '}
      <span className={styles.highlighted}>{item.oldValue}</span> to{' '}
      <span className={styles.highlighted}>{item.newValue}</span>.
      {item.reason && <> Reason: {item.reason}</>}
    </>
  );
};
