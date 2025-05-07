import { DataItemType } from 'types/customDataTable';
import { ForecastValueItem } from 'types/forecast';
import { GraphDataValueItem } from 'types/forecastData';
import { prettifyPeriod, period2DataIndex } from 'tools/reportedData';

export const extractPureId = (id: string, type: DataItemType): number => {
  return Number(id.substring(type.length));
};

export const prefixId = (id: number, type: DataItemType): string => {
  return `${type}${id}`;
};

export const valueItems2object = (
  values: ForecastValueItem[],
): { [key: string]: GraphDataValueItem } => {
  return Object.fromEntries(
    values.map((item) => [
      period2DataIndex(item.period),
      { value: prettifyPeriod(item.period), amount: item.value },
    ]),
  );
};
