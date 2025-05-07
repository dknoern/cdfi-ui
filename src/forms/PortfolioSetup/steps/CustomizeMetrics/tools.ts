import { toJS } from 'mobx';
import { Metric } from 'types';
import { formStore } from 'forms/PortfolioSetup/formStore';

export const updateMetrics = (
  selected: Metric['id'][],
  setData: { [key: string]: any },
): void => {
  const newItems = formStore.selectedMetrics.map((item) => {
    if (selected.includes(item.id)) {
      return { ...item, ...setData };
    }
    return toJS(item);
  });
  formStore.updateData({ assignedMetrics: newItems });
};
