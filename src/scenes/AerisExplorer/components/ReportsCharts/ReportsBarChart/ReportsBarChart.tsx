import React from 'react';
import { ResponsiveBar, TooltipProp } from '@nivo/bar';
import { getFormat } from '../chartsHelpers';
import { barConfig } from '../chartsConstants';

type ReportsBarChartProps = {
  barData: { [key: string]: string | number }[];
  formatType: string;
  decimalPlaces: number;
  keys: string[];
  legends?: any[];
  xTicks?: string[];
  maxYTick?: number;
  tooltip?: TooltipProp;
};

export const ReportsBarChart = ({
  barData,
  formatType,
  decimalPlaces,
  keys,
  legends = [],
  xTicks = [],
  maxYTick,
  tooltip,
}: ReportsBarChartProps) => {
  const tooltipFormat = tooltip
    ? undefined
    : (value: number): React.ReactText => getFormat(value, formatType, decimalPlaces);

  return (
    <ResponsiveBar
      {...barConfig}
      axisBottom={{
        tickSize: 15,
        tickPadding: 15,
        tickValues: xTicks,
        tickRotation: -45,
      }}
      maxValue={maxYTick}
      minValue={0}
      indexBy="period"
      keys={keys}
      data={barData}
      axisRight={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: -40,
        legendPosition: 'middle',
        format: (value) => getFormat(value as number, formatType, decimalPlaces),
      }}
      legends={legends}
      tooltip={tooltip}
      tooltipFormat={tooltipFormat}
    />
  );
};
