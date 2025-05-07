import React, { FC } from 'react';
import { WithCompanyTypeProps } from './types';
import { useParams } from "react-router-dom"
import { ContentLimiter, PageSectionWrapper } from '../../../../components';
import { userStore } from 'store';
import { cdfiStore } from 'store';
import {
  useCdfiOrgDetails,
} from '../../../../dataManagement';


export const MetricsMapper: FC<WithCompanyTypeProps> = (props) => {
  const { cdfiId: id } = cdfiStore;
  const { data: cdfiOrgDetails } = useCdfiOrgDetails(id);

  const params = useParams<{
    year: string;
    quarter: string;
    dataset: string;
  }>();

  const cdfi = cdfiOrgDetails ? cdfiOrgDetails.cdfi : undefined;
  const url = `/mapper/embedded/${id}/${params.year}/${params.quarter}/${params.dataset}?token=${userStore.token}`;

  return (
    <>
      <div>
        <ContentLimiter>
          <PageSectionWrapper title={'Mapper'} ratings 
          topTitle={cdfi?.name}>
            <iframe src={url} width="100%" height="800"></iframe>
          </PageSectionWrapper>
        </ContentLimiter>
      </div>
    </>
  );
};
