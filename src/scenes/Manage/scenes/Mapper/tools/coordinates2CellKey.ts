export const coordinates2CellKey = (
  col: number,
  row: number,
  page: number,
): string => `x${col}y${row}z${page}`;
