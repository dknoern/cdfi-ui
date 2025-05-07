import React, { FC, useMemo } from 'react';
import { Row, Col } from 'antd';
import { ResponsiveLine, LineSvgProps } from '@nivo/line';
import { ResponsiveBar, BarSvgProps } from '@nivo/bar';
import { ResponsivePie, PieSvgProps } from '@nivo/pie';
import { GraphType } from 'types/graphs';
import { GraphData } from 'types/forecastData';
import { UserConfig } from 'types/chart';
import {
  commonChartConfig,
  lineConfig,
  barConfig,
  pieConfig,
} from 'constants/chartConfig';
import { useWindowSize } from 'tools';
import { ChartTooltip4Bar, ChartTooltip4Line } from '../ChartTooltip';
import {
  oldModel2New4Line,
  oldModel2New4Bar,
  oldModel2New4Pie,
  barChartKeysFromData,
  calculateLabelRotation,
} from './tools';

type ChartProps = {
  isLoading?: boolean;
  data: GraphData | null;
  userConfig?: Partial<UserConfig>;
};

export const Chart4Forecasts: FC<ChartProps> = ({
  isLoading,
  data,
  userConfig,
}) => {
  const { width } = useWindowSize();

  const labelRotation = useMemo(() => {
    if (!data) return 0;

    return calculateLabelRotation(data, width);
  }, [data, width]);

  const chartRendered = useMemo(() => {
    if (isLoading || !data) return null;

    switch (data.type) {
      case GraphType.LINE:
        return (
          <ResponsiveLine
            {...(commonChartConfig as Partial<LineSvgProps>)}
            {...lineConfig}
            axisBottom={{
              ...(commonChartConfig as Partial<LineSvgProps>).axisBottom,
              tickRotation: labelRotation,
            }}
            tooltip={ChartTooltip4Line}
            {...(userConfig as Partial<LineSvgProps>)}
            data={oldModel2New4Line(data)}
          />
        );
      case GraphType.COLUMN:
      case GraphType.COLUMN_STACKED:
        return (
          <ResponsiveBar
            {...(commonChartConfig as Partial<BarSvgProps>)}
            {...barConfig}
            axisBottom={{
              ...(commonChartConfig as Partial<BarSvgProps>).axisBottom,
              tickRotation: labelRotation,
            }}
            tooltip={ChartTooltip4Bar}
            {...(userConfig as Partial<BarSvgProps>)}
            indexBy="period"
            keys={barChartKeysFromData(data)}
            groupMode={data.type === GraphType.COLUMN ? 'grouped' : 'stacked'}
            data={oldModel2New4Bar(data, userConfig?.maxValue)}
          />
        );
      case GraphType.PIE:
        return (
          <ResponsivePie
            {...(commonChartConfig as Partial<PieSvgProps>)}
            {...pieConfig}
            {...(userConfig as Partial<PieSvgProps>)}
            data={oldModel2New4Pie(data)}
          />
        );
      case GraphType.TABLE:
      default:
        return (
          <Row style={{ height: '100%' }} justify="center" align="middle">
            <Col>
              <h3>Table Chart Placeholder</h3>
            </Col>
          </Row>
        );
    }
  }, [data, isLoading, labelRotation, userConfig]) as JSX.Element;

  return chartRendered;
};
