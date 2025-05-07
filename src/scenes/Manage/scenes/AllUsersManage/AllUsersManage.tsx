import React, { FC, useEffect } from 'react';
import { allUsersStore } from 'store';
import { WithClass } from 'types';
import { PageSectionWrapper } from '../../../../components';
import { Input, Space, Table } from 'antd';
import styles from './AllUsersManage.module.scss';
import { SearchOutlined } from '@ant-design/icons';
import { allUsersManageColumns } from './constants';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { TableProps } from 'antd/lib/table';
import { ColumnWidth } from '../../../../types/metricTableItem';
import { getPopupContainer } from '../../../../tools/antConfig';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { SorterResult } from 'antd/es/table/interface';
import { AllUsers } from 'types/allUsers';
import { useDebouncedCallback } from 'use-debounce';

type AllUsersProps = TableProps<AllUsers> &
  WithClass & {
    layout?: 'auto' | 'fixed';
    columnNamesList: string[];
    columnWidth?: ColumnWidth;
  };

/**
 * Variables
 */
const pageSizeOptions = ['10', '25', '50', '100'];

export const AllUsersManage: FC<AllUsersProps> = observer(
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
      getAllUsers,
      allUsers,
      setSearchUsers,
      searchUsers,
      setPagination,
      setLoading,
      pagination,
      loading,
    } = allUsersStore;

    /**
     * Handlers
     */
    const onTableChange = (
      pagination: TablePaginationConfig,
      filters: Record<string, (string | number | boolean)[] | null>,
      sorter: SorterResult<AllUsers> | SorterResult<AllUsers>[],
    ) => {
      const pageNumber =
        pagination.current !== undefined
          ? pagination.current - 1
          : pagination.current;
      setPagination({ current: pageNumber, pageSize: pagination.pageSize });
      getAllUsers(pageNumber, pagination.pageSize, searchUsers, sorter);
    };

    const allUsersFetch = () => {
      setPagination({ current: 0, pageSize: 10 });
      setLoading(true);
      getAllUsers(0, 10, searchUsers).then(() => {
        setLoading(false);
      });
    };

    const debouncedUpdateSearchParam = useDebouncedCallback(
      (value: string) =>
        getAllUsers(0, pagination.pageSize, value).then(() => {
          setLoading(false);
          setSearchUsers(value);
        }),
      400,
    );

    const search = (value: string) => {
      if (
        value.length >= 3 ||
        (searchUsers.length !== 0 && value.length === 0)
      ) {
        setLoading(true);
        debouncedUpdateSearchParam(value);
      }
    };

    /**
     * Effects
     */
    useEffect(() => {
      setSearchUsers(''); //to reset search when page is loading
    }, []);

    useEffect(() => {
      window.scrollTo(0, 0);
      allUsersFetch();
    }, [searchUsers]);

    return (
      <PageSectionWrapper title="All Cloud Users">
        <div className={styles.allUsersWrapper}>
          <Space className={styles.tableSearchBar}>
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
          <Table
            loading={loading}
            rowKey={rowKey}
            tableLayout={layout}
            onChange={onTableChange}
            pagination={{
              ...toJS(pagination),
              showSizeChanger: true,
              pageSizeOptions,
              total: allUsers.totalElements,
            }}
            showSorterTooltip={true}
            className={className}
            dataSource={toJS(allUsers.content)}
            columns={allUsersManageColumns}
            getPopupContainer={getPopupContainer}
            scroll={{
              x: 'max-content',
            }}
            {...props}
          />
        </div>
      </PageSectionWrapper>
    );
  },
);
