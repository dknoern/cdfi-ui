import React, { FC, useState } from 'react';
import { ContentLimiter, PageSectionWrapper } from 'components';
import { userStore } from 'store';
import { Spin } from 'antd';
import styles from 'components/ManageTableStyles.module.scss';

export const ReportGroups: FC = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(function () {
    setLoading(false);
  }, 3000);
  const url = `/reportcategorys?token=${userStore.token}`;
  return (
    <>
      <div>
        <ContentLimiter>
          <PageSectionWrapper title={'Report Groups'}>
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
