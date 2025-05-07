import React, { FC } from 'react';
import { Empty } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { VoidFn } from 'types';
import { GraphPreviewViewWithMetricData } from 'types/graphs';
import { typography } from 'constants/typography';
import { defaultChartUserConfig } from 'scenes/Charts/constants';
import { OutlineButton } from 'components';
import { Chart } from 'components/Chart';
import { prepareUserConfig } from 'tools/chartTools';
import {
  isEmptyGraph,
  calculateGraphContainerHeight,
  getLegendItemsCount,
} from 'tools/graphTools';
import styles from './ChartContent.module.scss';

type ChartContentProps = {
  graph: GraphPreviewViewWithMetricData;
  isLoading: boolean;
  onEdit: VoidFn;
};

const { emptyData } = typography('charts');

export const ChartContent: FC<ChartContentProps> = ({
  graph,
  isLoading,
  onEdit,
}) => {
  const userConfig = prepareUserConfig(
    graph.type,
    getLegendItemsCount(graph),
    graph.formatChart ?? defaultChartUserConfig,
  );
  const editDataTableButton = (
    <div className={styles.btnContainer}>
      <OutlineButton
        title="Edit Data Table / Chart"
        icon={<EditFilled />}
        onClick={onEdit}
      />
    </div>
  );
  return (
    <>
      {isEmptyGraph(graph) ? (
        <Empty description={emptyData} />
      ) : (
        <div
          className={styles.graphContainer}
          style={{ height: calculateGraphContainerHeight(graph) }}
        >
          <Chart isLoading={isLoading} data={graph} userConfig={userConfig} />
        </div>
      )}
    </>
  );
};
