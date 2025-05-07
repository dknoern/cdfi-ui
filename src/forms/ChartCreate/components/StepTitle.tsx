import React, { FC } from 'react';
import { Typography } from 'antd';
import { WithClass } from 'types';
import styles from './Components.module.scss';

const { Title, Text } = Typography;

type StepTitleProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
} & WithClass;
export const StepTitle: FC<StepTitleProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <header className={`${styles.titleBlock} ${className ?? ''}`}>
      <Title level={4} className={styles.stepTitle}>
        {title}
      </Title>
      {!!description && (
        <Text type="secondary" className={styles.stepDescription}>
          {description}
        </Text>
      )}
    </header>
  );
};
