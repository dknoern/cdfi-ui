import { GraphPreviewViewWithMetricData } from 'types/graphs';
import { PieChartData } from 'types/chart';
import { amount2TableValue } from 'tools/reportedData';
import { extractMetricEquationSummaryItems } from './extractMetricEquationSummaryItems';

export const convertData4Pie = (
  graphData: GraphPreviewViewWithMetricData,
): PieChartData => {
  const summaryData = extractMetricEquationSummaryItems(graphData);

  return summaryData
    .filter((summaryDataItem) => summaryDataItem.values.length > 0)
    .map((summaryDataItem) => {
      const { values } = summaryDataItem;
      const resultItem = values.find(
        (value) =>
          value.period === graphData.periods[graphData.periods.length - 1],
      );
      const { format, decimals } = summaryDataItem;
      const value = (resultItem?.value ?? 0) as number;

      return {
        id: `${summaryDataItem.id}`,
        label: summaryDataItem.name,
        value,
        formattedValue: amount2TableValue(value, { format, decimals }),
      };
    });
};
