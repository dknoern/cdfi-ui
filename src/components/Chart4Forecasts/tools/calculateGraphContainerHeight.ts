import { GraphData } from 'types/forecastData';

export const calculateGraphContainerHeight = (data: GraphData): string => {
  if (!data) return '500px';
  if (data.datas.length < 3) return '500px';
  if (data.datas.length < 6) return '600px';
  if (data.datas.length < 9) return '700px';
  return '750px';
};
