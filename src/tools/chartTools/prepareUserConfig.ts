import { FormatChartConfig, PositionsConfig, GraphType } from 'types/graphs';
import { UserConfig } from 'types/chart';
import { legendPositionConfig } from 'constants/chart';
import { commonChartConfig } from 'constants/chartConfig';
import { calculateGraphMargin } from '../graphTools';

export const prepareUserConfig = (
  type: GraphType | null,
  legendItems: number,
  {
    boundMax,
    boundMin,
    legend,
    legendPosition,
    axisLabel,
    gridHorizontal,
    gridVertical,
  }: FormatChartConfig,
): UserConfig => {
  let groupMode: 'grouped' | 'stacked' | undefined;
  const legendPositionDirection =
    legendPosition === 'auto' ? PositionsConfig.BOTTOM_LEFT : legendPosition;

  switch (type) {
    case GraphType.COLUMN:
      groupMode = 'grouped';
      break;
    case GraphType.COLUMN_STACKED:
      groupMode = 'stacked';
      break;
    default:
      break;
  }

  const defaultConfig = commonChartConfig.legends[0];
  const adaptedConfig = legendPositionConfig(
    legendItems,
    type ?? GraphType.COLUMN,
    !!axisLabel,
  )[legendPositionDirection];
  const useLegends = [...commonChartConfig.legends];

  useLegends[0] = Object.assign(useLegends[0], {
    anchor: legendPositionDirection,
    translateX: adaptedConfig?.translateX || defaultConfig.translateX,
    translateY: adaptedConfig?.translateY || defaultConfig.translateY,
    itemDirection: adaptedConfig?.itemDirection || defaultConfig.itemDirection,
  });

  return {
    hasLegend: legend,
    axisLeft: {
      ...commonChartConfig.axisLeft,
      legend: axisLabel,
    },
    enableGridX: gridVertical,
    enableGridY: gridHorizontal,
    ...(legend
      ? {
          legends: useLegends,
          margin: legendPositionConfig(
            legendItems,
            type ?? GraphType.COLUMN,
            !!axisLabel,
          )[legendPositionDirection]?.margin || {
            top: 20,
            right: 10,
            bottom: 60,
            left: calculateGraphMargin(!!axisLabel, type ?? GraphType.COLUMN),
          },
        }
      : {
          legends: [],
        }),
    ...(groupMode && { groupMode }),
    ...(type === GraphType.LINE
      ? {
          yScale: {
            type: 'linear',
            min: Number.isFinite(boundMin) ? Number(boundMin) : 'auto',
            max: Number.isFinite(boundMax) ? Number(boundMax) : 'auto',
            reverse: false,
          },
        }
      : {
          minValue: Number.isFinite(boundMin) ? Number(boundMin) : 'auto',
          maxValue: Number.isFinite(boundMax) ? Number(boundMax) : 'auto',
        }),
  };
};
