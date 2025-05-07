import React, { useEffect, useState } from 'react';
import { aerisExplorerPeerGroupStore } from 'store';
import { Skeleton } from 'antd';
import { ReportsPageRatingDistribution } from 'scenes/AerisExplorer/components/ReportsPage/components/ReportsPageRatingsDistribution/ReportsPageRatingsDistribution';

type ComparisonViewRatingsDistributionProps = {
  paramId: any;
};

export const ComparisonViewRatingsDistribution = ({
  paramId,
}: ComparisonViewRatingsDistributionProps) => {
  const { comparison, getComparison } = aerisExplorerPeerGroupStore;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getComparison(paramId).then(() => setLoading(false));
  }, [paramId, getComparison]);

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <ReportsPageRatingDistribution
      paramId={comparison?.basePeerGroupId}
      title="Peer Group Ratings Distribution"
    />
  );
};
