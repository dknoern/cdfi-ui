import React, { FC, MouseEvent } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import styles from './AddChartButton.module.scss';

type AddChartButtonProps = {
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

export const AddChartButton: FC<AddChartButtonProps> = ({ onClick }) => {
  return (
    <Card onClick={onClick} className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <div>
          <PlusCircleOutlined className={styles.plusIcon} />
        </div>
        <div className={styles.text}>Add Existing Summary Chart</div>
      </div>
    </Card>
  );
};
