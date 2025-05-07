export const parseNumber = (str: string): number =>
  Number(str.replace(/[^0-9.-]/g, ''));

const NUMBER_FORMATS = [
  {
    // 1,000,000,000,000
    letter: 'T',
    min: 1e12,
    length: 12,
  },
  {
    // 1,000,000,000 - 999,999,999,999
    letter: 'B',
    min: 1e9,
    length: 9,
  },
  {
    // 1,000,000 - 999,999,999
    letter: 'M',
    min: 1e6,
    length: 6,
  },
  {
    // 1,000 - 999,999
    letter: 'K',
    min: 1e3,
    length: 3,
  },
];

// Format number to short notation with letters ['K', 'M', 'B', 'T']
// params: number value - 10 000 000
// return: string with short notation - 10 M
export const formatToShortNotation = (value: number): string => {
  let currValue = value;
  if (value < 0) currValue *= -1;
  const format = NUMBER_FORMATS.find(
    (currFormat) => currValue >= currFormat.min,
  );
  if (!format) return `${value < 0 ? '-' : ''}${currValue.toLocaleString()}`;

  const decimalValue = Math.trunc(currValue).toString();

  return `${value < 0 ? '-' : ''}${decimalValue.slice(
    0,
    decimalValue.length - format.length,
  )} ${format.letter}`;
};
