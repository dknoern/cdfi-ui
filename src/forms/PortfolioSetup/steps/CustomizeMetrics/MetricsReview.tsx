import React, { FC } from 'react';
import { MetricsTable } from 'components';
import { formStore } from 'forms/PortfolioSetup/formStore';
import { columnList } from './constants';

export const MetricsReview: FC = () => {
  return (
    <>
      <MetricsTable
        id="metricsReviewTable"
        layout="fixed"
        dataSource={formStore.selectedMetrics ?? []}
        columnNamesList={columnList}
      />
    </>
  );
};
