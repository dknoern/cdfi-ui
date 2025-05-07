import { GraphType } from 'types/graphs';

export type GraphTypeNames = {
  [key in keyof typeof GraphType]: string;
};

export const graphTypeNames: GraphTypeNames = {
  [GraphType.COLUMN]: 'Bar',
  [GraphType.COLUMN_STACKED]: 'Stacked Bar',
  [GraphType.LINE]: 'Line',
  [GraphType.PIE]: 'Pie',
  [GraphType.TABLE]: 'Table',
};
