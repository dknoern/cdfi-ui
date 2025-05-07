import React, { FC } from 'react';
import { cdfiStore } from 'store';
import { useCdfiLogo } from 'tools/useCdfiLogo';
import { GlobalOrCdfiMetrics } from 'scenes/Metrics/GlobalMetrics';
import { useCdfiOrgDetails } from '../../../../dataManagement';
import { WithCompanyTypeProps } from './types';

export const Metrics: FC<WithCompanyTypeProps> = (props) => {
  const { cdfiId: id } = cdfiStore;
  const { data: cdfiOrgDetails } = useCdfiOrgDetails(id);
  const cdfi = cdfiOrgDetails ? cdfiOrgDetails.cdfi : undefined;

  const logo: string = useCdfiLogo(id);

  return (
    <GlobalOrCdfiMetrics cdfiId={id} cdfiLogoUrl={logo} cdfiName={cdfi?.name} />
  );
};
