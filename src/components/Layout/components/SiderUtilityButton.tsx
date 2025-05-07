import React, { FC } from 'react';
import { VoidFn } from 'types/misc';
import { ButtonTag } from 'components/Layout/components/types';
import styles from './SiderUtilityButton.module.scss';

type SiderUtilityButtonProps = {
  onClick?: VoidFn;
  tag?: ButtonTag;
  href?: string;
};

export const SiderUtilityButton: FC<SiderUtilityButtonProps> = ({
  onClick,
  children,
  tag = ButtonTag.BUTTON,
  href,
}) => {
  return (
    <div className={styles.container}>
      {tag === ButtonTag.A && (
        <a href={href} className={styles.button}>
          {children}
        </a>
      )}
      {tag === ButtonTag.BUTTON && (
        <button onClick={onClick} type="button" className={styles.button}>
          {children}
        </button>
      )}
    </div>
  );
};
