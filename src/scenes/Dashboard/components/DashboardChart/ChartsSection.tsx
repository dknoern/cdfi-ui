import React, { FC, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Row, Col } from 'antd';
import { uiText } from 'constants/uiText';
import {
  GRID_GUTTER,
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_FULL_ROW_SPAN,
} from 'constants/ui';
import { notifyUser, showAPIError } from 'tools';
import { useCurrentDashboard } from 'dataManagement';
import { dataMan } from 'dataManagement/managers';
import { UpdateGraphHandler } from './types';
import { extractAllDashboardChartsIds } from './tools';
import { ChartCategory } from './ChartCategory';

const mgr = dataMan.managers.dashboard;

export const ChartsSectionFn: FC = () => {
  const { data, reload } = useCurrentDashboard();

  const chartCategories = useMemo(() => data?.graphCategories ?? [], [data]);

  const handleUpdateGraphCategory = useCallback<UpdateGraphHandler>(
    (chartCat) => {
      mgr
        .updateGraphCategory(chartCat.id, chartCat)
        .then(() => {
          notifyUser.ok(uiText('dashboard', 'graphUpdateOk'));
          reload();
        })
        .catch(showAPIError(uiText('dashboard', 'graphUpdateError')));
    },
    [reload],
  );

  return (
    <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
      {chartCategories.map((chartCategory, index) => {
        const isFullSizedCategory =
          chartCategories.length % 2 > 0 &&
          index === chartCategories.length - 1;
        return (
          <Col
            span={
              isFullSizedCategory
                ? GRID_COL_FULL_ROW_SPAN
                : GRID_COL_HALF_ROW_SPAN
            }
            key={chartCategory.id}
          >
            <ChartCategory
              chartCategory={chartCategory}
              isFullSizedCategory={isFullSizedCategory}
              onChartUpdate={handleUpdateGraphCategory}
              allDashboardCharts={extractAllDashboardChartsIds(chartCategories)}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export const ChartsSection = observer(ChartsSectionFn);
