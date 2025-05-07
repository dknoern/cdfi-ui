import { toJS } from 'mobx';
import { MetricSharePeriod, AssignedMetric, Metric } from 'types';
import { formStore } from 'forms/PCCreate/formStore';
import { FormStep } from 'forms/PCCreate/types';
import { extractTagsIds } from 'tools/tagsTool';
import { FormResult } from './types';
import { CURRENT_STEP } from './constants';

export const setCustomizeMetrics = (
  selected: Metric['id'][],
  metrics: AssignedMetric[],
  createdMetrics: FormResult,
): void => {
  let selectedMetricsData: FormResult = [];
  if (selected) {
    selectedMetricsData = (metrics as AssignedMetric[])
      .filter((item) => selected.includes(item.id))
      .map((item) => ({
        ...item,
        key: item.id,
        frequency: item.frequency ?? MetricSharePeriod.QUARTERLY,
      }));
  }
  formStore.setData(
    FormStep.customizeMetrics,
    selectedMetricsData.concat(createdMetrics),
  );
};

export const updateMetrics = (
  selected: number[],
  setData: { [key: string]: any },
): void => {
  const existing = [...(formStore.data[CURRENT_STEP] as FormResult)];

  const newItems = existing.map((item) => {
    if (selected.includes(item.id)) {
      return { ...item, ...setData };
    }
    return toJS(item);
  });

  formStore.setData(CURRENT_STEP, newItems);
};

export const addMetric = (values: { [key: string]: any }): void => {
  const id = Date.now();
  formStore.setData(CURRENT_STEP, [
    ...((formStore.data[CURRENT_STEP] as FormResult) ?? []),
    {
      ...values,
      tags: extractTagsIds(values.tags),
      // custom id for table selection
      key: id,
      id,
      isNew: true,
    },
  ]);
};

export const withFrequencyPrefix = (id: string): string =>
  `frequencySelector_${id}`;
