import React, { FC, useState } from 'react';
import { ContentLimiter, PageSectionWrapper } from 'components';
import { userStore } from 'store';
import { Spin } from 'antd';
import styles from 'components/ManageTableStyles.module.scss';

export const Tags: FC = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(function () {
    setLoading(false);
  }, 6000);
  const url = `/tag/3?token=${userStore.token}`;
  return (
    <>
      <div>
        <ContentLimiter>
          <PageSectionWrapper title={'Tags'}>
            <Spin spinning={loading} />
            <iframe src={url} width="100%" height="1000"></iframe>
          </PageSectionWrapper>
        </ContentLimiter>
      </div>
    </>
  );
};
