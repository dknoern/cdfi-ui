import React, { FC, ReactNode } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import styles from './KpiCard.module.scss';

const { Text } = Typography;

type KpiCardProps = {
  title: ReactNode;
  value: number | string;
  loading?: boolean;
  smallValue?: boolean;
};

export const KpiCard: FC<KpiCardProps> = ({
  title,
  value,
  loading,
  smallValue,
}) => {
  return (
    <Card bordered={false} className={styles.card} loading={loading}>
      <Row
        justify="space-between"
        align="middle"
        className={styles.contentWrapper}
      >
        <Col className={styles.textCol}>
          <Text className={styles.title}>{title}</Text>
        </Col>
        <Col
          className={`${styles.valueCol} ${
            smallValue ? styles.valueColSmall : ''
          }`}
        >
          {value}
        </Col>
      </Row>
    </Card>
  );
};
