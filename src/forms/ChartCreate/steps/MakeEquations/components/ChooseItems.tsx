import React, { FC, useCallback, useState, useMemo } from 'react';
import { Col, Row } from 'antd';
import { GlobalMetric } from 'types';
import { GRID_GUTTER, GRID_COL_HALF_ROW_SPAN } from 'constants/ui';
import { onlyNumericMetrics } from 'tools/filter';
import { Functions } from './Functions';
import { MathematicalNotations } from './MathematicalNotations';
import { Metrics } from './Metrics';
import styles from '../MakeEquations.module.scss';

type ChooseItemsProps = {
  metrics: GlobalMetric[];
  addToEquation: (value: string) => void;
};

export const ChooseItems: FC<ChooseItemsProps> = ({
  metrics,
  addToEquation,
}) => {
  const [metricsRangeStart, setMetricsRangeStart] = useState<number>(-1);

  const filteredMetrics = useMemo(() => metrics.filter(onlyNumericMetrics), [
    metrics,
  ]);

  const handleMetricsShiftClick = useCallback(
    (metricsRangeEnd: number, index: number): void => {
      const startFrom = index;
      const metricsRange = filteredMetrics
        .slice(metricsRangeStart, startFrom + 1)
        .map((metric, metricIndex) =>
          metricIndex === 0 ? `"${metric.accountCode}"` : metric.accountCode,
        )
        .reduce((prev, cur) => `${prev}, ${cur}#`);
      addToEquation(metricsRange);
      setMetricsRangeStart(-1);
    },
    [metricsRangeStart, addToEquation, setMetricsRangeStart, filteredMetrics],
  );

  const handleMetricsClick = useCallback(
    (event, index: number) => {
      if (event.shiftKey) {
        const metricsRangeEnd = -1;
        if (metricsRangeStart < 0) {
          setMetricsRangeStart(index);
        } else if (index > metricsRangeStart) {
          handleMetricsShiftClick(metricsRangeEnd, index);
        } else {
          setMetricsRangeStart(-1);
        }
      } else {
        addToEquation(`${filteredMetrics[index].accountCode}#`);
      }
    },
    [
      addToEquation,
      filteredMetrics,
      metricsRangeStart,
      handleMetricsShiftClick,
    ],
  );

  return (
    <Row gutter={[GRID_GUTTER, 0]}>
      <Col span={GRID_COL_HALF_ROW_SPAN} className={styles.metricsCol}>
        <Metrics
          metrics={filteredMetrics}
          handleMetricsClick={handleMetricsClick}
        />
      </Col>
      <Col className={styles.functionsCol} span={4}>
        <Functions addToEquation={addToEquation} />
      </Col>
      <Col span={6}>
        <MathematicalNotations addToEquation={addToEquation} />
      </Col>
    </Row>
  );
};
