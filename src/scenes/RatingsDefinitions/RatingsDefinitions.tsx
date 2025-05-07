import React from 'react';
import { Col, Row } from 'antd';
import { PageSectionWrapper } from 'components';
import { ImpactPerformance } from './ImpactPerformance';
import { FinancialPerformance } from './FinancialPerformance';
import { StarFilled } from '@ant-design/icons';
import {
  GRID_HORIZONTAL_GUTTER,
  GRID_COL_THIRD_ROW_SPAN,
  GRID_COL_HALF_ROW_SPAN,
} from 'constants/ui';

export const RatingsDefinitions = () => {
  const getStarIcons = (amount: number) => {
    // @ts-ignore
    const arr = Array.apply(null, { length: amount }).map(Number.call, Number);

    return (
      <div>
        {arr.map((item, index) => (
          <StarFilled key={`${index}-${item}`} />
        ))}
      </div>
    );
  };

  return (
    <PageSectionWrapper title="Aeris Ratings Definitions">
      <Row gutter={[GRID_HORIZONTAL_GUTTER, GRID_COL_THIRD_ROW_SPAN]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <ImpactPerformance getStarIcons={getStarIcons} />
        </Col>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <FinancialPerformance />
        </Col>
      </Row>
    </PageSectionWrapper>
  );
};
