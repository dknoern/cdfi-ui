import { GraphPreviewViewWithMetricData } from 'types/graphs';
import { ColumnData, ColumnDataItem } from 'types/chart';
import { GRAPH_MIN_VALUE_CALIBRATE } from 'constants/chartConfig';
import { getMaxValueFromGraphData, getComputedValue } from 'tools/graphTools';
import { amount2TableValue } from 'tools/reportedData';
import { extractMetricEquationSummaryItems } from './extractMetricEquationSummaryItems';

// TODO fix output typing
// currently based on lib's props type
export const convertData4Bar = (
  graphData: GraphPreviewViewWithMetricData,
  maxValue?: number | 'auto',
): { data: ColumnDataItem[]; keys: string[] } => {
  const minimumBarUnitValue =
    (typeof maxValue === 'number' && !!maxValue
      ? maxValue
      : getMaxValueFromGraphData(graphData)) / GRAPH_MIN_VALUE_CALIBRATE;
  const summaryData = extractMetricEquationSummaryItems(graphData);
  const result: ColumnData = graphData.periods.map((period) => ({
    period,
    actualValues: {},
  }));
  summaryData.forEach((summaryDataItem) => {
    const { format, decimals } = summaryDataItem;
    const label = summaryDataItem.name;

    summaryDataItem.values.forEach((valueItem) => {
      const resultItemIdx = result.findIndex(
        (resultItem) => resultItem.period === valueItem.period,
      );

      if (resultItemIdx < 0) return;

      result[resultItemIdx][label] = getComputedValue(
        valueItem.value as number,
        minimumBarUnitValue,
      );
      result[resultItemIdx].actualValues[label] = amount2TableValue(
        Number(valueItem.value) || 0,
        { format, decimals },
      );
    });
  });

  return {
    data: result,
    keys: summaryData.map((item) => item.name),
  };
};
