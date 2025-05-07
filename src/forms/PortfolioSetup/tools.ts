import { FormData, FormSaveModel } from './types';

export const formStore2SaveModel = (storeData: FormData): FormSaveModel => {
  const { name, investments, tags, charts, assignedMetrics } = storeData;

  return {
    name,
    tags,
    investments,
    graphs: charts,
    assignedMetrics: assignedMetrics.map((item) => {
      if (item.isNew) {
        const { id, isNew, ...newMetric } = item;
        return newMetric;
      }
      return { id: item.id };
    }),
  };
};
