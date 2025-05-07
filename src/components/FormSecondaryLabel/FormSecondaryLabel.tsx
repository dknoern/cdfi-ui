import React, { FC } from 'react';
import { WithClass } from 'types';
import styles from './FormSecondaryLabel.module.scss';

type Props = {
  text: React.ReactText;
  hint?: React.ReactText;
} & WithClass;

export const FormSecondaryLabel: FC<Props> = ({ text, hint, className }) => {
  const wrapperClassName = `${styles.secondaryLabel}${
    className ? ` ${className}` : ''
  }`;

  return (
    <span className={wrapperClassName}>
      {text}
      {!!hint && <span className={styles.hint}>{hint}</span>}
    </span>
  );
};
