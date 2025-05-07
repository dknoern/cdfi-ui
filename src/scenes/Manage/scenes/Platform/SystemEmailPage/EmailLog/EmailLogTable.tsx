import React, {FC, useEffect} from 'react';
import {DatePicker, Spin, Table} from "antd";
import { observer } from 'mobx-react';
import {emailLogColumns} from './EmailLogColumns';
import {getPopupContainer} from "../../../../../../tools/antConfig";
import {EmailLogDetailsModal} from "./EmailLogDetailsModal";
import {systemEmailStore} from "../../../../../../store";
import {TablePaginationConfig} from "antd/lib/table/interface";
import {SorterResult} from "antd/es/table/interface";
import moment, {Moment} from 'moment';
import {toJS} from "mobx";
import {RangeValue} from "rc-picker/lib/interface";
import styles from "./EmailLog.module.scss";

const pageSizeOptions = ['5', '10', '20'];

export const EmailLogTable: FC = observer(() => {
  const { RangePicker } = DatePicker;
  const {
    isViewEmailDetails,
    setIsViewEmailDetails,
    getEmailLog,
    emailLog,
    setPaginationEmailLog,
    paginationEmailLog,
    sorterEmailLog,
    loadingEmailLogFile,
    setDateSentRange,
    dateSentRange
  } = systemEmailStore;

  useEffect(() => {
    setDateSentRange({from: '1970-01-01', to: moment( ).format('YYYY-MM-DD')});
    getEmailLog(0, 20, {order: 'ascend', field: 'dateSent'}, '1970-01-01', moment( ).format('YYYY-MM-DD'));
    window.scrollTo(0, 0)
  }, [])

  const onChangeDatePicker = (
    date: RangeValue<Moment> | null,
    dateRange: [string, string],
  ): void => {

    setDateSentRange({from: dateRange[0], to: dateRange[1]});
    setPaginationEmailLog({current: 0, pageSize: paginationEmailLog.pageSize})

    if(date === null) {
      setDateSentRange({from: '1970-01-01', to: moment( ).format('YYYY-MM-DD')});
      getEmailLog(0, paginationEmailLog.pageSize, sorterEmailLog, '1970-01-01', moment( ).format('YYYY-MM-DD'));
    } else {
      getEmailLog(0, paginationEmailLog.pageSize, sorterEmailLog, dateRange[0], dateRange[1])
    }
  };

  const onTableChange = (paginationEmailLog: TablePaginationConfig,
                         filters: Record<string, (string | number | boolean)[] | null>,
                         sorter: SorterResult<any>[]) => {
    const pageNumber = paginationEmailLog.current !== undefined ? paginationEmailLog.current - 1 : paginationEmailLog.current;
    setPaginationEmailLog({current: pageNumber, pageSize: paginationEmailLog.pageSize})
    getEmailLog(pageNumber, paginationEmailLog.pageSize, sorter, dateSentRange.from, dateSentRange.to)
  }

  return emailLog && (
    <>
     <div className={styles.filterWrapper}>
       <p>Filter Date Sent:</p>
       <RangePicker
         allowClear
         onChange={onChangeDatePicker}
       />
     </div>
      {loadingEmailLogFile ? <div className={styles.spin}><Spin spinning /></div> : null}
      <Table
        tableLayout='fixed'
        showSorterTooltip={false}
        // @ts-ignore
        onChange={onTableChange}
        pagination={{
          ...toJS(paginationEmailLog),
          showSizeChanger: true,
          pageSizeOptions,
          total: emailLog.totalElements,
        }}
        dataSource={emailLog.content}
        // @ts-ignore
        columns={emailLogColumns}
        getPopupContainer={getPopupContainer}
        scroll={{ y: 480 }}
      />
      <EmailLogDetailsModal
        visible={isViewEmailDetails}
        onClose={(): void => setIsViewEmailDetails(false)}
      />
    </>
  )
})
