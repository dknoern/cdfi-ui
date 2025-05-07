import { GraphData, GraphDataValueItem } from 'types/forecastData';

export const getMaxValueFromGraphData = (graphData: GraphData): number => {
  return Math.max(
    ...graphData.datas.map((elements) =>
      Math.max(
        ...elements.values
          .filter((valueItem) => !!valueItem)
          .map((valueItem) =>
            Math.abs((valueItem as GraphDataValueItem).amount),
          ),
      ),
    ),
  );
};
