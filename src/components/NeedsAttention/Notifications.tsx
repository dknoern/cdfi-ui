import React, { FC, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { List, Typography, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Company, Notification } from 'types';
import { typography } from 'constants/typography';
import { usePortfolios } from 'dataManagement';
import { notificationStore, userStore } from 'store';
import { RedirectFn } from './types';
import {
  formatMessage,
  beautifyDate,
  sortFn,
  onNotificationClick,
} from './tools';
import styles from './NeedsAttention.module.scss';

const NotificationsFn: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { data: portfolios } = usePortfolios(userStore.info.companyId, true);

  const getPortfolioByCompanyId = useCallback(
    (id: Company['id']) => {
      return (portfolios || []).find((portfolio) =>
        portfolio.investments.find((company) => company.id === id),
      )?.id;
    },
    [portfolios],
  );

  const redirect = useCallback<RedirectFn>(
    (pathname, state) => {
      if (pathname !== history.location.pathname) {
        history.push({ pathname, state });
      }

      history.replace({ pathname, state });
    },
    [history],
  );

  const onClick = useCallback(
    (item: Notification) => {
      const portfolioId = getPortfolioByCompanyId(item.sender.id);
      return onNotificationClick(
        item,
        redirect,
        portfolioId,
        location.pathname,
      );
    },
    [redirect, getPortfolioByCompanyId, location.pathname],
  );

  if (notificationStore.notifications.length < 1) {
    return (
      <div className={styles.zeroNotifications}>
        <Typography.Text>{typography('notifications').noItems}</Typography.Text>
      </div>
    );
  }

  return (
    <List
      dataSource={[...notificationStore.notifications].sort(sortFn)}
      renderItem={(item): React.ReactNode => (
        <List.Item
          className={`${styles.item} ${!item.isRead ? styles.isNew : ''}`}
        >
          <div className={styles.text}>{formatMessage(item)}</div>
          <div className={styles.date}>{beautifyDate(item.sentDate)}</div>
          <Button
            id="notificationViewButton"
            onClick={onClick(item)}
            type="link"
            title="View notification"
            className={styles.viewBtn}
          >
            <EyeOutlined alt="EyeOutlined" />
          </Button>
        </List.Item>
      )}
      className={styles.list}
    />
  );
};

export const Notifications = observer(NotificationsFn);
