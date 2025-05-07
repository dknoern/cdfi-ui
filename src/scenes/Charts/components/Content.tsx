import React, { FC } from 'react';
import { Empty } from 'antd';
import { GraphPreviewViewWithMetricData, GraphType } from 'types/graphs';
import { typography } from 'constants/typography';
import { prepareUserConfig } from 'tools/chartTools';
import { Chart } from 'components/Chart';
import {
  isEmptyGraph,
  calculateGraphContainerHeight,
  getLegendItemsCount,
} from 'tools/graphTools';
import { ChartWrapper } from 'components/ChartWrapper';
import { defaultChartUserConfig } from '../constants';
import styles from '../Charts.module.scss';
import localStyles from './Content.module.scss';

const { emptyData } = typography('charts');

type ContentProps = {
  data: GraphPreviewViewWithMetricData | null;
  isLoading?: boolean;
};

const ContentFn: FC<ContentProps> = ({ data, isLoading }) => {
  if (isLoading || !data) return null;

  if (isEmptyGraph(data))
    return <Empty className={localStyles.empty} description={emptyData} />;

  if (data.type === GraphType.TABLE) return null;

  const userConfig = prepareUserConfig(
    data.type,
    getLegendItemsCount(data),
    data.formatChart ?? defaultChartUserConfig,
  );
  return (
    <div
      className={styles.graphContainer}
      style={{ height: calculateGraphContainerHeight(data) }}
    >
      <ChartWrapper
        chartType={data.type}
        periodsCount={data.periods.length}
        metricsCount={data.metrics.length + data.equations.length}
      >
        <Chart isLoading={isLoading} data={data} userConfig={userConfig} />
      </ChartWrapper>
    </div>
  );
};

export const Content = ContentFn;
