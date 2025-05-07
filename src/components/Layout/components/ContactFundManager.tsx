import React, { FC } from 'react';
import { Popover, Button } from 'antd';
import { PhoneOutlined, DownOutlined } from '@ant-design/icons';
import { ContactsForPC } from './ContactsForPC';
import styles from './ContactFundManager.module.scss';

export const ContactFundManager: FC = () => {
  return (
    <Popover
      trigger={['click']}
      placement="bottom"
      overlayClassName={styles.overlay}
      content={<ContactsForPC />}
    >
      <Button
        id="contactFundManagerButton"
        type="link"
        className={styles.trigger}
      >
        <PhoneOutlined className={styles.phoneIcon} />
        <span>Contact Requestor</span>
        <DownOutlined />
      </Button>
    </Popover>
  );
};
