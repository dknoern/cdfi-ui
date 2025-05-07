import React, { ReactNode } from 'react';
import { AggregatedMetric } from '../../../types';

export const renderName = (_: string, record: AggregatedMetric): ReactNode =>
  record.name;

export const renderMetricList = (
  _: string,
  record: AggregatedMetric,
): ReactNode => {
  return (
    record.metrics?.map((metric, index) => {
      return <div key={index}>{`${metric.accountCode} - ${metric.name}`}</div>;
    }) ?? []
  );
};
