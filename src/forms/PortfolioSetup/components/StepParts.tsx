import React, { FC } from 'react';
import { Typography } from 'antd';
import styles from './StepParts.module.scss';

const { Title, Paragraph } = Typography;

export const StepTitle: FC = ({ children }) => {
  return (
    <Title level={2} className={styles.stepTitle}>
      {children}
    </Title>
  );
};

export const StepIntro: FC = ({ children }) => {
  return (
    <Paragraph type="secondary" className={styles.stepIntro}>
      {children}
    </Paragraph>
  );
};
