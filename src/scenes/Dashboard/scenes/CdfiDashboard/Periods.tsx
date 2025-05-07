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

export const Periods: FC<WithCompanyTypeProps> = (props) => {
  const { cdfiId: id } = cdfiStore;
  const { data: cdfiOrgDetails } = useCdfiOrgDetails(id);
  const cdfi = cdfiOrgDetails ? cdfiOrgDetails.cdfi : undefined;
  const url = `/period/${id}?token=${userStore.token}`;
  //const url = `/period/${id}`;

  const logo = useCdfiLogo(id)

  return (
    <>
      <div>
        <ContentLimiter>
          <PageSectionWrapper title={'Periods'} ratings 
          topTitle={<LogoHeader imgPath={logo} subTitle={cdfi?.name}/>}>
            <iframe src={url} width="100%" height="800"></iframe>
          </PageSectionWrapper>
        </ContentLimiter>
      </div>
    </>
  );
};
