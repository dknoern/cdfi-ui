import { LineSvgProps } from '@nivo/line';
import { BarSvgProps } from '@nivo/bar';
import { PieSvgProps } from '@nivo/pie';
import { Colors } from 'constants/ui';

export const commonReportsChartConfig = {
  margin: { top: 100, right: 100, bottom: 100, left: 100 },
  axisTop: null,
  axisRight: null,
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
  ...commonReportsChartConfig,
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
  curve: 'natural',
  enableArea: true,
};

export const barConfig: Omit<BarSvgProps, 'data'> = {
  ...commonReportsChartConfig,
  labelSkipWidth: 100,
  labelSkipHeight: 100,
  padding: 0.25,
  groupMode: 'grouped',
};

export const pieConfig: Omit<PieSvgProps, 'data'> = {
  ...commonReportsChartConfig,
  margin: { top: 20, right: 20, bottom: 100, left: 20 },
  enableSlicesLabels: false,
  innerRadius: 0.5,
};
export const defaultChartUserConfig = {
  boundMax: undefined,
  boundMin: undefined,
};
