import React, { FC, useEffect } from 'react';
import { allOrganizationsStore } from 'store';
import { WithClass } from 'types';
import { PageSectionWrapper } from '../../../../components';
import { Input, Space, Table } from 'antd';
import styles from './AllOrganizationsManage.module.scss';
import { SearchOutlined } from '@ant-design/icons';
import { allOrganizationsManageColumns } from './constants';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { TableProps } from 'antd/lib/table';
import { ColumnWidth } from '../../../../types/metricTableItem';
import { getPopupContainer } from '../../../../tools/antConfig';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { SorterResult } from 'antd/es/table/interface';
import { AllOrganizations } from 'types/allOrganizations';
import { useDebouncedCallback } from 'use-debounce';

type AllOrganizationsProps = TableProps<AllOrganizations> &
  WithClass & {
    layout?: 'auto' | 'fixed';
    columnNamesList: string[];
    columnWidth?: ColumnWidth;
  };

/**
 * Variables
 */
const pageSizeOptions = ['10', '25', '50', '100'];

export const AllOrganizationsManage: FC<AllOrganizationsProps> = observer(
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
      getAllOrganizations,
      allOrganizations,
      setSearchOrganizations,
      searchOrganizations,
      setPagination,
      setLoading,
      pagination,
      loading,
    } = allOrganizationsStore;

    /**
     * Handlers
     */
    const onTableChange = (
      pagination: TablePaginationConfig,
      filters: Record<string, (string | number | boolean)[] | null>,
      sorter: SorterResult<AllOrganizations> | SorterResult<AllOrganizations>[],
    ) => {
      const pageNumber =
        pagination.current !== undefined
          ? pagination.current - 1
          : pagination.current;
      setPagination({ current: pageNumber, pageSize: pagination.pageSize });
      getAllOrganizations(
        pageNumber,
        pagination.pageSize,
        searchOrganizations,
        sorter,
      );
    };

    const allOrganizationsFetch = () => {
      setPagination({ current: 0, pageSize: 10 });
      setLoading(true);
      getAllOrganizations(0, 10, searchOrganizations).then(() => {
        setLoading(false);
      });
    };

    const debouncedUpdateSearchParam = useDebouncedCallback(
      (value: string) =>
        getAllOrganizations(0, pagination.pageSize, value).then(() => {
          setLoading(false);
          setSearchOrganizations(value);
        }),
      400,
    );

    const search = (value: string) => {
      if (
        value.length >= 3 ||
        (searchOrganizations.length !== 0 && value.length === 0)
      ) {
        setLoading(true);
        debouncedUpdateSearchParam(value);
      }
    };

    /**
     * Effects
     */
    useEffect(() => {
      setSearchOrganizations(''); //to reset search when page is loading
    }, []);

    useEffect(() => {
      window.scrollTo(0, 0);
      allOrganizationsFetch();
    }, [searchOrganizations]);

    return (
      <PageSectionWrapper title="All Cloud Organizations">
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
              total: allOrganizations.totalElements,
            }}
            showSorterTooltip={true}
            className={className}
            dataSource={toJS(allOrganizations.content)}
            columns={allOrganizationsManageColumns}
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
