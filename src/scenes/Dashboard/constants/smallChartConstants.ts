import { LineSvgProps } from '@nivo/line';
import { BarSvgProps } from '@nivo/bar';
import { PieSvgProps } from '@nivo/pie';
import { Colors } from 'constants/ui';

export const commonSmallChartConfig = {
  margin: { top: 5, right: 5, bottom: 5, left: 5 },
  axisTop: null,
  axisRight: null,
  axisBottom: null,
  axisLeft: null,
  markers: [
    {
      axis: 'y' as 'x' | 'y',
      value: 0,
      lineStyle: { stroke: Colors.AXIS_BLACK, strokeWidth: 0.5 },
    },
  ],
  colors: [
    Colors.MAIN_BLUE,
    Colors.MAIN_GREEN,
    Colors.MAIN_RED,
    Colors.MAIN_YELLOW,
    Colors.MAIN_DARK_BLUE,
    Colors.MAIN_LIGHT_BLUE,
  ],
  legends: [],
  enableGridX: false,
  enableGridY: false,
};

export const lineConfig: Omit<LineSvgProps, 'data'> = {
  ...commonSmallChartConfig,
  xScale: { type: 'point' },
  yScale: {
    type: 'linear',
    min: 'auto',
    max: 'auto',
    stacked: false,
    reverse: false,
  },
  pointBorderColor: {
    from: 'serieColor',
  },
  useMesh: true,
  curve: 'basis',
  enableArea: true,
};

export const barConfig: Omit<BarSvgProps, 'data'> = {
  ...commonSmallChartConfig,
  margin: { top: 0, right: 0, bottom: 5, left: 5 },
  labelSkipWidth: 100,
  labelSkipHeight: 100,
  padding: 0.5,
  groupMode: 'grouped',
};

export const pieConfig: Omit<PieSvgProps, 'data'> = {
  ...commonSmallChartConfig,
  enableRadialLabels: false,
  enableSlicesLabels: false,
};
export const defaultChartUserConfig = {
  boundMax: undefined,
  boundMin: undefined,
};
