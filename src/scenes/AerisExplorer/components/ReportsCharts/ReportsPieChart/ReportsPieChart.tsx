import React from 'react';
import { ResponsivePie, PieDatum, AccessorFunc } from '@nivo/pie';
import { pieConfig } from '../chartsConstants';

type ReportsPieChartProps = {
  data: PieDatum[];
  radialLabel: string | AccessorFunc | undefined;
};

export const ReportsPieChart = ({
  data,
  radialLabel,
}: ReportsPieChartProps) => {
  return (
    <ResponsivePie
      {...pieConfig}
      data={data}
      radialLabel={radialLabel}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 75,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 15,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  );
};
