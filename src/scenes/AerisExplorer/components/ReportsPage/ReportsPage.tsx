import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ContentLimiter, PageSectionWrapper } from 'components';
import { ReportsPageInfoSection } from './components/ReportsPageInfoSection/ReportsPageInfoSection';
import { ReportsPageRatingDistribution } from './components/ReportsPageRatingsDistribution/ReportsPageRatingsDistribution';
import { ReportsPageEquations } from './components/ReportsPageEquations/ReportsPageEquations';
import { ReportsPageCdfiGlobalMetricsTable } from './components/ReportsPageCdfiGlobalMetricsTable/ReportsPageCdfiGlobalMetricsTable';
import { GlobalCdifiWithMetrics } from 'types/peerGroups';
import { AerisExplorerHomeButton } from '../AerisExplorerHomeButton/AerisExplorerHomeButton';

export const ReportsPage = () => {
  const { id: paramId } = useParams();

  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);
  const [sectionTitles, setSectionTitles] = useState({
    distribution: '',
    equations: '',
  });
  const [globalCdfiData, setGlobalCdfiData] = useState<
    GlobalCdifiWithMetrics | undefined
  >(undefined);

  return (
    <ContentLimiter>
      <PageSectionWrapper
        title="CDFI Explorer"
        actionButtons={[<AerisExplorerHomeButton />]}
      >
        <ReportsPageInfoSection
          paramId={paramId}
          expandedRowKeys={expandedRowKeys}
          setExpandedRowKeys={setExpandedRowKeys}
          setSectionTitles={setSectionTitles}
          setGlobalCdfiData={setGlobalCdfiData}
        />
        <ReportsPageRatingDistribution
          paramId={paramId}
          title={sectionTitles.distribution}
        />
        {globalCdfiData && (
          <ReportsPageCdfiGlobalMetricsTable data={globalCdfiData} />
        )}
        <ReportsPageEquations
          paramId={paramId}
          expandedRowKeys={expandedRowKeys}
          setExpandedRowKeys={setExpandedRowKeys}
          title={sectionTitles.equations}
        />
      </PageSectionWrapper>
    </ContentLimiter>
  );
};
