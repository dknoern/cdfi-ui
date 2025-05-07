import React, { FC, ReactNode } from 'react';
import { Avatar } from 'antd';
import styles from './HeaderButton.module.scss';

type HeaderButtonProps = {
  icon: ReactNode;
};

export const HeaderButton: FC<HeaderButtonProps> = ({ icon, children }) => {
  return (
    <Avatar shape="square" icon={icon} className={styles.headerButton}>
      {children}
    </Avatar>
  );
};
