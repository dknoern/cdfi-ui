import React, { FC } from 'react';
import { WithCompanyTypeProps } from './types';
import { ContentLimiter, PageSectionWrapper } from '../../../../components';
import { userStore } from 'store';
import { cdfiStore } from 'store';
import {
  useCdfiOrgDetails,
} from '../../../../dataManagement';
import { useCdfiLogo } from 'tools/useCdfiLogo';
import { LogoHeader } from './LogoHeader';

export const Graphs: FC<WithCompanyTypeProps> = (props) => {
  const { cdfiId: id } = cdfiStore;
  const { data: cdfiOrgDetails } = useCdfiOrgDetails(id);
  const cdfi = cdfiOrgDetails ? cdfiOrgDetails.cdfi : undefined;
  const url = `/graphs?companyId=${id}&token=${userStore.token}`;

  const logo = useCdfiLogo(id)

  return (
    <>
      <div>
        <ContentLimiter>
          <PageSectionWrapper title={'Graphs'} ratings 
          topTitle={<LogoHeader imgPath={logo} subTitle={cdfi?.name}/>}>
            <iframe src={url} width="100%" height="800"></iframe>
          </PageSectionWrapper>
        </ContentLimiter>
      </div>
    </>
  );
};
