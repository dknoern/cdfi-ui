import { PeerAnalysisReportChart } from 'types/peerGroups';

export const getFormat = (
  value: number,
  format: string,
  decimalPlaces: number,
) => {
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
  switch (format) {
    case 'DOLLAR':
      return currencyFormatter.format(value);
    case 'PERCENTAGE':
      return `${(value * 100).toFixed(decimalPlaces)}%`;
    case 'NUMBER':
      return value?.toFixed(decimalPlaces);
    default:
      return value?.toFixed(decimalPlaces);
  }
};

export const transformDataToLineDataWithMax = (
  chartReportData: PeerAnalysisReportChart[],
  periods: string[],
) => {
  let max = 0;

  const lineData = chartReportData
    ?.map((item) => {
      return {
        id: item.rowName,
        data: periods?.map((period) => {
          const yValue = item.columns[period] ? item.columns[period] : null;
          if (yValue !== null && yValue > max) max = yValue;
          return {
            x: period,
            y: yValue,
          };
        }),
      };
    })
    .reverse();
  return { lineData, max };
};

export const transformDataToBarDataWithMax = (
  chartReportData: PeerAnalysisReportChart[],
  periods: string[],
) => {
  const barData: { [key: string]: number | string }[] = [];
  const keys: string[] = [];
  let max = 0;

  chartReportData.forEach((item) => {
    keys.push(item.rowName);

    periods.forEach((period) => {
      const yValue = item.columns[period] ? item.columns[period] : null;
      if (yValue !== null && yValue > max) max = yValue;

      let newBarData = barData.find((data) => data.period === period);

      if (newBarData) {
        newBarData[item.rowName] = item.columns[period];
      } else {
        newBarData = { period, [item.rowName]: item.columns[period] };
        barData.push(newBarData);
      }
    });
  });

  return { barData, keys, max };
};
