import { PieChartData, LineChartData } from 'types/chart';
import { GraphData, GraphDataValueItem } from 'types/forecastData';
import { getComputedValue } from 'tools/graphTools';
import { GRAPH_MIN_VALUE_CALIBRATE } from 'constants/chartConfig';
import { getMaxValueFromGraphData } from './getMaxValueFromGraphData';

export const oldModel2New4Line = (graphData: GraphData): LineChartData => {
  const xs = graphData.columnHeaders.values.map(
    (headerItem) =>
      `${headerItem.value.slice(0, 4)} ${headerItem.value.slice(4)}`,
  );
  return graphData.datas.map((metricData) => ({
    id: metricData.label,
    data: metricData.values.map((valueItem, itemIndex) => ({
      x: xs[itemIndex],
      y: valueItem ? (valueItem as GraphDataValueItem).amount : null,
    })),
  }));
};

type BarChartData = Record<string, any>[];

export const oldModel2New4Bar = (
  graphData: GraphData,
  maxValue?: number | 'auto',
): BarChartData => {
  const minimumBarUnitValue =
    (typeof maxValue === 'number' && !!maxValue
      ? maxValue
      : getMaxValueFromGraphData(graphData)) / GRAPH_MIN_VALUE_CALIBRATE;
  const result: BarChartData = graphData.columnHeaders.values.map(
    (headerItem) => ({
      period: `${headerItem.value.slice(0, 4)} ${headerItem.value.slice(4)}`,
    }),
  );
  graphData.datas.forEach((dataItem) => {
    dataItem.values.forEach((valueItem, valueItemIndex) => {
      if (!valueItem) return;

      result[valueItemIndex][dataItem.label] = getComputedValue(
        valueItem.amount,
        minimumBarUnitValue,
      );
      result[valueItemIndex].actualValues = {
        ...result[valueItemIndex].actualValues,
        ...{ [dataItem.label]: valueItem.amount },
      };
    });
  });
  return result;
};

export const oldModel2New4Pie = (graphData: GraphData): PieChartData => {
  return graphData.datas
    .filter(({ values }) => !!values[values.length - 1])
    .map(({ label, values }) => ({
      id: label,
      label,
      value: (values[values.length - 1] as GraphDataValueItem).amount, // this shall change with new data structure coming from BE
    }));
};
