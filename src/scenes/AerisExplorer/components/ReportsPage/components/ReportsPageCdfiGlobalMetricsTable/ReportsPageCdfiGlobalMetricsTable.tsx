import React from 'react';
import { Row, Table } from 'antd';
import { InnerPageTitle } from 'components/InnerPage/InnerPageTitle';
import { GlobalCdifiWithMetrics } from 'types/peerGroups';
import { transformGlobalMetricsToTableData } from './transformGlobalMetricsToTableData';
import styles from './ReportsPageCdfiGlobalMetricsTable.module.scss';

type ReportsPageCdfiGlobalMetricsTableProps = {
  data: GlobalCdifiWithMetrics;
};

export const ReportsPageCdfiGlobalMetricsTable = ({
  data,
}: ReportsPageCdfiGlobalMetricsTableProps) => {
  const title = `${data.cdfi.name} Perfomance Metrics`;
  const { columns, dataSource } = transformGlobalMetricsToTableData(data);
  return (
    <>
      <Row className={styles.titleContainer}>
        <InnerPageTitle className={styles.lightBlueOverRide}>
          {title}
        </InnerPageTitle>
      </Row>
      <Row className={styles.container}>
        <Table
          className={styles.table}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ x: 1500, y: 300 }}
          expandable={{
            defaultExpandAllRows: true,
          }}
        />
      </Row>
    </>
  );
};
