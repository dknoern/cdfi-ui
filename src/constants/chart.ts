import {
  GraphType,
  PositionsConfig,
  PositionDirectionsConfig,
} from 'types/graphs';
import { LegendPositionConfig } from 'types/chart';
import {
  calculateLegendPosition,
  calculateLegendMargin,
  calculateGraphMargin,
} from 'tools/graphTools';

const legendConfig = (
  position: 'top' | 'bottom',
  items: number,
  graphType: GraphType,
  hasAxisLabel: boolean,
): LegendPositionConfig => {
  const graphMargin = calculateGraphMargin(hasAxisLabel, graphType);
  switch (position) {
    case 'top':
      return {
        translateX: 0,
        translateY: calculateLegendPosition(items) * -1,
        margin: {
          top: calculateLegendMargin(items),
          right: graphMargin,
          bottom: 50,
          left: graphMargin,
        },
      };
    case 'bottom':
    default:
      return {
        translateX: 0,
        translateY: calculateLegendPosition(items),
        margin: {
          top: 10,
          right: graphMargin,
          bottom: calculateLegendMargin(items),
          left: graphMargin,
        },
      };
  }
};

export const legendPositionConfig = (
  items: number,
  graphType: GraphType,
  hasAxisLabel: boolean,
): Partial<
  Record<
    PositionsConfig,
    LegendPositionConfig & {
      itemDirection: string;
    }
  >
> => {
  const legendTopConfig = legendConfig('top', items, graphType, hasAxisLabel);
  const legendBottomConfig = legendConfig(
    'bottom',
    items,
    graphType,
    hasAxisLabel,
  );

  return {
    [PositionsConfig.TOP_RIGHT]: {
      ...legendTopConfig,
      itemDirection: PositionDirectionsConfig.RIGHT_TO_LEFT,
    },
    [PositionsConfig.BOTTOM_RIGHT]: {
      ...legendBottomConfig,
      itemDirection: PositionDirectionsConfig.RIGHT_TO_LEFT,
    },
    [PositionsConfig.TOP_LEFT]: {
      ...legendTopConfig,
      itemDirection: PositionDirectionsConfig.LEFT_TO_RIGHT,
    },
    [PositionsConfig.BOTTOM_LEFT]: {
      ...legendBottomConfig,
      itemDirection: PositionDirectionsConfig.LEFT_TO_RIGHT,
    },
  };
};
