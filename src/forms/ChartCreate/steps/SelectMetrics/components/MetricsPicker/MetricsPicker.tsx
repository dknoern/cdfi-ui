import React, { FC, useState, useMemo, useEffect, useCallback } from 'react';
import { Row, Col, Input, Form } from 'antd';
import { TableRowSelection } from 'antd/lib/table/interface';
import { Rule } from 'antd/lib/form';
import { SearchOutlined } from '@ant-design/icons';
import { GlobalMetric } from 'types';
import {
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_FULL_ROW_SPAN,
  GRID_GUTTER,
} from 'constants/ui';
import { MetricsTable } from 'components';
import { MetricRecord, MetricRowItem } from 'types/metricTableItem';
import { useCompaniesMetrics } from 'dataManagement';
import { columnWidth, columnsList } from './constants';
import styles from './MetricsPicker.module.scss';

const { Search } = Input;

type MetricsPickerProps = {
  companyIds?: number[];
  selectedMetricIds: number[];
  onChange: (selectedItems: MetricRowItem['id'][]) => void;
  onMetricsLoaded?: (metrics: GlobalMetric[]) => void;
  rules?: Rule[];
  filterFn?: (metric: GlobalMetric) => boolean;
};

const MetricsPickerFn: FC<MetricsPickerProps> = ({
  companyIds,
  selectedMetricIds,
  onChange,
  onMetricsLoaded,
  rules,
  filterFn,
}) => {
  const { data, isLoading } = useCompaniesMetrics(companyIds ?? []);

  const [searchValue, setSearchValue] = useState('');

  const filteredMetrics = useMemo<GlobalMetric[]>(() => {
    const result = data ?? [];

    return filterFn ? result.filter(filterFn) : result;
  }, [data, filterFn]);

  const displayedData = useMemo<GlobalMetric[]>(() => {
    if (!searchValue) return filteredMetrics;

    return filteredMetrics.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [filteredMetrics, searchValue]);

  useEffect(() => {
    if (data === null || !onMetricsLoaded) return;
    onMetricsLoaded(filteredMetrics as MetricRecord[]);
  }, [data, filteredMetrics, onMetricsLoaded]);

  const onRowSelectionChange = useCallback(
    (allSelectedIds: React.Key[], selectedItems: MetricRowItem[]): void => {
      onChange(allSelectedIds as MetricRowItem['id'][]);
    },
    [onChange],
  );

  const rowSelection: TableRowSelection<MetricRowItem> = {
    onChange: onRowSelectionChange,
    columnWidth: '30px',
    selectedRowKeys: selectedMetricIds,
    preserveSelectedRowKeys: true,
  };

  return (
    <>
      <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
        <Col md={GRID_COL_FULL_ROW_SPAN} xxl={GRID_COL_HALF_ROW_SPAN}>
          <Search
            id="selectMetrics_search"
            className={styles.search}
            placeholder="Search by Metric"
            onChange={(event): void => {
              setSearchValue(event.target.value);
            }}
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
      <Row>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item
            rules={rules}
            name="metrics"
            className={styles.metricsField}
          >
            <MetricsTable
              id="selectMetrics_table"
              className={styles.table}
              dataSource={displayedData}
              isLoading={isLoading}
              columnNamesList={columnsList}
              columnWidth={columnWidth}
              scroll={{
                y: 280,
                x: 'max-content',
              }}
              rowSelection={rowSelection}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export const MetricsPicker = React.memo(MetricsPickerFn);
