import React, { FC } from 'react';
import { Row, Col, Card } from 'antd';
import {
  GraphPreviewViewWithMetricData,
  FormatChartConfig,
} from 'types/graphs';
import { StoreData } from 'forms/ChartCreate/types';
import { prepareUserConfig } from 'tools/chartTools';
import {
  getLegendItemsCount,
  calculateGraphContainerHeight,
} from 'tools/graphTools';
import { Chart } from 'components/Chart';
import styles from './FormatChartPreview.module.scss';

type ChartPreviewProps = {
  data: GraphPreviewViewWithMetricData | null;
  isLoading: boolean;
} & FormatChartConfig &
  Pick<StoreData, 'type'>;

export const FormatChartPreview: FC<ChartPreviewProps> = ({
  data,
  axisLabel,
  isLoading,
  boundMin,
  boundMax,
  legend,
  type,
  legendPosition,
  gridHorizontal,
  gridVertical,
  options,
}) => {
  const userConfig = prepareUserConfig(type, getLegendItemsCount(data), {
    axisLabel,
    legend,
    legendPosition,
    gridHorizontal,
    gridVertical,
    boundMin,
    boundMax,
    options,
  });
  if (isLoading || !data) return null;

  return (
    <div className={styles.container}>
      <Card className={styles.chartCard} id="chartPreviewCard">
        <Row>
          <Col
            className={styles.chartBlock}
            style={{ height: calculateGraphContainerHeight(data) }}
          >
            <Chart isLoading={isLoading} data={data} userConfig={userConfig} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};
