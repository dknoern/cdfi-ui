import { GlobalCdifiWithMetrics } from 'types/peerGroups';

export const transformGlobalMetricsToTableData = (
  data: GlobalCdifiWithMetrics,
) => {
  const periods = data.dates;

  const columns: any = [
    {
      title: '',
      dataIndex: 'metric',
      key: 'metric',
      fixed: 'left',
      width: 250,
    },
    ...periods.map((period) => ({
      title: period,
      dataIndex: period,
      key: period,
    })),
  ];

  const dataSource = data.cdfi.categories.map((category, catIndex) => {
    const parentKey = `category-${catIndex}`;
    const children = category.metrics.map((metric, metricIndex) => {
      const childKey = `${parentKey}-${metricIndex}`;
      const childRow: { key: string; metric: string; [key: string]: string } = {
        key: childKey,
        metric: metric.metric,
      };
      metric.values.forEach((value, valueIndex) => {
        const period = periods[valueIndex];
        childRow[period] = value;
      });

      return childRow;
    });

    return {
      key: parentKey,
      metric: category.name,
      children,
    };
  });

  return { columns, dataSource };
};
