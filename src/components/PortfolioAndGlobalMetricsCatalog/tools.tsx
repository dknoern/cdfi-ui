import React, { ReactNode } from 'react';
import { toJS } from 'mobx';
import { AssignedMetric, Metric } from 'types';
import { StoreMetric } from './metricsStore';
import styles from './PortfolioAndGlobalMetricsCatalog.module.scss';

export const updateMetricFields = (
  metrics: StoreMetric[],
  selected: StoreMetric['id'][],
  setData: any,
): StoreMetric[] => {
  return metrics.map((metric) => {
    if (selected.includes(metric.id)) {
      return { ...metric, ...setData };
    }
    return toJS(metric);
  });
};

export const filterMetricsByIdsList = (
  metricsList: AssignedMetric[],
  idsList: Metric['id'][],
): Metric['id'][] => {
  return metricsList
    .filter((metric) => idsList.includes(metric.id))
    .map((metric) => metric.id);
};

export const getExplanation = (
  assignedMetrics: AssignedMetric[] | null,
): ReactNode => {
  if (!assignedMetrics || assignedMetrics.length < 1) return null;

  let explanation;
  if (assignedMetrics.length < 2) {
    explanation = `${assignedMetrics[0].name} is`;
  } else if (assignedMetrics.length < 3) {
    explanation = `${assignedMetrics[0].name} and ${assignedMetrics[1].name} are`;
  } else {
    explanation = `${assignedMetrics[0].name}, ${assignedMetrics[1].name} and ${
      assignedMetrics.length - 2
    } more metrics are`;
  }

  return (
    <div
      className={styles.explanation}
    >{`${explanation} already assigned to current Reporting Entity.`}</div>
  );
};
