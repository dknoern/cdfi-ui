import React from 'react';
import { MetricSharePeriod, Metric } from 'types';
import { MetricTypeConfig } from './metric';

export type MetricRecord = Metric & {
  key: number;
  frequency: MetricSharePeriod;
  typeConfig?: MetricTypeConfig;
};

export type FilterState = {
  grandParentId: React.Key[];
  parentId: React.Key[];
  tags: string[];
  frequency: string[];
  type: string[];
};

export type FilterReducerAction = FilterState;

export type MetricRowItem = Pick<MetricRecord, 'id'> &
  Partial<Omit<MetricRecord, 'status'>>;

export enum MetricColumns {
  NAME = 'name',
  ACCOUNT_CODE = 'accountCode',
  PARENT_ID = 'parentId',
  GRANDPARENT_ID = 'grandParentId',
  TAGS = 'tags',
  TYPE = 'type',
  FREQUENCY = 'frequency',
  IS_PUBLIC = 'isPublic'
}

export type ColumnWidth = {
  [key in MetricColumns]?: string;
};
