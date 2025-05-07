import React, { FC, useState } from 'react';
import { observer } from 'mobx-react';
import { Tabs, Badge } from 'antd';
import { notificationStore } from 'store';
import { TabContent } from './TabContent';
import { Notifications } from './Notifications';
import { ActionItems } from './ActionItems';
import styles from './NeedsAttention.module.scss';

const { TabPane } = Tabs;

type Tab = 'notifications' | 'actionItems';

const SECOND_TAB_ACTIVE = false;

const NeedsAttentionFn: FC = observer(() => {
  const [tab, setTab] = useState<Tab>('notifications');

  return (
    <div className={styles.container}>
      <Tabs
        activeKey={tab}
        onChange={(key: string): void => {
          setTab(key as Tab);
        }}
        className={styles.tabs}
        tabBarGutter={0}
      >
        <TabPane
          tab={
            <Badge count={notificationStore.unreadCount}>Notifications</Badge>
          }
          key="notifications"
        >
          <TabContent>
            <Notifications />
          </TabContent>
        </TabPane>
        {SECOND_TAB_ACTIVE && (
          <TabPane
            tab={<Badge count={0}>Incomplete Tasks</Badge>}
            key="actionItems"
          >
            <TabContent>
              <ActionItems />
            </TabContent>
          </TabPane>
        )}
      </Tabs>
    </div>
  );
});

// need to be wrapped again
// BC that component is used as inner for Popover
export const NeedsAttention: FC = () => <NeedsAttentionFn />;
