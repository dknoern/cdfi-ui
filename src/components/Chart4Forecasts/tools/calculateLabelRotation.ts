import { GraphData } from 'types/forecastData';
import {
  GRAPH_LABEL_NO_ROTATE,
  GRAPH_LABEL_ROTATE,
} from 'constants/chartConfig';

export const calculateLabelRotation = (
  graphData: GraphData,
  width: number,
): number => {
  let labelsCount = 4;

  if (width > 1200) {
    labelsCount = 12;
  } else if (width > 800) {
    labelsCount = 6;
  }

  if (graphData.columnHeaders.values.length > labelsCount) {
    return GRAPH_LABEL_ROTATE;
  }

  return GRAPH_LABEL_NO_ROTATE;
};
