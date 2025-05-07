import React from 'react';
import { Col, Row } from 'antd';
import { Kpi } from 'types';
import {
  GRID_GUTTER,
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_HALF_ROW_SPAN,
} from 'constants/ui';
import { PageSectionWrapper } from 'components';
import { KpiCard } from './KpiCard';
import styles from './KpiSection.module.scss';

type KpiSectionProps = {
  isLoading?: boolean;
  kpi: (Kpi & { smallValue?: boolean })[];
  title?: string;
};

export const KpiSection = React.memo<KpiSectionProps>(({ kpi, title }) => {
  return (
    <PageSectionWrapper title={title ?? 'General Updates'}>
      <Row id="kpiContainer" gutter={[GRID_GUTTER, GRID_GUTTER]} align="top">
        {kpi.map((card) => (
          <Col
            key={card.id}
            xs={GRID_COL_FULL_ROW_SPAN}
            lg={GRID_COL_HALF_ROW_SPAN}
            xxl={GRID_COL_FULL_ROW_SPAN / kpi.length}
            flex="auto"
            className={styles.cardCol}
          >
            <KpiCard {...card} />
          </Col>
        ))}
      </Row>
    </PageSectionWrapper>
  );
});
