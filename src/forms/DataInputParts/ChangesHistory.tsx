import React, { FC } from 'react';
import { Row, Col } from 'antd';
import { GRID_GUTTER, GRID_COL_FULL_ROW_SPAN } from 'constants/ui';
import { MetricChangeHistory } from 'types/metricHistory';
import { makeText4MetricChange } from './tools';
import styles from './DataInputForms.module.scss';

type ChangesHistoryProps = {
  changesHistory: MetricChangeHistory[];
};
export const ChangesHistory: FC<ChangesHistoryProps> = ({
  changesHistory,
}: ChangesHistoryProps) => (
  <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
    <Col span={GRID_COL_FULL_ROW_SPAN}>
      <h5 className={styles.formLabel}>History of changes</h5>
      <div className={styles.history}>
        {changesHistory.map((item) => (
          <div className={styles.historyInfo} key={item.id}>
            <span className={styles.name}>{item.personName}</span>
            <span className={styles.time}>{item.created}</span>
            <div>{makeText4MetricChange(item)}</div>
          </div>
        ))}
      </div>
    </Col>
  </Row>
);
