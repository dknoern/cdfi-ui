import React, { FC } from 'react';
import { Radio, Row, Col, Typography } from 'antd';
import { RadioGroupProps } from 'antd/lib/radio';
import { GRID_GUTTER } from 'constants/ui';
import { chartTypes } from '../constants';
import styles from './ChartTypeSelector.module.scss';

const { Text } = Typography;

type ChartTypeSelectorProps = {
  value?: string;
  onChange?: RadioGroupProps['onChange'];
};

export const ChartTypeSelector: FC<ChartTypeSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <Radio.Group id="formatChart_type" onChange={onChange} value={value}>
      <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
        {chartTypes.map((chartType) => (
          <Col key={chartType.type}>
            <Radio.Button
              value={chartType.type}
              className={styles.chartTypeButton}
            >
              <Text className={styles.label}>{chartType.label}</Text>
              <Text className={styles.description}>
                {chartType.description}
              </Text>
              <div className={styles.iconWrapper}>
                <img src={chartType.icon} alt={chartType.label} />
              </div>
            </Radio.Button>
          </Col>
        ))}
      </Row>
    </Radio.Group>
  );
};
