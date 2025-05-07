import { Investment } from 'types';
import {
  GraphPreviewViewEquationDataItem,
  GraphPreviewViewMetricDataItem,
  GraphPreviewViewMetricEquationItem,
  GraphPreviewViewWithMetricData,
} from 'types/graphs';
import { MetricTypeConfig4Numeric } from 'types/metric';
import { prepareValue } from 'tools/reportedData';

// NOTE amount2TableValue is only FOR NUMERIC METRICS
const values2record = (
  values: GraphPreviewViewMetricDataItem['values'],
  typeConfig: MetricTypeConfig4Numeric,
): Record<string, string | number | null> => {
  return values.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.period]:
        curr.value !== null
          ? prepareValue(curr.value as number, typeConfig)
          : curr.value,
    }),
    {} as Record<string, string | number | null>,
  );
};

export const extractItemsFromDataList = (
  dataList: (GraphPreviewViewMetricDataItem &
    GraphPreviewViewEquationDataItem)[],
): GraphPreviewViewMetricEquationItem[] =>
  dataList.map(({ format, decimals, values, ...item }) => ({
    ...item,
    format,
    decimals,
    ...values2record(values, { format, decimals }),
  }));

export const extractMetricEquationItemsForCompany = (
  data: GraphPreviewViewWithMetricData,
): GraphPreviewViewMetricEquationItem[] => {
  const result = [
    ...extractItemsFromDataList(data.metrics),
    ...extractItemsFromDataList(data.equations),
  ];

  return result.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
};

export const extractMetricEquationItemsForPortfolio = <
  T extends Pick<Investment, 'id' | 'name'>
>(
  data: GraphPreviewViewWithMetricData,
  companies: T[],
): GraphPreviewViewMetricEquationItem[] => {
  let result: GraphPreviewViewMetricEquationItem[] = [];

  [data.metrics, data.equations].forEach((dataList) => {
    const resultingItems: GraphPreviewViewMetricEquationItem[] = extractItemsFromDataList(
      dataList.filter((item) => !item.pcId),
    );

    resultingItems.forEach((resItem, idx) => {
      const subItems = dataList.filter(
        (item) => !!item.pcId && item.id === resItem.id,
      );

      if (subItems.length < 1) return;

      resultingItems[idx].children = subItems.map((subItem, idxSub) => {
        const relatedCompany = companies.find(
          (company) => company.id === subItem.pcId,
        );

        const { format, decimals } = subItem;

        return {
          ...subItem,
          id: `${subItem.id}-${subItem.pcId}-${idxSub}`,
          name: relatedCompany?.name ?? '',
          ...values2record(subItem.values, { format, decimals }),
        };
      });
    });

    result = result.concat(resultingItems);
  });

  return result;
};
