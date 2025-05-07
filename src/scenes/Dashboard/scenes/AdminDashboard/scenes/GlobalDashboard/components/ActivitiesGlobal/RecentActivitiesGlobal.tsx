import React, { FC, useCallback, useEffect, useState } from 'react';
import { Checkbox, Input, Select, Space, Table, Modal, Button } from 'antd';
import { TableProps } from 'antd/lib/table';
import { Activity, WithClass } from 'types';
import { ColumnWidth } from 'types/metricTableItem';
import { getPopupContainer } from 'tools/antConfig';
import {
  recentActivityGlobalColumns,
  recentActivityDataVarianceColumns,
} from './constants';
import { toJS } from 'mobx';
import {
  recentActivitiesStore,
  userStore,
} from '../../../../../../../../store';
import { Delete } from '../../../../../../../../components/EditButtonsLine/components';
import styles from '../Activities/RecentActivities.module.scss';
import { SearchOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { useDebouncedCallback } from 'use-debounce';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CompanyDataVarianceStatus } from '../../../../../../../../types/dataVarianceStatus';

type SystemEmailTableProps = TableProps<any | undefined> &
  WithClass & {
    layout?: 'auto' | 'fixed';
    isLoading?: boolean;
    columnWidth?: ColumnWidth;
    showStatusIcon?: boolean;
    onDelete: (activityIds: Activity['id'][]) => Promise<void>;
    activeKey: string;
  };

const pageSizeOptions = ['25', '50', '100'];

export const RecentActivitiesGlobal: FC<SystemEmailTableProps> = observer(
  ({
    layout = 'auto',
    activeKey,
    dataSource,
    className,
    rowKey = 'id',
    isLoading,
    columnWidth,
    showStatusIcon = false,
    ...props
  }) => {
    const {
      recentActivitiesGlobal,
      getRecentActivitiesGlobal,
      recentDataVarianceActivities,
      getDataVarianceRecentActivities,
      recentDataVarianceCdfis,
      getDataVarianceCdfis,
      setPagination,
      pagination,
      searchActivities,
      setSearchActivities,
      loading,
      setLoading,
      adminContractorUsers,
      getAdminContractorUsers,
    } = recentActivitiesStore;
    const isDataVariance = activeKey === 'dataVariance';

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [showRecentPeriod, setShowRecentPeriod] = useState<boolean>(true);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [assignedToFilter, setAssignedToFilter] = useState<number[]>([]);
    const [statusFilter, setStatusFilter] = useState<string[]>([]);
    const [companyFilter, setCompanyFilter] = useState<number[]>([]);
    const [loadingCdfis, setLoadingCdfis] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalData, setModalData] = useState<CompanyDataVarianceStatus | null>(null);

    const handleOpenModal = (record: CompanyDataVarianceStatus) => {
      setModalData(record);
      setIsModalVisible(true);
    };

    const handleCloseModal = () => {
      setModalData(null);
      setIsModalVisible(false);
    };

    const handlePrint = () => {
      const printContent = document.getElementById('print-container');

      if (printContent) {
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.top = '-9999px'; // Hide iframe
        document.body.appendChild(iframe);

        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;

        if (iframeDocument) {
          iframeDocument.open();
          iframeDocument.write(`
        <html>
          <head>
            <title>Print Table</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
                white-space: nowrap;
              }
              th {
                background-color: #f2f2f2;
              }
            </style>
          </head>
          <body>${printContent.outerHTML}</body>
        </html>
      `);
          iframeDocument.close();

          iframe.onload = () => {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
            setTimeout(() => document.body.removeChild(iframe), 1000);
          };
        }
      } else {
        console.error('Print container not found.');
      }
    };


    const hasMetricValue = modalData?.metricVarianceValues?.some(
      (row) => row.metricValue !== null && row.metricValue !== undefined
    );

    const getColumnConfig = (): Record<string, any>[] => {
      if (!isDataVariance) {
        return recentActivityGlobalColumns;
      }
      return recentActivityDataVarianceColumns(handleOpenModal);
    };

    const columnConfig = getColumnConfig();

    const onDelete = useCallback(() => {
      setLoading(true);
      props.onDelete(selectedIds).then(() => {
        getRecentActivitiesGlobal(
          activeKey,
          pagination.current,
          pagination.pageSize,
          searchActivities,
        ).then(() => {
          setLoading(false);
        });
      });
      setSelectedIds([]);
      setSelectedRowKeys([]);
    }, [
      activeKey,
      getRecentActivitiesGlobal,
      pagination,
      props,
      searchActivities,
      selectedIds,
      setLoading,
    ]);

    const rowSelection = {
      onChange: (slctdRowKeys: React.Key[], selectedRows: any): void => {
        const ids = selectedRows.map((activity: { id: any }) => activity.id);
        setSelectedIds(ids);
        setSelectedRowKeys(slctdRowKeys);
      },
      selectedRowKeys,
    };

    const handleRecentPeriod = (checked: CheckboxChangeEvent): void => {
      setShowRecentPeriod(!checked.target.checked);
    };

    const onAssignedToFilterChange = (value: number[]): void => {
      setAssignedToFilter(value);
    };

    const onStatusFilterChange = (value: string[]): void => {
      setStatusFilter(value);
    };

    const onCompanyFilterChange = (value: number[]): void => {
      setCompanyFilter(value);
    };

    const onTableChange: TableProps<any>['onChange'] = (pgnation) => {
      const pageNumber =
        pgnation.current !== undefined
          ? pgnation.current - 1
          : pgnation.current;
      setPagination({ current: pageNumber, pageSize: pgnation.pageSize });
      if (isDataVariance) {
        setLoading(true);
        getDataVarianceRecentActivities(
          assignedToFilter,
          statusFilter,
          companyFilter,
          showRecentPeriod,
          pageNumber,
          pgnation.pageSize,
        ).then(() => setLoading(false));
        getDataVarianceCdfis(
          assignedToFilter,
          statusFilter,
          showRecentPeriod,).then(() => setLoadingCdfis(false));
        console.log(recentDataVarianceCdfis);
      } else {
        setLoading(true);
        getRecentActivitiesGlobal(
          activeKey,
          pageNumber,
          pgnation.pageSize,
          searchActivities,
        ).then(() => {
          setLoading(false);
        });
        console.log(recentDataVarianceCdfis);
      }
    };

    const debouncedUpdateSearchParam = useDebouncedCallback(
      (value: string) =>
        getRecentActivitiesGlobal(
          activeKey,
          pagination.current,
          pagination.pageSize,
          value,
        ).then(() => {
          setLoading(false);
          setSearchActivities(value);
        }),
      400,
    );

    const search = (value: string): void => {
      if (
        value.length >= 3 ||
        (searchActivities.length !== 0 && value.length === 0)
      ) {
        setLoading(true);
        debouncedUpdateSearchParam(value);
      }
    };

    const columns = [
      { title: 'Metric ID', dataIndex: 'metricId', key: 'metricId' },
      { title: 'Metric Code', dataIndex: 'metricCode', key: 'metricCode' },
      { title: 'Metric Name', dataIndex: 'metricName', key: 'metricName' },
      ...(hasMetricValue
        ? [
            {
              title: 'Metric Value',
              dataIndex: 'metricValue',
              key: 'metricValue',
              render: (value: number) =>
                value !== null && value !== undefined
                  ? parseFloat(value.toFixed(2)).toString()
                  : '',
            },
        ]
        : []),
      { title: 'Variance Issue Type', dataIndex: 'varianceIssueType', key: 'varianceIssueType' },
    ];

    /**
     * Effects
     */
    useEffect(() => {
      setSearchActivities(''); // to reset search when page is loading
      window.scrollTo(0, 0);
    }, [setSearchActivities]);

    useEffect(() => {
      if (!adminContractorUsers) {
        getAdminContractorUsers().then(() => setLoadingUsers(false));
      } else {
        setLoadingUsers(false);
      }
    }, [getAdminContractorUsers, adminContractorUsers]);

    useEffect(() => {
      if (!recentDataVarianceCdfis) {
        getDataVarianceCdfis(
          assignedToFilter,
          statusFilter,
          showRecentPeriod,).then(() => setLoadingCdfis(false));
      } else {
        setLoadingCdfis(false);
      }
    }, [getDataVarianceCdfis, recentDataVarianceCdfis]);

    useEffect(() => {
      setLoading(true);
      getDataVarianceRecentActivities(
        assignedToFilter,
        statusFilter,
        companyFilter,
        showRecentPeriod,
        0,
        100,
      ).then(() => setLoading(false));
    }, [assignedToFilter, statusFilter, companyFilter, showRecentPeriod]);

    return (
      <div>
        <Space className={styles.tableSearchBar}>
          {isDataVariance && (
            <Checkbox checked={!showRecentPeriod} onChange={handleRecentPeriod}>
              Show all periods
            </Checkbox>
          )}
          {isDataVariance && (
            <>
              <span>Filter By User: </span>
              <Select
                className={styles.userSelect}
                loading={loadingUsers}
                mode="multiple"
                options={adminContractorUsers?.map((user) => {
                  return {
                    value: user.id,
                    label: `${user.firstName} ${user.lastName}`,
                  };
                })}
                onChange={onAssignedToFilterChange}
              />
              <span>Filter By Status: </span>
              <Select
                className={styles.userSelect}
                mode="multiple"
                options={[
                  {value: 'NOT_STARTED', label: 'Not Started'},
                  {value: 'IN_PROGRESS', label: 'In Progress'},
                  {value: 'COMPLETED', label: 'Completed'},
                ]}
                onChange={onStatusFilterChange}
              />
              <span>Filter By CDFI: </span>
              <Select
                className={styles.userSelect}
                loading={loadingCdfis}
                mode="multiple"
                options={recentDataVarianceCdfis?.map((cdfi) => {
                  return {
                    value: cdfi.id,
                    label: cdfi.name,
                  };
                })}
                onChange={onCompanyFilterChange}
              />
            </>
          )}
          {!isDataVariance && (
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                e.persist();
                search(e.target.value.toLowerCase());
              }}
              placeholder="Search Recent Activities..."
              allowClear
              suffix={<SearchOutlined/>}
            />
          )}
        </Space>
        {(userStore.isAerisAdmin || userStore.isContractor ||
          userStore.isStaff) &&
          !isDataVariance && (
            <Delete
              disabled={!selectedIds.length}
              onClick={onDelete}
              text="Delete selection"
              style={styles.button}
            />
          )}
        <Table
          loading={loading}
          rowSelection={
            isDataVariance ? undefined : { type: 'checkbox', ...rowSelection }
          }
          rowKey={rowKey}
          tableLayout={layout}
          onChange={onTableChange}
          pagination={{
            ...toJS(pagination),
            showSizeChanger: true,
            pageSizeOptions,
            total: isDataVariance
              ? recentDataVarianceActivities?.totalElements
              : recentActivitiesGlobal.totalElements,
          }}
          showSorterTooltip={false}
          className={className}
          dataSource={dataSource}
          columns={columnConfig}
          getPopupContainer={getPopupContainer}
          {...props}
        />
        <Modal
          title={`${modalData?.companyAssignmentStatus.companyName} - Q${modalData?.companyAssignmentStatus.fiscalQuarter} ${modalData?.companyAssignmentStatus.fiscalYear}`}
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={[
            // <Button key="print" onClick={handlePrint}>
            //   Print
            // </Button>,
            <Button key="close" onClick={handleCloseModal}>
              Close
            </Button>,
          ]}
          style={{ top: 20 }}
          bodyStyle={{
            maxHeight: '70vh',
            overflowY: 'auto',
            padding: 0,
          }}
          width="60%"
        >
          <div id="print-container">
            <Table
              className="my-printable-table"
              dataSource={modalData?.metricVarianceValues || []}
              columns={columns}
              rowKey="id"
              pagination={false}
              scroll={{
                x: 'max-content', // Enable horizontal scrolling
                y: '50vh', // Enable vertical scrolling
              }}
            />
          </div>
        </Modal>
      </div>
    );
  },
);
