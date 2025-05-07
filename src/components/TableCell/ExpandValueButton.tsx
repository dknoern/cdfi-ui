import React, { FC } from 'react';
import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { MetricTypeConfig } from 'types';
import { MetricValue } from 'types/metricValue';
import { Dialog } from 'tools';
import styles from './ExpandValueButton.module.scss';

type ExpandValueButtonProps = {
  value: MetricValue;
  question: MetricTypeConfig['question'];
};

export const ExpandValueButton: FC<ExpandValueButtonProps> = ({
  value,
  question,
}) => {
  return (
    <Button
      title="Show full value"
      type="ghost"
      icon={<EyeOutlined />}
      className={styles.button}
      onClick={(event): void => {
        event.stopPropagation();
        Dialog.info({
          title: '',
          content: (
            <dl className={styles.content}>
              <dt>Question:</dt>
              <dd>{question}</dd>
              <dt>Answer:</dt>
              <dd>{value}</dd>
            </dl>
          ),
          closable: true,
          icon: null,
          okText: 'Close',
        });
      }}
    />
  );
};
