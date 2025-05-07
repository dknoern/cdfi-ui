import React, { FC } from 'react';
import { List, Typography } from 'antd';
import { Notification } from 'types';
import { formatMessage, beautifyDate } from './tools';
import styles from './NeedsAttention.module.scss';

export const ActionItems: FC = () => {
  return (
    <List
      dataSource={[] as Notification[]}
      renderItem={(item): React.ReactNode => (
        <List.Item
          className={`${styles.item} ${!item.isRead ? styles.isNew : ''}`}
        >
          <Typography.Text>{formatMessage(item)}</Typography.Text>
          <div className={styles.itemDate}>{beautifyDate(item.sentDate)}</div>
        </List.Item>
      )}
      className={styles.list}
    />
  );
};
