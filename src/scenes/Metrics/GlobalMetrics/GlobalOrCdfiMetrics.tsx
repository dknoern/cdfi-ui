import React, {
  FC,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { observer } from 'mobx-react';
import { TableRowSelection } from 'antd/lib/table/interface';
import { AssignedMetric, GlobalMetric, Metric } from 'types';
import { MetricRowItem, MetricColumns } from 'types/metricTableItem';
import {
  PageSectionWrapper,
  MetricsTable,
  ContentLimiter,
  TablePlace,
} from 'components';
import { LogoHeader } from 'scenes/Dashboard/scenes/CdfiDashboard/LogoHeader';
import { EditMetricType } from 'forms/MetricForm';
import { booleanReducer } from 'tools';
import { showFormHideConfirmation } from 'tools/formTools';
import { useGlobalMetrics, useMetricCategories } from 'dataManagement';
import { dataMan } from 'dataManagement/managers';
import { metricDependenciesStore } from 'store';
import { Input } from 'antd';
import { columnsListShort, columnsListFull } from './constants';
import {
  Categories,
  AddMetric,
  EditMetric,
  EditMetricsBatch,
  CategoryTitle,
  AddCategory,
  EditCategory,
  DeleteCategory,
} from './components';
import { makeActionButtons } from './components/ActionButtons';
import { store } from './store';
import { formatCurrentsTags } from '../tools';
import styles from './Metrics.module.scss';

interface GlobalOrCdfiMetricsProps {
  cdfiId?: number;
  cdfiName?: string;
  cdfiLogoUrl?: string;
}

const metricMan = dataMan.managers.metrics;

const GlobalOrCdfiMetricsFn: FC<GlobalOrCdfiMetricsProps> = ({
  cdfiId,
  cdfiName,
  cdfiLogoUrl,
}) => {
  const { Search } = Input;
  const { data: metrics, isLoading, reload } = useGlobalMetrics(cdfiId);

  const [filterTable, setFilterTable] = useState<GlobalMetric[]>([]);
  const [showAddMetricForm, setShowAddMetricForm] = useState(false);
  const [showEditMetricForm, setShowEditMetricForm] = useState(false);
  const [showEditCategoryForm, setShowEditCategoryForm] = useState(false);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showDeleteCategory, setShowDeleteCategory] = useState(false);
  const [selected, setSelected] = useState<React.Key[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<EditMetricType | null>(
    null,
  );

  const [sidebarOpen, toggleSidebar] = useReducer(booleanReducer, false);

  const {
    viewConfig,
    filterActive,
    resetConfig,
    isNoCategoryActive,
    resetOpenCategories,
  } = store;
  const { reloadCategories, tagIdsMap } = metricDependenciesStore;

  const {
    isLoading: isLoadingMetricCategories,
    hasError: hasErrorMetricCategories,
  } = useMetricCategories();

  useEffect(() => {
    resetConfig();
  }, [resetConfig]);

  const usedMetrics = useMemo(() => {
    if (!filterActive && !isNoCategoryActive) return metrics ?? [];

    if (isNoCategoryActive) {
      return (metrics ?? []).filter(
        (item) => item[MetricColumns.PARENT_ID] === null,
      );
    }

    const field = viewConfig.subCategoryId
      ? MetricColumns.PARENT_ID
      : MetricColumns.GRANDPARENT_ID;
    const categoryId = viewConfig.subCategoryId || store.viewConfig.categoryId;

    return (metrics ?? []).filter((item) => item[field] === categoryId);
  }, [metrics, viewConfig, filterActive, isNoCategoryActive]);

  const getMetricData = useCallback(
    (selectedRowKeys: React.Key[]) => {
      return usedMetrics.find(
        (item) => item.id === selectedRowKeys[0],
      ) as AssignedMetric;
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
          tags: formatCurrentsTags(tagIdsMap, currentMetric.tags),
          parentId: currentMetric.parentId ? currentMetric.parentId : '',
          grandParentId: currentMetric.grandParentId
            ? currentMetric.grandParentId
            : '',
        });
      }
    },
    [tagIdsMap, getMetricData],
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
  }, []);

  const handleHide = useCallback(() => {
    showFormHideConfirmation(handleCloseAll);
  }, [handleCloseAll]);

  const handleReload = useCallback(() => {
    handleCloseAll();
    setSelected([]);
    setSelectedMetric(null);
    reload();
    metricMan.reload(cdfiId);
  }, [handleCloseAll, reload, cdfiId]);

  const handleReloadAfterBatch = useCallback(() => {
    reload();
    metricMan.reload();
  }, [reload]);

  const handleCategoriesReload = useCallback(() => {
    setShowAddCategoryForm(false);
    setShowEditCategoryForm(false);
    setShowDeleteCategory(false);
    reloadCategories();
    reload();
  }, [reload, reloadCategories]);

  const handleCategoryDeleteReload = useCallback(() => {
    handleCategoriesReload();
    resetConfig();
  }, [handleCategoriesReload, resetConfig]);

  // after deleting we need to reset the selected list
  useEffect(() => {
    if (!selected.length) return;

    const metricIds = (usedMetrics || []).map((item) => item.id);

    if (selected.some((metricId) => !metricIds.includes(metricId as number))) {
      setSelected([]);
    }
  }, [usedMetrics, selected]);

  const handleCloseSidebar = useCallback(() => {
    toggleSidebar(false);
    resetConfig();
    resetOpenCategories();
  }, [resetConfig, resetOpenCategories]);

  const actionButtons = useMemo(
    () =>
      makeActionButtons({
        sidebarOpen,
        openSidebar: (): void => {
          toggleSidebar(true);
        },
        closeSidebar: handleCloseSidebar,
        startAddMetric: (): void => setShowAddMetricForm(true),
        startEditMetric: (): void => setShowEditMetricForm(true),
        selectedMetricKeys: selected,
      }),
    [handleCloseSidebar, selected, sidebarOpen],
  );

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const columns: Array<keyof GlobalMetric> = ['name', 'accountCode'];

    const filtered = usedMetrics.filter((o) => {
      return columns.some((k) => {
        return String(o[k]).toLowerCase().includes(value.toLowerCase());
      });
    });

    setFilterTable(filtered);
  };

  return (
    <div className={styles.sectionWrapper}>
      <Categories
        isVisible={sidebarOpen}
        onClose={handleCloseSidebar}
        onAddCategory={(): void => setShowAddCategoryForm(true)}
      />
      <ContentLimiter>
        <PageSectionWrapper
          ratings={!!cdfiId}
          title={
            filterActive || isNoCategoryActive ? (
              <CategoryTitle
                onEditClick={(): void => setShowEditCategoryForm(true)}
                onDeleteClick={(): void => setShowDeleteCategory(true)}
              />
            ) : (
              `${cdfiId ? '' : 'All '}Metrics`
            )
          }
          topTitle={
            cdfiId && (
              <LogoHeader imgPath={cdfiLogoUrl as string} subTitle={cdfiName} />
            )
          }
          className={`${styles.pageSection} ${sidebarOpen ? styles.open : ''}`}
          actionButtons={actionButtons}
        >
          <EditMetricsBatch
            selectedMetricsIds={selected as Metric['id'][]}
            metrics={usedMetrics}
            reload={handleReloadAfterBatch}
          />
          <Search
            onChange={onSearch}
            style={{ width: 250 }}
            placeholder="Search"
            allowClear
            className={styles.searchInput}
          />
          <TablePlace>
            {(tableHeight): JSX.Element => (
              <MetricsTable
                id="allMetrics"
                dataSource={filterTable.length > 0 ? filterTable : usedMetrics}
                columnNamesList={
                  sidebarOpen ? columnsListShort : columnsListFull
                }
                isLoading={isLoading}
                rowSelection={rowSelection}
                scroll={{ y: tableHeight }}
              />
            )}
          </TablePlace>
        </PageSectionWrapper>
      </ContentLimiter>
      {showAddMetricForm && (
        <AddMetric
          onClose={handleHide}
          onFinish={handleReload}
          cdfiId={cdfiId}
        />
      )}
      {showEditMetricForm && (
        <EditMetric
          onFinish={handleReload}
          onClose={handleHide}
          metric={selectedMetric}
        />
      )}
      <AddCategory
        onFinish={handleCategoriesReload}
        onClose={(): void => setShowAddCategoryForm(false)}
        visible={showAddCategoryForm}
      />
      <EditCategory
        onFinish={handleCategoriesReload}
        onClose={(): void => setShowEditCategoryForm(false)}
        visible={showEditCategoryForm}
      />
      <DeleteCategory
        onFinish={handleCategoryDeleteReload}
        onClose={(): void => setShowDeleteCategory(false)}
        visible={showDeleteCategory}
      />
    </div>
  );
};

export const GlobalOrCdfiMetrics = observer(GlobalOrCdfiMetricsFn);
