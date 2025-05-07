import React, { FC, useEffect } from 'react';
import { Spin, Table } from 'antd';
import { observer } from 'mobx-react';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { SorterResult } from 'antd/es/table/interface';
import { toJS } from 'mobx';
import { IGlobalGraph } from 'types/globalGraph';
import { getPopupContainer } from '../../../../../../tools/antConfig';
import { globalGraphsColumns } from './constants';
import { globalGraphsStore } from '../../../../../../store';
import styles from '../GraphsPage.module.scss';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';

const pageSizeOptions = ['5', '10', '20'];

export const GlobalGraphsTable: FC = observer(() => {
  const {
    getGlobalGraphs,
    globalGraphs,
    setPagination,
    pagination,
    loadingGlobalGraphs,
    setIsDeleteGlobalGraph,
    getDeleteGlobalGraph,
    isDeleteGlobalGraph,
    globalGraph,
    setGlobalGraph,
  } = globalGraphsStore;

  useEffect(() => {
    window.scrollTo(0, 0);
    getGlobalGraphs(0, 20, { order: 'ascend', field: 'title' });
  }, [getGlobalGraphs]);

  const onTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, (string | number | boolean)[] | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
  ) => {
    const pageNumber =
      pagination.current !== undefined
        ? pagination.current - 1
        : pagination.current;
    setPagination({
      current: pageNumber,
      pageSize: pagination.pageSize,
    });
    getGlobalGraphs(pageNumber, pagination.pageSize, sorter);
  };

  const clickConfirmDeleteGraph = async () => {
    getDeleteGlobalGraph(globalGraph?.id);
    if (globalGraph?.id) {
      const updatedGraphs: IGlobalGraph[] = globalGraphs.content.filter(
        (graph: IGlobalGraph) => graph.id !== globalGraph.id,
      );
      globalGraphs.content = updatedGraphs;
    }
    setIsDeleteGlobalGraph(false);
    setGlobalGraph({});
  };

  return (
    globalGraphs && (
      <>
        {loadingGlobalGraphs ? (
          <div className={styles.spin}>
            <Spin spinning />
          </div>
        ) : null}

        <Table
          tableLayout="fixed"
          rowKey="id"
          showSorterTooltip
          onChange={onTableChange}
          pagination={{
            ...toJS(pagination),
            showSizeChanger: true,
            pageSizeOptions,
            total: globalGraphs.totalElements,
          }}
          dataSource={globalGraphs.content}
          columns={globalGraphsColumns}
          getPopupContainer={getPopupContainer}
          scroll={{ x: 'max-content' }}
        />
        <ConfirmModal
          visible={isDeleteGlobalGraph}
          onClose={(): void => setIsDeleteGlobalGraph(false)}
          onClick={clickConfirmDeleteGraph}
          text="Do you really want to delete this graph?"
          buttonText="Yes"
        />
      </>
    )
  );
});
