import { shape, number, string, arrayOf } from 'prop-types';

export const metricType = shape({
  id: number,
  type: string,
  name: string,
  parentId: number,
});

export const reportingConfigType = shape({
  companyId: number,
  year: number,
  quarter: number,
});

export const companyType = shape({
  id: number,
  name: string,
});

export const reportingType = shape({
  name: string,
  year: number,
  quarter: number,
});

// spreadSheet types
export const spreadSheetCellContentType = {
  x: number,
  y: number,
  z: number,
  value: string,
};

export const spreadSheetCellType = shape(spreadSheetCellContentType);

export const spreadSheetRowType = shape({
  row: arrayOf(spreadSheetCellType),
});

export const spreadSheetPageType = shape({
  name: string,
  page: arrayOf(spreadSheetRowType),
});

export const spreadSheetType = arrayOf(spreadSheetPageType);
// end of spreadSheet types
