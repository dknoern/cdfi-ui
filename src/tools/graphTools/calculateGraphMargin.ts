import { GraphType } from 'types/graphs';

export const calculateGraphMargin = (
  hasAxisLabel: boolean,
  graphType: GraphType,
): number => {
  if (hasAxisLabel) {
    return graphType !== GraphType.PIE ? 110 : 10;
  }
  return graphType !== GraphType.PIE ? 70 : 10;
};
