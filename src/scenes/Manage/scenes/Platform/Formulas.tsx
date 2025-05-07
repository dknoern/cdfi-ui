import React, { FC } from 'react';
import { ContentLimiter, PageSectionWrapper } from 'components';
import { userStore } from 'store';

export const Formulas: FC = () => {

  const url = `/formulas?token=${userStore.token}`;
  return (
    <>
      <div>
        <ContentLimiter>
          <PageSectionWrapper title={'Formulas'}>
            <iframe src={url} width="100%" height="1000"></iframe>
          </PageSectionWrapper>
        </ContentLimiter>
      </div>
    </>
  );
};
