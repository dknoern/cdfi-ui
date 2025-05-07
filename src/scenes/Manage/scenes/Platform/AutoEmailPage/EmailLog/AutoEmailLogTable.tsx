import React, { FC, useEffect } from 'react';
import { Spin, Table } from 'antd';
import { observer } from 'mobx-react';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { SorterResult } from 'antd/es/table/interface';
import { toJS } from 'mobx';
import { EmailLogDetailsModal } from './EmailLogDetailsModal';
import { getPopupContainer } from '../../../../../../tools/antConfig';
import { emailLogColumns } from './EmailLogColumns';
import { autoEmailStore } from '../../../../../../store';
import styles from './EmailLog.module.scss';

const pageSizeOptions = ['5', '10', '20'];

export const AutoEmailLogTable: FC = observer(() => {
  const {
    getEmailLog,
    emailLog,
    setPaginationEmailLog,
    paginationEmailLog,
    loadingEmailLogFile,
    isViewEmailDetails,
    setIsViewEmailDetails,
  } = autoEmailStore;

  useEffect(() => {
    getEmailLog(0, 20, { order: 'ascend', field: 'dateSent' });
    window.scrollTo(0, 0);
  }, []);

  const onTableChange = (
    paginationEmailLog: TablePaginationConfig,
    filters: Record<string, (string | number | boolean)[] | null>,
    sorter: SorterResult<any>[],
  ) => {
    const pageNumber =
      paginationEmailLog.current !== undefined
        ? paginationEmailLog.current - 1
        : paginationEmailLog.current;
    setPaginationEmailLog({
      current: pageNumber,
      pageSize: paginationEmailLog.pageSize,
    });
    getEmailLog(pageNumber, paginationEmailLog.pageSize, sorter);
  };

  return (
    emailLog && (
      <>
        {loadingEmailLogFile ? (
          <div className={styles.spin}>
            <Spin spinning />
          </div>
        ) : null}
        <Table
          tableLayout="fixed"
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
  );
});
