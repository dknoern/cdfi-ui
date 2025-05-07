import React, { FC, useCallback, useState } from 'react';
import { Col, Row } from 'antd';
import { DashboardChartCategory } from 'types';
import { GraphMeta } from 'types/graphs';
import {
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_QUARTER_ROW_SPAN,
  GRID_COL_THIRD_ROW_SPAN,
  GRID_GUTTER,
} from 'constants/ui';
import { PageSectionWrapper } from 'components';
import { userStore, workDataStore } from 'store';
import { ToggleChartHandler, UpdateGraphHandler } from './types';
import { AddChartButton } from './AddChartButton';
import { SmallChart } from './SmallChart';
import { AddChartCard } from './AddChartCard';

type ChartCategoryType = {
  chartCategory: DashboardChartCategory;
  isFullSizedCategory: boolean;
  onChartUpdate: UpdateGraphHandler;
  allDashboardCharts: GraphMeta['id'][];
};

export const ChartCategory: FC<ChartCategoryType> = ({
  chartCategory,
  isFullSizedCategory,
  onChartUpdate,
  allDashboardCharts,
}) => {
  const { companyId } = userStore;
  const { portfolioId } = workDataStore.viewModeConfig;

  const handleAdd = useCallback<ToggleChartHandler>(
    (graphId) => {
      onChartUpdate({
        ...chartCategory,
        graphs: [...chartCategory.graphs, graphId],
      });
    },
    [onChartUpdate, chartCategory],
  );

  const handleDelete = useCallback<ToggleChartHandler>(
    (graphId) => {
      onChartUpdate({
        ...chartCategory,
        graphs: chartCategory.graphs.filter((id) => id !== graphId),
      });
    },
    [onChartUpdate, chartCategory],
  );

  return (
    <PageSectionWrapper title={chartCategory.name} key={chartCategory.id}>
      <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
        {chartCategory.graphs.map((graphId) => (
          <Col
            xxl={
              isFullSizedCategory
                ? GRID_COL_QUARTER_ROW_SPAN
                : GRID_COL_HALF_ROW_SPAN
            }
            lg={
              isFullSizedCategory
                ? GRID_COL_THIRD_ROW_SPAN
                : GRID_COL_FULL_ROW_SPAN
            }
            md={
              isFullSizedCategory
                ? GRID_COL_HALF_ROW_SPAN
                : GRID_COL_FULL_ROW_SPAN
            }
            xs={GRID_COL_FULL_ROW_SPAN}
            key={graphId}
          >
            <SmallChart
              graphId={graphId}
              portfolioId={portfolioId ?? undefined}
              companyId={companyId ?? undefined}
              onDeleteChart={handleDelete}
            />
          </Col>
        ))}
      </Row>
    </PageSectionWrapper>
  );
};
