import React, { FC, useEffect, useState } from 'react';
import { allSubscribersStore } from 'store';
import { SubscriberSubscriptionEditFormData, WithClass } from 'types';
import { Input, Space, Table, Button, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { TableProps } from 'antd/lib/table';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { SorterResult } from 'antd/es/table/interface';
import { AllSubscribers } from 'types/allSubscribers';
import { useDebouncedCallback } from 'use-debounce';
import { SubscriberSubscriptionEdit } from 'scenes/Dashboard/scenes/SubscriberDashboard/SubscriberSubscriptionEdit';
import { PageSectionWrapper } from '../../../../components';
import { getPopupContainer } from '../../../../tools/antConfig';
import { ColumnWidth } from '../../../../types/metricTableItem';
import { allSubscribersManageColumns } from './constants';
import styles from './AllSubscribersManage.module.scss';

type AllSubscribersProps = TableProps<AllSubscribers> &
  WithClass & {
    layout?: 'auto' | 'fixed';
    columnNamesList: string[];
    columnWidth?: ColumnWidth;
  };

/**
 * Variables
 */
const pageSizeOptions = ['10', '25', '50', '100'];

export const AllSubscribersManage: FC<AllSubscribersProps> = observer(
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
      getAllSubscribers,
      allSubscribers,
      setSearchSubscribers,
      searchSubscribers,
      setPagination,
      setLoading,
      pagination,
      loading,
      exportSubscribersList,
      sorter,
    } = allSubscribersStore;
    const [editingSubscriberSubscription, setEditingSubscriberSubscription] =
      useState<SubscriberSubscriptionEditFormData | undefined>();
    const [loadingSubscribersList, setLoadingSubscribersList] = useState(false);
    /**
     * Handlers
     */
    const onTableChange = (
      pagination: TablePaginationConfig,
      filters: Record<string, (string | number | boolean)[] | null>,
      sorter: SorterResult<AllSubscribers> | SorterResult<AllSubscribers>[],
    ) => {
      const pageNumber =
        pagination.current !== undefined
          ? pagination.current - 1
          : pagination.current;
      setPagination({ current: pageNumber, pageSize: pagination.pageSize });
      getAllSubscribers(
        pageNumber,
        pagination.pageSize,
        searchSubscribers,
        sorter,
      );
    };

    const allSubscribersFetch = () => {
      setPagination({ current: 0, pageSize: 10 });
      setLoading(true);
      getAllSubscribers(0, 10, searchSubscribers).then(() => {
        setLoading(false);
      });
    };

    const debouncedUpdateSearchParam = useDebouncedCallback(
      (value: string) =>
        getAllSubscribers(0, pagination.pageSize, value).then(() => {
          setLoading(false);
          setSearchSubscribers(value);
        }),
      400,
    );

    const search = (value: string) => {
      if (
        value.length >= 3 ||
        (searchSubscribers.length !== 0 && value.length === 0)
      ) {
        setLoading(true);
        debouncedUpdateSearchParam(value);
      }
    };

    const onClickExportSubscribersList = () => {
      setLoadingSubscribersList(true);
      exportSubscribersList().then(() => {
        setLoadingSubscribersList(false);
      });
    };

    /**
     * Effects
     */
    useEffect(() => {
      setSearchSubscribers(''); // to reset search when page is loading
    }, []);

    useEffect(() => {
      window.scrollTo(0, 0);
      allSubscribersFetch();
    }, [searchSubscribers]);
    return (
      <PageSectionWrapper title="All Cloud Subscribers">
        {editingSubscriberSubscription && (
          <SubscriberSubscriptionEdit
            initialValues={editingSubscriberSubscription}
            setInitialValues={setEditingSubscriberSubscription}
          />
        )}
        <div className={styles.allSubscribersWrapper}>
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
          {loadingSubscribersList ? (
            <div className={styles.spinExportSubscribersList}>
              <Spin spinning />
            </div>
          ) : null}
          <div>
            <Button
              type="primary"
              className={styles.downloadBtn}
              onClick={onClickExportSubscribersList}
            >
              Download
            </Button>
          </div>
          <Table
            loading={loading}
            rowKey={rowKey}
            tableLayout={layout}
            onChange={onTableChange}
            pagination={{
              ...toJS(pagination),
              showSizeChanger: true,
              pageSizeOptions,
              total: allSubscribers.totalElements,
            }}
            showSorterTooltip
            className={className}
            dataSource={toJS(allSubscribers.content)}
            columns={allSubscribersManageColumns(
              setEditingSubscriberSubscription,
            )}
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
