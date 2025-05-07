import React, { FC } from 'react';
import { ContentLimiter, PageSectionWrapper } from 'components';
import { userStore } from 'store';
import { useParams } from "react-router-dom"
import {useCdfiOrgDetails} from "../../../../dataManagement";

export const EditDataWebform: FC = () => {

  const params = useParams<{
    year: string;
    quarter: string;
    id: string
  }>();

  const cdfiId = (userStore.isAerisAdmin || userStore.isStaff || userStore.isContractor) ? params.id : userStore.companyId
  const { data: cdfiData } = useCdfiOrgDetails(+cdfiId);

  const url = `/webform/${cdfiId}/${params.year}/${params.quarter}/false?token=${userStore.token}`;

  return (
    <>
      <div>
        <ContentLimiter>
          <PageSectionWrapper
            title={'Financials'}
            topTitle={cdfiData?.cdfi.name}
          >
            <iframe src={url} width="100%" height="1000"/>
          </PageSectionWrapper>
        </ContentLimiter>
      </div>
    </>
  );
};
