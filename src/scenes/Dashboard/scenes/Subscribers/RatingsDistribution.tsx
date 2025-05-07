import React, { FC } from 'react';
import { ContentLimiter, PageSectionWrapper } from '../../../../components';
import { userStore, subscriberStore } from 'store';
export const RatingsDistribution: FC = () => {
  const url = `/investor/${userStore.companyId}/distribution`;
  const urlWithToken = `${url}?token=${userStore.token}`;
  const { subscriberItem } = subscriberStore;

  return (
    <>
      <div>
        <ContentLimiter>
          <PageSectionWrapper
            title={'CDFI Ratings Distribution'}
            topTitle={subscriberItem?.name}
          >
            <iframe src={urlWithToken} width="100%" height="1200"></iframe>
          </PageSectionWrapper>
        </ContentLimiter>
      </div>
    </>
  );
};
