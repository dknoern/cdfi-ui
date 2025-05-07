import React, { FC, useMemo } from 'react';
import { Table, Typography } from 'antd';
import { ColumnProps } from 'antd/es/table';
import {
  GraphPreviewViewMetricEquationItem,
  GraphPreviewViewWithMetricData,
} from 'types/graphs';
import { extractItemsFromDataList } from 'tools/graphTools';
import { tableCols } from './constants';

const { Text } = Typography;

type SelectMetricsPreviewProps = {
  previewData: GraphPreviewViewWithMetricData | null;
  isLoading: boolean;
};

export const SelectMetricsPreview: FC<SelectMetricsPreviewProps> = ({
  previewData,
  isLoading,
}) => {
  const tableColumns = useMemo<
    ColumnProps<GraphPreviewViewMetricEquationItem>[]
  >(() => {
    return [
      ...tableCols,
      ...(previewData?.periods ?? []).map((period) => ({
        title: period,
        dataIndex: period,
        width: 160,
      })),
    ];
  }, [previewData]);

  const tableData = useMemo<GraphPreviewViewMetricEquationItem[]>(() => {
    if (!previewData) return [];

    return extractItemsFromDataList(
      previewData.metrics.filter((metric) => !metric.pcId),
    );
  }, [previewData]);

  return (
    <>
      <Text type="secondary">Showing last 5 periods</Text>
      <Table
        id="selectMetrics_preview"
        columns={tableColumns}
        dataSource={tableData}
        pagination={false}
        rowKey={(record): React.Key => record.id}
        scroll={{
          x: 'max-content',
          y: 300,
        }}
        loading={isLoading}
        showSorterTooltip={false}
      />
    </>
  );
};
