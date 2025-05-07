import React, { FC, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Row, Col } from 'antd';
import { uiText } from 'constants/uiText';
import { GRID_GUTTER, GRID_COL_FULL_ROW_SPAN } from 'constants/ui';
import { notifyUser, showAPIError } from 'tools';
import { useCurrentAerisDashboard } from 'dataManagement';
import { dataMan } from 'dataManagement/managers';
import { UpdateGraphHandler } from './types';
import { extractAllDashboardChartsIds } from './tools';
import { ChartCategory } from './ChartCategory';

const mgr = dataMan.managers.aerisDashboardManager;

export const AerisChartsSectionFn: FC = () => {
  const { data, reload } = useCurrentAerisDashboard();
  const chartCategories = useMemo(() => data?.graphCategories ?? [], [data]);
  // Leave this code here in case we want to allow some updates to the graphs
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
        if (index === 1) {
          const isFullSizedCategory =
            chartCategories.length % 2 > 0 &&
            index === chartCategories.length - 1;
          return (
            <Col span={GRID_COL_FULL_ROW_SPAN} key={chartCategory.id}>
              <ChartCategory
                chartCategory={chartCategory}
                isFullSizedCategory={isFullSizedCategory}
                onChartUpdate={handleUpdateGraphCategory}
                allDashboardCharts={extractAllDashboardChartsIds(
                  chartCategories,
                )}
              />
            </Col>
          );
        }
        return null;
      })}
    </Row>
  );
};

export const AerisChartsSection = observer(AerisChartsSectionFn);
