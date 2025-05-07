import { formatNumberWithCommas } from 'tools/reportedData';

export const numberFieldParser = (value: string): string =>
  value.replace(/[^.\-\d]/g, '');

export const inputNumberParser = (val: string | undefined): string =>
  numberFieldParser(val ?? '');

export const inputNumberFormatter = (
  val: string | number | undefined,
): string => formatNumberWithCommas(val ?? '');
