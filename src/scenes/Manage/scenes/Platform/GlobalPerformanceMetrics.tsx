import React, { FC, useState } from 'react';
import { ContentLimiter, PageSectionWrapper } from 'components';
import { userStore } from 'store';
import { Spin } from 'antd';
import styles from 'components/ManageTableStyles.module.scss';

export const GlobalPerformanceMetrics: FC = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(function () {
    setLoading(false);
  }, 3000);
  const url = `/formulas/globalpeermetrics?token=${userStore.token}`;
  return (
    <>
      <div>
        <ContentLimiter>
          <PageSectionWrapper title={'Manage Global Performance Metrics'}>
            <div className={styles.spin}>
              <Spin spinning={loading} />
            </div>
            <iframe src={url} width="100%" height="1000"></iframe>
          </PageSectionWrapper>
        </ContentLimiter>
      </div>
    </>
  );
};
