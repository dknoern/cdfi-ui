import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react';
import { Row, Col } from 'antd';
import { ResponsiveLine, LineSvgProps } from '@nivo/line';
import { ResponsiveBar, BarSvgProps } from '@nivo/bar';
import { ResponsivePie, PieSvgProps } from '@nivo/pie';
import {
  commonChartConfig,
  lineConfig,
  barConfig,
  pieConfig,
} from 'constants/chartConfig';
import { GraphPreviewViewWithMetricData, GraphType } from 'types/graphs';
import { UserConfig } from 'types/chart';
import { useWindowSize } from 'tools';
import {
  calculateLabelRotation,
  removeUnsuitableValues,
} from 'tools/graphTools';
import {
  ChartTooltip4Bar,
  ChartTooltip4Line,
  ChartTooltip4Pie,
} from '../ChartTooltip';
import {
  convertData4Line,
  convertData4Bar,
  convertData4Pie,
  columnGraphBounds,
  lineGraphBounds,
  removeCompanyData,
} from './tools';

type ChartProps = {
  isLoading: boolean | undefined;
  data: GraphPreviewViewWithMetricData | null;
  userConfig?: Partial<UserConfig>;
};

const ChartFn: FC<ChartProps> = ({ isLoading, data, userConfig }) => {
  const { width } = useWindowSize();

  const labelRotation = useMemo(() => {
    if (!data) return 0;

    return calculateLabelRotation(data.periods, width);
  }, [data, width]);

  const chartRendered = useMemo(() => {
    if (isLoading || !data) return null;

    // for charts we use only data items with no pcId
    const usedData = removeUnsuitableValues(removeCompanyData(data));

    switch (data.type) {
      case GraphType.LINE: {
        const preparedData = convertData4Line(usedData);
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
            {...lineGraphBounds(preparedData, usedData.type, userConfig)}
            data={preparedData}
          />
        );
      }
      case GraphType.COLUMN:
      case GraphType.COLUMN_STACKED: {
        const { data: chartData, keys } = convertData4Bar(
          usedData,
          userConfig?.maxValue,
        );

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
            keys={keys}
            groupMode={
              usedData.type === GraphType.COLUMN ? 'grouped' : 'stacked'
            }
            {...columnGraphBounds(chartData, usedData.type, userConfig)}
            data={chartData}
          />
        );
      }
      case GraphType.PIE:
        return (
          <ResponsivePie
            {...(commonChartConfig as Partial<PieSvgProps>)}
            {...pieConfig}
            {...(userConfig as Partial<PieSvgProps>)}
            data={convertData4Pie(usedData)}
            tooltip={ChartTooltip4Pie}
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

export const Chart = observer(ChartFn);
