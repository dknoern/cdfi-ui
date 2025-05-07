import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { aerisExplorerPeerGroupStore } from 'store';
import { ReportsPageEquations } from 'scenes/AerisExplorer/components/ReportsPage/components/ReportsPageEquations/ReportsPageEquations';
import { ActivityModel } from '../../../../../../types';
import { createActivity } from '../../../../../../dataManagement/operations/cdfiOperations';
import { Skeleton } from 'antd';

type ComparisonViewEquationsProps = {
  paramId: any;
  expandedRowKeys: number[];
  setExpandedRowKeys: React.Dispatch<React.SetStateAction<number[]>>;
};

export const ComparisonViewEquations = observer(
  ({
    paramId,
    expandedRowKeys,
    setExpandedRowKeys,
  }: ComparisonViewEquationsProps) => {
    const { comparison, getComparison, setCompareAggregate, compareAggregate } =
      aerisExplorerPeerGroupStore;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setCompareAggregate('Quartile');
      setLoading(true);
      getComparison(paramId).then(() => setLoading(false));
    }, [paramId, getComparison]);

    useEffect(() => {
      const activity: ActivityModel = {
        companyId: comparison?.company?.id,
        quarter: 0,
        year: 0,
        activityType: 'COMPARISON_REPORT_VIEWED',
      };

      if (!activity.companyId) {
        console.error('No company Id found.');
        return;
      }

      createActivity(activity).catch(console.error);
    }, [comparison]);

    if (loading) {
      return <Skeleton active />;
    }
    return (
      <ReportsPageEquations
        paramId={comparison?.basePeerGroupId}
        compareToCdfiIds={comparison?.compareCdfis}
        compareToPeerGroupId={comparison?.comparePeerGroupId}
        expandedRowKeys={expandedRowKeys}
        setExpandedRowKeys={setExpandedRowKeys}
        compareAggregate={compareAggregate}
        title="Peer Analysis - Selected Metrics"
      />
    );
  },
);
