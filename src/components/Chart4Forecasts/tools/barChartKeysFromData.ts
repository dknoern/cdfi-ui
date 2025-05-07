import { GraphData } from 'types/forecastData';

export const barChartKeysFromData = (graphData: GraphData): string[] => {
  return graphData.datas.map((datasItem) => datasItem.label);
};
