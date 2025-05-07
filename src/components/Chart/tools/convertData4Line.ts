import { LineChartData } from 'types/chart';
import { GraphPreviewViewWithMetricData } from 'types/graphs';
import { amount2TableValue } from 'tools/reportedData';
import { extractMetricEquationSummaryItems } from './extractMetricEquationSummaryItems';

export const convertData4Line = (
  graphData: GraphPreviewViewWithMetricData,
): LineChartData => {
  const summaryData = extractMetricEquationSummaryItems(graphData);

  return summaryData.map((dataItem) => ({
    id: dataItem.name,
    data: graphData.periods.map((period) => {
      const { decimals, format, values } = dataItem;
      const resultItem = values.find(
        (valueItem) => valueItem.period === period,
      );

      return {
        //changed period format just here not to break reported tables 2020 Q4 -> FYE 2020
        x: (resultItem?.period ?? period).split(' ').reverse().join(' ').replace('Q4', 'FYE'),
        y: resultItem?.value ?? null,
        formattedY: amount2TableValue(Number(resultItem?.value) || 0, {
          decimals,
          format,
        }),
      };
    }),
  }));
};
