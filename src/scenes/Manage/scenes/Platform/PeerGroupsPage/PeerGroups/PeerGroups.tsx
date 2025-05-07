import React, { FC, useEffect, useState } from 'react';
import { peerGroupStore } from 'store';
import { ColumnWidth, WithClass } from 'types';
import { PageSectionWrapper } from 'components';
import { Button, Col, Divider, Input, Row, Space, Table } from 'antd';
import styles from '../PeerGroupsPage.module.scss';
import { SearchOutlined } from '@ant-design/icons';
import { peerGroupsManageColumns } from './constants';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { TableProps } from 'antd/lib/table';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { SorterResult } from 'antd/es/table/interface';
import { PeerGroupI } from 'types/peerGroups';
import { useDebouncedCallback } from 'use-debounce';
import { getPopupContainer } from 'tools/antConfig';
import {
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_THREE_QUARTERS_ROW_SPAN,
} from 'constants/ui';
import { PeerGroupsEditModal } from './PeerGroupsEditModal';

type PeerGroupsProps = TableProps<PeerGroupI> &
  WithClass & {
    layout?: 'auto' | 'fixed';
    columnNamesList: string[];
    columnWidth?: ColumnWidth;
  };

type TableOnChange<T> = (
  pagination: TablePaginationConfig,
  filters: Record<string, (boolean | React.Key)[] | null>,
  sorter: SorterResult<T> | SorterResult<T>[],
) => void;
/**
 * Variables
 */
const pageSizeOptions = ['10', '25', '50', '100'];

export const PeerGroups: FC<PeerGroupsProps> = observer(
  ({
    layout = 'auto',
    dataSource,
    columnNamesList,
    className,
    rowKey = 'id',
    columnWidth,
    ...props
  }) => {
    const {
      getAllCdfis,
      getTotalCdfis,
      peerGroups,
      setSearchPeerGroups,
      searchPeerGroups,
      setPagination,
      setLoading,
      pagination,
      loading,
    } = peerGroupStore;

    const [isEditModalVisible, setEditModalVisibility] = useState(false);

    /**
     * Handlers
     */
    const onTableChange = (
      pagination: TablePaginationConfig,
      filters: Record<string, (string | number | boolean)[] | null>,
      sorter: SorterResult<PeerGroupI> | SorterResult<PeerGroupI>[],
    ) => {
      const pageNumber =
        pagination.current !== undefined
          ? pagination.current - 1
          : pagination.current;
      setPagination({ current: pageNumber, pageSize: pagination.pageSize });
      getAllCdfis(pageNumber, pagination.pageSize, searchPeerGroups, sorter);
    };

    const peerGroupsFetch = () => {
      setPagination({ current: 0, pageSize: 10 });
      setLoading(true);
      getAllCdfis(0, 10, searchPeerGroups).then(() => {
        setLoading(false);
      });
    };

    const debouncedUpdateSearchParam = useDebouncedCallback(
      (value: string) =>
        getAllCdfis(0, pagination.pageSize, value).then(() => {
          setLoading(false);
          setSearchPeerGroups(value);
        }),
      400,
    );

    const search = (value: string) => {
      if (
        value.length >= 3 ||
        (searchPeerGroups.length !== 0 && value.length === 0)
      ) {
        setLoading(true);
        debouncedUpdateSearchParam(value);
      }
    };

    const handleEditModalClose = () => {
      setEditModalVisibility(false);
    };

    const refreshTable = () => {
      setLoading(true);
      getAllCdfis(0, pagination.pageSize, searchPeerGroups).then(() =>
        setLoading(false),
      );
    };

    /**
     * Effects
     */
    useEffect(() => {
      setSearchPeerGroups('');
      getTotalCdfis();
    }, []);

    useEffect(() => {
      window.scrollTo(0, 0);
      peerGroupsFetch();
    }, [searchPeerGroups]);

    return (
      <PageSectionWrapper title="Manage Peer Groups">
        <div className={styles.peerGroupsWrapper}>
          <Row gutter={[GRID_COL_FULL_ROW_SPAN, 0]}>
            <Button
              id="ManagePeerGroupButton"
              onClick={() => setEditModalVisibility(true)}
              type="primary"
              className={styles.updatePeerGroupBtn}
            >
              Update All CDFIs
            </Button>
          </Row>
          <Divider style={{ border: '1px solid light-grey' }} />

          <Space style={{ marginBottom: '8px' }}>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.persist();
                search(e.target.value.toLowerCase());
              }}
              placeholder="Search"
              allowClear
              suffix={<SearchOutlined />}
            />
          </Space>

          <Col span={GRID_COL_THREE_QUARTERS_ROW_SPAN} />
          <Table
            loading={loading}
            rowKey={rowKey}
            tableLayout={layout}
            onChange={onTableChange as TableOnChange<PeerGroupI>}
            pagination={{
              ...toJS(pagination),
              showSizeChanger: true,
              pageSizeOptions,
              total: peerGroups.totalElements,
            }}
            showSorterTooltip={true}
            className={className}
            dataSource={toJS(peerGroups.content)}
            columns={peerGroupsManageColumns}
            getPopupContainer={getPopupContainer}
            scroll={{
              x: 'max-content',
            }}
            {...props}
          />
        </div>
        <PeerGroupsEditModal
          visible={isEditModalVisible}
          onClose={handleEditModalClose}
          onFinish={refreshTable}
          formId="PeerGroupEditForm"
        />
      </PageSectionWrapper>
    );
  },
);
