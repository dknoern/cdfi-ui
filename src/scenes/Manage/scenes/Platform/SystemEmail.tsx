import React, { FC } from 'react';
import { ContentLimiter, PageSectionWrapper } from 'components';

export const SystemEmail: FC = () => {
  return (
    <>
      <div>
        <ContentLimiter>
          <PageSectionWrapper title={'System Email'}>
          </PageSectionWrapper>
        </ContentLimiter>
      </div>
    </>
  );
};
