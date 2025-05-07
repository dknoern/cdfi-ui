import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { aerisExplorerPeerGroupStore } from 'store';
import { getFormat } from 'scenes/AerisExplorer/components/ReportsCharts/chartsHelpers';
import { Spin, Tabs, Table } from 'antd';
import { ComparisonChartsLayout } from 'scenes/AerisExplorer/components/ComparisonViewPage/components/ComparisonCharts/ComparisonChartsLayout';
import { ReportsPageChart } from '../../ReportsPageChart/ReportsPageChart';
import { PeerAnalysisReport, PeerAnalysisReportTable } from 'types/peerGroups';
import styles from './EquationContent.module.scss';
import { ColumnType } from 'antd/lib/table';

const { TabPane } = Tabs;

type EquationContentProps = {
  eqId: number;
  paramId: any;
  compareToCdfiIds?: number[];
  compareToPeerGroupId?: number;
  compareAggregate?: string;
};

export const EquationContent = observer(
  ({
    eqId,
    paramId,
    compareToCdfiIds,
    compareToPeerGroupId,
    compareAggregate,
  }: EquationContentProps) => {
    const {
      getPeerAnalysisReport,
      reportsPageUrlParams,
      getCompareToCdfiReport,
      getCompareToPeerGroupReport,
    } = aerisExplorerPeerGroupStore;
    const [peerAnalysisReport, setPeerAnalysisReport] = useState<
      PeerAnalysisReport | undefined
    >(undefined);
    const [loading, setLoading] = useState(false);
    const isComparisonReport = !!compareToCdfiIds || !!compareToPeerGroupId;
    const format = peerAnalysisReport?.chart[0]?.equation?.unitType || '';
    const decimalPlaces = peerAnalysisReport?.chart[0]?.equation?.decimalPlaces || 0;
    const columnKeys = peerAnalysisReport?.periods || [];

    const columns = [
      {
        title: '',
        dataIndex: 'rowName',
        key: 'rowName',
        fixed: 'left',
        width: 225,
      },
      ...columnKeys.map((key) => ({
        title: key.replace(/(\d+)/, ' $1'),
        dataIndex: ['columns', key],
        key,
        render: (value: number) => {
          if (isNaN(value)) {
            return '-';
          }
          return getFormat(value, format, decimalPlaces);
        },
      })),
    ] as ColumnType<PeerAnalysisReportTable>[];

    useEffect(() => {
      if (compareToPeerGroupId && !compareToCdfiIds) {
        setLoading(true);
        getCompareToPeerGroupReport(
          paramId,
          eqId,
          compareToPeerGroupId,
          reportsPageUrlParams,
          compareAggregate,
        ).then((data) => {
          setLoading(false);
          setPeerAnalysisReport(data);
        });
      } else if (compareToCdfiIds) {
        setLoading(true);
        getCompareToCdfiReport(
          paramId,
          eqId,
          compareToCdfiIds.toString(),
          reportsPageUrlParams,
        ).then((data) => {
          setLoading(false);
          setPeerAnalysisReport(data);
        });
      } else {
        setLoading(true);
        getPeerAnalysisReport(paramId, eqId, reportsPageUrlParams).then(
          (data) => {
            setLoading(false);
            setPeerAnalysisReport(data);
          },
        );
      }
    }, [
      eqId,
      paramId,
      getPeerAnalysisReport,
      reportsPageUrlParams,
      compareToCdfiIds,
      compareToPeerGroupId,
      getCompareToCdfiReport,
      getCompareToPeerGroupReport,
      compareAggregate,
    ]);

    if (loading || !peerAnalysisReport) {
      return (
        <div className={styles.spinnerContainer}>
          <Spin />
        </div>
      );
    }

    return (
      <Tabs defaultActiveKey="1">
        {isComparisonReport ? (
          <TabPane key="1" tab="Chart" className={styles.tabPane}>
            <ComparisonChartsLayout
              data={peerAnalysisReport as PeerAnalysisReport}
              isSingleCdfi={!!compareToCdfiIds}
              isMultipleCdfis={compareAggregate === 'CDFI'}
            />
          </TabPane>
        ) : (
          <TabPane key="1" tab="Chart" className={styles.tabPane}>
            <ReportsPageChart data={peerAnalysisReport as PeerAnalysisReport} />
          </TabPane>
        )}

        {isComparisonReport ? (
          <TabPane key="2" tab="Tables" className={styles.multiTablePane}>
            <h2>Peer Group</h2>
            <Table
              className={styles.table}
              dataSource={peerAnalysisReport?.table}
              columns={columns as ColumnType<PeerAnalysisReportTable>[]}
              pagination={false}
              scroll={{ x: 1500, y: 300 }}
            />
            <h2>{!compareAggregate ? 'CDFI' : 'Portfolio Segment'}</h2>
            <Table
              className={styles.table}
              dataSource={peerAnalysisReport?.compareTable}
              columns={columns as ColumnType<PeerAnalysisReportTable>[]}
              pagination={false}
              scroll={{ x: 1500, y: 300 }}
            />
          </TabPane>
        ) : (
          <TabPane
            key="2"
            tab="Table"
            className={`${styles.tabPane} ${styles.tablePane}`}
          >
            <Table
              className={styles.table}
              dataSource={peerAnalysisReport?.table}
              columns={columns as ColumnType<PeerAnalysisReportTable>[]}
              pagination={false}
              scroll={{ x: 1500, y: 300 }}
            />
          </TabPane>
        )}
      </Tabs>
    );
  },
);
