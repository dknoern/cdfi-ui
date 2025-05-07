import { ColumnType } from 'antd/lib/table/interface';
import { DataItem, FiscalQuarter } from 'types/reportedData';
import { OccupiedPeriods } from '../types';

export const calculateOccupiedPeriods = (
  dataColumns: ColumnType<DataItem>[],
): OccupiedPeriods => {
  const result: OccupiedPeriods = new Map();

  dataColumns.forEach((column) => {
    const parsedPeriod = (column.title as string).split(' Q');
    const year = Number(parsedPeriod[0]);

    const newArray = [
      ...(result.get(year) || []),
      Number(parsedPeriod[1]) as FiscalQuarter,
    ];

    result.set(year, newArray);
  });

  return result;
};
