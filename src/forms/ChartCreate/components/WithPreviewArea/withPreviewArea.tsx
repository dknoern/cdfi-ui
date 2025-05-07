import React, { ComponentType } from 'react';
import { Row, Col } from 'antd';
import { GRID_COL_HALF_ROW_SPAN } from 'constants/ui';
import { PreviewArea } from '../PreviewArea';
import styles from './WithPreviewArea.module.scss';

export const withPreviewArea = <T,>(Component: ComponentType<T>) => (
  props: T,
): JSX.Element => (
  <Row className={styles.container}>
    <Col span={GRID_COL_HALF_ROW_SPAN} className={styles.workArea}>
      <Component {...props} />
    </Col>
    <Col span={GRID_COL_HALF_ROW_SPAN} className={styles.previewArea}>
      <PreviewArea isEdit={(props as any).isEdit} />
    </Col>
  </Row>
);
