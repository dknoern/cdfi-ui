import { GraphType } from 'types/graphs';
import { ColumnData, LineChartData, UserConfig } from 'types/chart';
import { LineSvgProps } from '@nivo/line';
import { MIN_BUFFER_COEF, MAX_BUFFER_COEF } from 'constants/chartConfig';

// calculates bottom bound of graph with distance from axis
const calcMin = (
  userMin: number | 'auto' | undefined,
  values: number[],
): number => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return Number.isFinite(userMin)
    ? Number(userMin)
    : min - ((max - min) * MIN_BUFFER_COEF);
};

// calculates upper bound of graph with distance from axis
const calcMax = (
  userMax: number | 'auto' | undefined,
  values: number[],
): number => {
  return Number.isFinite(userMax)
    ? Number(userMax)
    : Math.max(...values) * MAX_BUFFER_COEF;
};

const extractColumnStackedData = (data: ColumnData): [number[], number[]] => {
  // counting height of positive values for every column (period) for further definition of upper bound in stacked mode
  const positiveSumsArray = data.map((item) =>
    Object.values(item)
      .filter((value) => Number(value) >= 0)
      .reduce((x, y) => x + y, 0),
  );

  // counting height of negative values for every column (period) for further definition of bottom bound in stacked mode
  const negativeSumsArray = data.map((item) =>
    Object.values(item)
      .filter((value) => Number(value) < 0)
      .reduce((x, y) => x + y, 0),
  );

  // returning both positive and negative value for calculating min from negative values and max from positive, they would be lowest and highest points
  return [positiveSumsArray, negativeSumsArray];
};

const extractColumnData = (data: ColumnData): number[] => {
  // extracting and filtering non-null values for calculating graph bounds in column mode
  return data
    .map((item) => Object.values(item))
    .flat()
    .filter((item) => Number(item));
};

const extractLineData = (data: LineChartData): number[] => {
  // extracting and filtering non-null values for calculating graph bounds in line mode
  return data
    .map((item) => Object.values(item.data))
    .flat()
    .map((value: any) => value?.y);
};

export const columnGraphBounds = (
  data: ColumnData,
  type: GraphType,
  userConfig?: Partial<UserConfig>,
): { minValue: number; maxValue: number } => {
  // these arrays are used for calculating graph bounds
  let actualValues;
  let negativeSumsArray;
  let positiveSumsArray;

  if (type === GraphType.COLUMN_STACKED) {
    [positiveSumsArray, negativeSumsArray] = extractColumnStackedData(data);
  } else {
    actualValues = extractColumnData(data);
  }

  let minValue = calcMin(
    userConfig?.minValue,
    actualValues ?? (negativeSumsArray as number[]),
  );

  // min would be changed to 0 if there are only positive values for column graph
  if (
    userConfig?.minValue === 'auto' &&
    type === GraphType.COLUMN &&
    minValue > 0
  ) {
    minValue = 0;
  }

  // there is no need to change max, upper overflow would be hidden
  const maxValue = calcMax(
    userConfig?.maxValue,
    actualValues ?? (positiveSumsArray as number[]),
  );

  return {
    minValue,
    maxValue,
  };
};

// line graph has different definition of Y axis bounds
export const lineGraphBounds = (
  data: LineChartData,
  type: GraphType,
  userConfig?: Partial<UserConfig>,
): Pick<LineSvgProps, 'yScale'> => {
  // this array is used for calculating graph bounds
  const actualValues = extractLineData(data);

  return {
    yScale: {
      type: 'linear',
      min: calcMin(userConfig?.yScale?.min, actualValues),
      max: calcMax(userConfig?.yScale?.max, actualValues),
      reverse: false,
    },
  };
};
