import React, { FC, useEffect, useState } from 'react';
import { ContentLimiter, PageSectionWrapper } from 'components';
import { userStore } from 'store';
import { Spin } from 'antd';
import styles from 'components/ManageTableStyles.module.scss';

export const Libraries: FC = () => {
  /**
   * Variables
   */
  const url = `/library/manage?token=${userStore.token}`;

  /**
   * Hooks
   */
  const [loading, setLoading] = useState(true);
  setTimeout(function () {
    setLoading(false);
  }, 3000);

  /**
   * Effects
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div>
        <ContentLimiter>
          <PageSectionWrapper title={'Libraries'}>
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
