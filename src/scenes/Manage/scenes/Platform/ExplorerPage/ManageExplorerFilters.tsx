import React, { useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react';
import {
  ExplorerFilter,
  manageExplorerStore,
} from '../../../../../store/manageExplorerStore';
import { Table } from 'antd';
import { toJS } from 'mobx';
import { manageFilterColumns } from './Columns';
import { PageSectionWrapper } from '../../../../../components';
import { ManageExplorerFiltersEditModal } from './ManageExplorerFiltersEditModal';
import { addFilterButton } from './Constants';
import { Equation } from '../../../../../forms/ChartCreate/types';

export const ManageExplorerFilters = observer(() => {
  const [availableFilters, setAvailableFilters] = useState<Equation[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const { getExplorerFilters, getAvailableFilters, explorerFilters } =
    manageExplorerStore;

  const fetchExplorerFilters = useCallback((): void => {
    setLoading(true);
    getExplorerFilters().then(() => setLoading(false));
  }, [getExplorerFilters]);

  const fetchAvailableFilters = useCallback((): void => {
    getAvailableFilters().then((data) => {
      setAvailableFilters(data);
    });
  }, [getAvailableFilters]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchExplorerFilters();
    fetchAvailableFilters();
  }, [fetchAvailableFilters, fetchExplorerFilters]);

  return (
    <PageSectionWrapper
      title="Manage Explorer Filters"
      actionButtons={addFilterButton(() => {
        setIsAddModalVisible(true);
      })}
    >
      <Table
        loading={loading}
        dataSource={toJS(explorerFilters)}
        columns={manageFilterColumns()}
        pagination={false}
      />
      <ManageExplorerFiltersEditModal
        onClose={() => setIsAddModalVisible(false)}
        onFinish={fetchExplorerFilters}
        visible={isAddModalVisible}
        availableFilters={availableFilters}
        explorerFilters={explorerFilters as ExplorerFilter[]}
        formId="explorer-filter-form"
      />
    </PageSectionWrapper>
  );
});
