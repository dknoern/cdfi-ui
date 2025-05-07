import { GraphPreviewViewWithMetricData } from 'types/graphs';
import { getLegendItemsCount } from './getLegendItemsCount';

export const calculateGraphContainerHeight = (
  graphData: GraphPreviewViewWithMetricData,
): string => {
  const datasLength = getLegendItemsCount(graphData);

  if (datasLength < 3) return '500px';
  if (datasLength < 6) return '600px';
  if (datasLength < 9) return '700px';
  return '750px';
};
