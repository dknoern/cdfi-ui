import React, { ReactNode } from 'react';
import { Col, Empty } from 'antd';
import { Portfolio, PCCompanyCard, FMCompanyCard, Investment } from 'types';
import {
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_QUARTER_ROW_SPAN,
  GRID_COL_THIRD_ROW_SPAN,
} from 'constants/ui';
import {
  CardParent,
  DashboardCardType,
  EntityViewMode,
} from 'scenes/Dashboard/types';
import { DashboardItemCard, DashboardListCard } from '../components';

type Item = PCCompanyCard | Portfolio | FMCompanyCard | Investment;
type Args = {
  dashboardCardType: DashboardCardType;
  template: Item[];
  isLoading: boolean;
  items: Item[] | null;
  emptyText: ReactNode;
  viewMode: EntityViewMode;
  parent?: CardParent;
};

export const renderDashboardContent = ({
  dashboardCardType,
  template,
  isLoading,
  items,
  emptyText,
  viewMode,
  parent,
}: Args): ReactNode => {
  if (!isLoading && items && !items.length) {
    return (
      <Col span={GRID_COL_FULL_ROW_SPAN}>
        <Empty description={emptyText} style={{ color: '#262626' }} />
      </Col>
    );
  }

  switch (viewMode) {
    case 'LIST':
      return (items || template).map((item) => (
        <Col key={item.id} span={GRID_COL_FULL_ROW_SPAN}>
          <DashboardListCard
            item={item as Portfolio}
            type={dashboardCardType}
            isLoading={isLoading}
          />
        </Col>
      ));
    case 'CARDS':
    default:
      return (items || template).map((item) => (
        <Col
          xs={GRID_COL_FULL_ROW_SPAN}
          sm={GRID_COL_HALF_ROW_SPAN}
          md={GRID_COL_THIRD_ROW_SPAN}
          xxl={GRID_COL_QUARTER_ROW_SPAN}
          key={item.id}
        >
          <DashboardItemCard
            item={item}
            type={dashboardCardType}
            isLoading={isLoading}
            parent={parent}
          />
        </Col>
      ));
  }
};
