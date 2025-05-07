import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { aerisExplorerPeerGroupStore } from 'store';
import { InnerPageTitle } from 'components/InnerPage/InnerPageTitle';
import { EquationContent } from './EquationContent/EquationContent';
import { ComparisonChartViewToggleSwitch } from 'scenes/AerisExplorer/components/ComparisonViewPage/components/ComparisonChartViewToggleSwitch/ComparisonChartViewToggleSwitch';
import { Row, Spin, Table } from 'antd';
import styles from './ReportsPageEquations.module.scss';

type ReportsPageEquationsProps = {
  paramId: any;
  expandedRowKeys: number[];
  setExpandedRowKeys: React.Dispatch<React.SetStateAction<number[]>>;
  compareToCdfiIds?: number[];
  compareToPeerGroupId?: number;
  title: string;
  compareAggregate?: string;
};

export const ReportsPageEquations = observer(
  ({
    paramId,
    expandedRowKeys,
    setExpandedRowKeys,
    compareToCdfiIds = undefined,
    compareToPeerGroupId = undefined,
    title,
    compareAggregate = undefined,
  }: ReportsPageEquationsProps) => {
    const { reportEquations, getReportEquations } = aerisExplorerPeerGroupStore;
    const [loading, setLoading] = useState(false);

    const handleExpand = (expanded: boolean, record: any) => {
      setExpandedRowKeys((prev: number[]) => {
        if (expanded) {
          return [...prev, record.key];
        }
        return prev.filter((key: number) => key !== record.key);
      });
    };

    useEffect(() => {
      setLoading(true);
      getReportEquations().then(() => setLoading(false));
    }, [getReportEquations, paramId]);

    return (
      <>
        <Row className={styles.titleContainer}>
          <InnerPageTitle className={styles.lightBlueOverRide}>
            {title}
          </InnerPageTitle>
          <small className={styles.hintText}>
            <em>
              FYE data is internal reporting until Aeris has reviewed the Audit.
              Aeris Performance Maps provides this information.
            </em>
          </small>
        </Row>
        {compareToPeerGroupId && (
          <Row className={styles.titleContainer}>
            <ComparisonChartViewToggleSwitch />
          </Row>
        )}
        <Row>
          {loading ? (
            <div className={styles.spinnerContainer}>
              <Spin />
            </div>
          ) : (
            <Table
              className={`${styles.basicTable} ${styles.animateExpand}`}
              dataSource={toJS(reportEquations)?.map(
                (item: any, index: number) => ({
                  ...item,
                  key: index,
                }),
              )}
              columns={[{ title: '', dataIndex: 'name', key: 'name' }]}
              pagination={false}
              expandable={{
                expandedRowRender: (record, i) => (
                  <EquationContent
                    eqId={record.id}
                    paramId={paramId}
                    compareToCdfiIds={compareToCdfiIds}
                    compareToPeerGroupId={compareToPeerGroupId}
                    compareAggregate={compareAggregate}
                  />
                ),
                expandedRowKeys,
                onExpand: (expanded, record) => handleExpand(expanded, record),
              }}
            />
          )}
        </Row>
      </>
    );
  },
);
