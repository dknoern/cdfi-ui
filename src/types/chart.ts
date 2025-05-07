import { Box } from '@nivo/core';
import { BarSvgProps } from '@nivo/bar';
import { PieDatum } from '@nivo/pie';
import { Serie as LineSerie, Datum as LineDatum } from '@nivo/line';
import { ReportedDataPeriodView } from 'types/reportedDataV2';
import { Equation } from 'types/equation';
import { Metric } from 'types/metric';
import { PositionsConfig } from './graphs';

export interface UserConfig {
  legend?: {
    anchor: PositionsConfig;
    [key: string]: any;
  };
  axisLeft?: {
    legend: string;
    [key: string]: any;
  };
  axisBottom?: BarSvgProps['axisBottom'];
  yScale?: {
    min?: number | 'auto';
    max?: number | 'auto';
    [key: string]: any;
  };
  minValue?: number | 'auto';
  maxValue?: number | 'auto';
  groupMode?: 'grouped' | 'stacked';
  enableGridX?: boolean;
  enableGridY?: boolean;
  hasLegend?: boolean;
  margin?: Box;
}

export type LegendPositionConfig = {
  translateX: number;
  translateY: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};

export type PieChartDataItem = PieDatum & {
  label: string;
  formattedValue?: string;
};

export type PieChartData = PieChartDataItem[];

export type LineChartDataItem = LineSerie & {
  data: (LineDatum & { formattedY?: string })[];
};

export type LineChartData = LineChartDataItem[];

interface ColumnDatum {
  [key: string]: any;
}

export type ColumnDataItem = ColumnDatum & {
  period: ReportedDataPeriodView;
  actualValues: Record<Equation['name'] | Metric['name'], any>;
};

export type ColumnData = ColumnDataItem[];
