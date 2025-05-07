import React, { FC } from 'react';
import { Typography } from 'antd';
import { WithClass } from 'types';
import styles from './InnerPage.module.scss';

const { Title } = Typography;

export const InnerPageTitle: FC<WithClass & { ellipsis?: boolean }> = ({
  className,
  children,
  ellipsis = true,
}) => {
  return (
    <Title
      level={2}
      className={`${styles.title} ${ellipsis ? styles.ellipsis : ''} ${
        className ?? ''
      }`}
    >
      {children}
    </Title>
  );
};
