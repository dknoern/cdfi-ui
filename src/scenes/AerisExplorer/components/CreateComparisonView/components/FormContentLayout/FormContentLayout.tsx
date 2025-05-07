import React, { ReactNode } from 'react';
import { Col, Skeleton } from 'antd';
import { GRID_COL_HALF_ROW_SPAN } from 'constants/ui';
import styles from './FormContentLayout.module.scss';

type FormContentLayoutProps = {
  leftContent: ReactNode;
  rightContent?: ReactNode;
  leftContentLoading?: boolean;
  rightContentLoading?: boolean;
};

export const FormContentLayout = ({
  leftContent,
  rightContent = undefined,
  leftContentLoading = false,
  rightContentLoading = false,
}: FormContentLayoutProps) => {
  if (!rightContent) {
    return (
      <Col span={GRID_COL_HALF_ROW_SPAN} className={styles.leftContainer}>
        {leftContentLoading ? <Skeleton active /> : leftContent}
      </Col>
    );
  }

  return (
    <>
      <Col span={11} className={styles.leftContainer}>
        {leftContentLoading ? <Skeleton active /> : leftContent}
      </Col>
      <Col span={2} className={styles.dividerContainer}>
        <div className={styles.verticalDivider}>
          <span className={styles.dividerText}>vs</span>
        </div>
      </Col>
      <Col span={11} className={styles.rightContainer}>
        {rightContentLoading ? <Skeleton active /> : rightContent}
      </Col>
    </>
  );
};
