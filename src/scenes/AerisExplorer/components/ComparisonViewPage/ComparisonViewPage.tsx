import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ComparisonViewInfoSection } from './components/ComparistonViewInfoSection/ComparisonViewInfoSection';
import { ComparisonViewRatingsDistribution } from './components/ComparisonViewRatingsDistribution/ComparisonViewRatingsDistribution';
import { ComparisonViewEquations } from './components/ComparisonViewEquations/ComparisonViewEquations';
import { AerisExplorerHomeButton } from '../AerisExplorerHomeButton/AerisExplorerHomeButton';
import { ContentLimiter, PageSectionWrapper } from 'components';

export const ComparisonViewPage = () => {
  const { id: paramId } = useParams();
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);

  return (
    <ContentLimiter>
      <PageSectionWrapper
        title="Aeris® Explorer Comparison Report"
        actionButtons={[<AerisExplorerHomeButton />]}
      >
        <ComparisonViewInfoSection
          paramId={paramId}
          expandedRowKeys={expandedRowKeys}
          setExpandedRowKeys={setExpandedRowKeys}
        />

        <ComparisonViewRatingsDistribution paramId={paramId} />

        <ComparisonViewEquations
          paramId={paramId}
          expandedRowKeys={expandedRowKeys}
          setExpandedRowKeys={setExpandedRowKeys}
        />
      </PageSectionWrapper>
    </ContentLimiter>
  );
};
