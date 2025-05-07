import React, { FC } from 'react';
import { uiText } from 'constants/uiText';
import styles from './TableCell.module.scss';

export const DisabledCell: FC = () => {
  return (
    <div
      className={styles.disabledContent}
      title={uiText('dataInput', 'notRequiredCell')}
    />
  );
};
