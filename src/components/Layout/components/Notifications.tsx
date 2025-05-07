import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Badge, Button, Popover } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { NOTIFICATIONS_MARK_READ_TIMEOUT } from 'constants/misc';
import { NeedsAttention } from 'components';
import { notificationStore } from 'store';
import { HeaderButton } from './HeaderButton';
import headerStyles from '../parts/Header.module.scss';
import styles from './HeaderButton.module.scss';

export const Notifications: FC = observer(() => {
  return (
    <Popover
      content={NeedsAttention}
      placement="bottomRight"
      trigger="click"
      overlayClassName={headerStyles.needsAttentionOverlay}
      onVisibleChange={(visible: boolean) => {
        if (!visible) return;

        setTimeout(
          notificationStore.markReadAll,
          NOTIFICATIONS_MARK_READ_TIMEOUT,
        );
      }}
    >
      <Button type="text" className={styles.notificationsBtn}>
        {notificationStore.hasUnread ? (
          <Badge dot>
            <HeaderButton icon={<BellOutlined />} />
          </Badge>
        ) : (
          <HeaderButton icon={<BellOutlined />} />
        )}
      </Button>
    </Popover>
  );
});
