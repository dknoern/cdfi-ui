import { LineSvgProps } from '@nivo/line';
import { BarSvgProps } from '@nivo/bar';
import { PieSvgProps } from '@nivo/pie';
import { Colors } from 'constants/ui';
import { formatToShortNotation } from 'tools/numberTools';

export const commonChartConfig = {
  margin: {
    top: 10,
    right: 50,
    bottom: 60,
    left: 50,
  },
  axisTop: null,
  axisRight: {
    orient: 'right',
    tickSize: 5,
    tickPadding: 10,
    tickRotation: 0,
    legendPosition: 'middle',
    legend: '',
    legendOffset: -80,
    format: formatToShortNotation,
  },
  axisBottom: {
    orient: 'bottom',
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legendOffset: 36,
    legendPosition: 'middle',
  },
  axisLeft: {
    orient: 'left',
    tickSize: 5,
    tickPadding: 10,
    tickRotation: 0,
    legendPosition: 'middle',
    legend: '',
    legendOffset: -80,
    format: formatToShortNotation,
  },
  colors: [
    Colors.MAIN_BLUE,
    Colors.MAIN_GREEN,
    Colors.MAIN_RED,
    Colors.MAIN_YELLOW,
    Colors.MAIN_DARK_BLUE,
    Colors.MAIN_LIGHT_BLUE,
  ],
  legends: [
    {
      anchor: 'bottom-left',
      direction: 'column',
      justify: false,
      translateX: 0,
      translateY: 100,
      itemsSpacing: 0,
      itemDirection: 'left-to-right',
      itemWidth: 100,
      itemHeight: 20,
      itemOpacity: 0.75,
      symbolSize: 16,
      symbolShape: 'circle',
      symbolBorderColor: 'rgba(0, 0, 0, .5)',
      effects: [
        {
          on: 'hover',
          style: {
            itemOpacity: 1,
          },
        },
      ],
      dataFrom: 'keys',
    },
  ],
  theme: {
    axis: {
      ticks: {
        text: {
          fontSize: 12,
          letterSpacing: '0.12px',
          fill: Colors.AXIS_BLACK,
        },
      },
    },
  },
  enableGridY: true,
  enableGridX: false,
};

export const lineConfig: Omit<LineSvgProps, 'data'> = {
  xScale: { type: 'point' },
  yScale: {
    type: 'linear',
    min: 'auto',
    max: 'auto',
    reverse: false,
  },
  pointSize: 10,
  pointColor: Colors.MAIN_WHITE,
  pointBorderWidth: 2,
  pointBorderColor: { from: 'serieColor' },
  pointLabel: 'y',
  pointLabelYOffset: -12,
  useMesh: true,
};

export const barConfig: Omit<BarSvgProps, 'data'> = {
  labelSkipWidth: 100,
  labelSkipHeight: 100,
  groupMode: 'grouped',
  padding: 0.25,
};

export const pieConfig: Omit<PieSvgProps, 'data'> = {
  enableRadialLabels: false,
  enableSlicesLabels: false,
  margin: {
    top: 10,
    right: 30,
    bottom: 50,
    left: 30,
  },
};

export const GRAPH_MIN_VALUE_CALIBRATE = 100;
export const GRAPH_LABEL_NO_ROTATE = 0;
export const GRAPH_LABEL_ROTATE = -35;

// buffer is used as coefficient to distant graph bottom form Y axis
export const MIN_BUFFER_COEF = 0.08;
export const MAX_BUFFER_COEF = 1.05;
