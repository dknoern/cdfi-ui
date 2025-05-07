import React, { FC } from 'react';
import { MetricRowItem } from 'types/metricTableItem';
import { MetricsTable } from 'components';
import { formStore } from 'forms/PCCreate/formStore';
import { FormStep } from 'forms/PCCreate/types';
import { reviewColumnList } from './constants';

const Review: FC = () => {
  return (
    <MetricsTable
      id="metricsTable"
      layout="fixed"
      dataSource={formStore.data[FormStep.customizeMetrics] as MetricRowItem[]}
      columnNamesList={reviewColumnList}
    />
  );
};

export default Review;
