import React, { FC, useState, useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react';
import { TableRowSelection } from 'antd/lib/table/interface';
import { MetricRowItem } from 'types/metricTableItem';
import { PageSectionWrapper, ContentLimiter, TablePlace } from 'components';
import { showFormHideConfirmation } from 'tools/formTools';
import { useAggregatedMetrics } from 'dataManagement';
import { dataMan } from 'dataManagement/managers';
import { Input } from 'antd';
import { AddMetric, EditMetric, DeleteMetric } from './components';
import { makeActionButtons } from './components/ActionButtons';
import styles from './AggregatedMetrics.module.scss';
import { AggregatedMetric, AggregatedMetricUpdateData } from '../../../types';
import { columnsList } from './constants';
import { AggregatedMetricsTable } from '../../../components/AggregatedMetricsTable';

interface ManageAggregatedMetricsProps {
  cdfiId?: number;
  cdfiName?: string;
  cdfiLogoUrl?: string;
}

const metricMan = dataMan.managers.aggregatedMetrics;

const ManageAggregatedMetricsFn: FC<ManageAggregatedMetricsProps> = () => {
  const equationType = 'AGGREGATE';
  const { Search } = Input;
  const {
    data: metrics,
    isLoading,
    reload,
  } = useAggregatedMetrics(equationType);
  const [filterTable, setFilterTable] = useState<AggregatedMetric[]>([]);
  const [showAddMetricForm, setShowAddMetricForm] = useState(false);
  const [showEditMetricForm, setShowEditMetricForm] = useState(false);
  const [showDeleteMetricModal, setShowDeleteMetricModal] = useState(false);
  const [selected, setSelected] = useState<React.Key[]>([]);
  const [selectedMetric, setSelectedMetric] =
    useState<AggregatedMetricUpdateData | null>(null);
  const [searchText, setSearchText] = useState('');

  const usedMetrics = useMemo(() => {
    return (metrics ?? []).filter((item) => item);
  }, [metrics]);

  const selectedMetrics = useMemo(() => {
    return selected
      .map((key) => usedMetrics.find((metric) => metric.id === key))
      .filter(Boolean) as AggregatedMetric[];
  }, [selected, usedMetrics]);

  const getMetricData = useCallback(
    (selectedRowKeys: React.Key[]) => {
      return usedMetrics.find(
        (item) => item.id === selectedRowKeys[0],
      ) as AggregatedMetric;
    },
    [usedMetrics],
  );

  const updateMetricData = useCallback(
    (selectedRowKeys: React.Key[]): void => {
      if (selectedRowKeys.length !== 1) {
        setSelectedMetric(null);
        return;
      }
      const currentMetric = getMetricData(selectedRowKeys);
      if (currentMetric) {
        setSelectedMetric({
          ...currentMetric,
          id: currentMetric.id,
          metricIds: currentMetric.metrics.map((metric) => metric.id),
        });
      }
    },
    [getMetricData],
  );

  const rowSelection: TableRowSelection<MetricRowItem> = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelected(selectedRowKeys);
      updateMetricData(selectedRowKeys);
    },
    selectedRowKeys: selected,
  };

  const handleCloseAll = useCallback(() => {
    setShowAddMetricForm(false);
    setShowEditMetricForm(false);
    setShowDeleteMetricModal(false);
  }, []);

  const handleHide = useCallback(() => {
    showFormHideConfirmation(handleCloseAll);
  }, [handleCloseAll]);

  const handleReload = useCallback(() => {
    handleCloseAll();
    setSelected([]);
    setSelectedMetric(null);
    reload();
    metricMan.reloadAggregatedMetrics(equationType);
  }, [handleCloseAll, reload, equationType]);

  useEffect(() => {
    const filteredMetrics = metrics?.filter(
      (metric) =>
        metric.name.toLowerCase().includes(searchText.toLowerCase()) ||
        metric.metrics.some(
          (subMetric) =>
            subMetric.name.toLowerCase().includes(searchText.toLowerCase()) ||
            subMetric.accountCode
              .toLowerCase()
              .includes(searchText.toLowerCase()),
        ),
    );

    setFilterTable(filteredMetrics || []);
    if (!selected.length) return;

    const metricIds = (usedMetrics || []).map((item) => item.id);

    if (selected.some((metricId) => !metricIds.includes(metricId as number))) {
      setSelected([]);
    }
  }, [usedMetrics, metrics, selected, searchText]);

  const actionButtons = useMemo(
    () =>
      makeActionButtons({
        startAddMetric: (): void => setShowAddMetricForm(true),
        startEditMetric: (): void => setShowEditMetricForm(true),
        startDeleteMetric: (): void => setShowDeleteMetricModal(true),
        selectedMetricKeys: selected,
      }),
    [selected],
  );

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const searchValue = e.target.value.trim().toLowerCase();
    setSearchText(searchValue);
    if (searchValue) {
      const filtered = searchValue
        ? usedMetrics.filter((equation) => {
            if (equation.name.toLowerCase().includes(searchValue)) {
              return true;
            }
            return equation.metrics.some((metric) => {
              return (
                metric.name.toLowerCase().includes(searchValue) ||
                metric.accountCode.toLowerCase().includes(searchValue)
              );
            });
          })
        : metrics || [];

      setFilterTable(filtered);
    } else {
      setFilterTable(metrics || []);
    }
  };

  return (
    <div className={styles.sectionWrapper}>
      <ContentLimiter>
        <PageSectionWrapper
          title="Metric Aggregation"
          className={`${styles.pageSection}`}
        >
          <div className={styles.actionRowWrapper}>
            <div className={styles.searchWrapper}>
              <Search
                onChange={onSearch}
                style={{ width: 250 }}
                placeholder="Search"
                allowClear
              />
            </div>
            <div className={styles.actionButtonsWrapper}>{actionButtons}</div>
          </div>
          <TablePlace>
            {(tableHeight): JSX.Element => (
              <AggregatedMetricsTable
                id="aggregatedMetrics"
                dataSource={filterTable}
                columnNamesList={columnsList}
                isLoading={isLoading}
                rowSelection={rowSelection}
                scroll={{ y: tableHeight }}
              />
            )}
          </TablePlace>
        </PageSectionWrapper>
      </ContentLimiter>
      {showAddMetricForm && (
        <AddMetric onClose={handleHide} onFinish={handleReload} />
      )}
      {showEditMetricForm && (
        <EditMetric
          onFinish={handleReload}
          onClose={handleHide}
          metric={selectedMetric}
        />
      )}
      {showDeleteMetricModal && (
        <DeleteMetric
          visible={showDeleteMetricModal}
          onClose={handleCloseAll}
          reload={handleReload}
          metrics={selectedMetrics}
        />
      )}
    </div>
  );
};

export const ManageAggregatedMetrics = observer(ManageAggregatedMetricsFn);
