import React, { ReactNode } from 'react';
import {
  Tag as TagType,
  MetricType,
  MetricCategory,
  MetricSubCategory,
  MetricSharePeriod,
  Metric,
} from 'types';
import { MetricRecord, MetricRowItem } from 'types/metricTableItem';
import { metricTypeNames } from 'constants/metricType';
import { metricSharePeriodNames } from 'constants/metricSharePeriod';
import { TagsList } from '../../TagsList';
import { MetricName } from '../components/MetricName';
import styles from '../MetricsTable.module.scss';

export const renderNameValue = (showStatusIcon: boolean) => (
  value: string,
  record: MetricRecord | MetricRowItem,
  index: any,
): ReactNode => (
  <MetricName metric={record as Metric} showStatusIcon={showStatusIcon} />
);

export const renderTagValue = (tags: TagType[]) => (
  value: number[],
  record: MetricRecord | MetricRowItem,
  index: any,
): ReactNode => {
  const tagItems =
    record.tags?.map((tagId) => {
      const tag = tags.find((item) => item.id === tagId) as TagType;
      return {
        id: tag.id,
        name: tag.name,
        tag,
      };
    }) ?? [];

  return (
    <div className={styles.tagContainer}>
      <TagsList items={tagItems} type="custom" />
    </div>
  );
};

export const renderGrandParentValue = (cats: MetricCategory[]) => (
  value: number,
  record: MetricRecord | MetricRowItem,
  index: any,
): ReactNode => {
  return cats.find((item) => item.id === value)?.name;
};

export const renderParentValue = (subCats: MetricSubCategory[]) => (
  value: number,
  record: MetricRecord | MetricRowItem,
  index: any,
): ReactNode => {
  return subCats.find((item) => item.id === value)?.name;
};

export const renderType = (
  value: string,
  record: MetricRecord | MetricRowItem,
  index: any,
): ReactNode => {
  return metricTypeNames[
    record.type ? record.type : record.typeConfig?.type ?? MetricType.NUMERIC
  ];
};

export const renderFrequency = (
  value: string,
  record: MetricRecord | MetricRowItem,
  index: any,
): ReactNode => {
  return metricSharePeriodNames[
    record.frequency ?? MetricSharePeriod.QUARTERLY
  ];
};
