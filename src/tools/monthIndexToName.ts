import { capitalizeFirstLetter } from 'tools/capitalizeFirstLetter';

export const monthIndexToName = (monthIndex: number): string =>
  capitalizeFirstLetter(
    new Date(2010, monthIndex, 10).toLocaleString('en-us', { month: 'long' }),
  );
