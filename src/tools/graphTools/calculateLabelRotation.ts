import {
  GRAPH_LABEL_NO_ROTATE,
  GRAPH_LABEL_ROTATE,
} from 'constants/chartConfig';

export const calculateLabelRotation = (
  periods: string[],
  width: number,
): number => {
  let labelsCount = 4;

  if (width > 1200) {
    labelsCount = 12;
  } else if (width > 800) {
    labelsCount = 6;
  }

  if (periods.length > labelsCount) {
    return GRAPH_LABEL_ROTATE;
  }
  return GRAPH_LABEL_NO_ROTATE;
};
