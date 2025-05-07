import React from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';
import { getFormat } from '../chartsHelpers';
import { lineConfig } from '../chartsConstants';

type ReportsLineChartProps = {
  lineData: Serie[];
  xTicks?: string[];
  formatType: string;
  decimalPlaces: number;
  maxYTick?: number;
};

export const ReportsLineChart = ({
  lineData,
  formatType,
  decimalPlaces,
  xTicks = [],
  maxYTick,
}: ReportsLineChartProps) => {
  return (
    <ResponsiveLine
      {...lineConfig}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: -40,
        legendPosition: 'middle',
        format: (value) => getFormat(value as number, formatType, decimalPlaces),
      }}
      axisBottom={{
        tickSize: 15,
        tickPadding: 15,
        tickValues: xTicks,
        tickRotation: -45,
      }}
      yScale={{
        type: 'linear',
        min: 0,
        max: maxYTick,
        stacked: false,
        reverse: false,
      }}
      enableArea={false}
      legends={[
        {
          anchor: 'top',
          direction: 'row',
          justify: false,
          translateY: -50,
          itemsSpacing: 110,
          itemDirection: 'left-to-right',
          itemWidth: 110,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      data={lineData}
      yFormat={(value) => getFormat(value as number, formatType, decimalPlaces)}
    />
  );
};
