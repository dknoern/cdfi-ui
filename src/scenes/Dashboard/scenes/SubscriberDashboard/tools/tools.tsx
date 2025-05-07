import React from 'react';
import styles from '../SubscriberOrganizationDetails.module.scss';
import { Typography } from 'antd';
const { Text } = Typography;

export const noData = (msg: string) => (
  <Text key={msg} className={styles.noData}>
    {msg}
  </Text>
);