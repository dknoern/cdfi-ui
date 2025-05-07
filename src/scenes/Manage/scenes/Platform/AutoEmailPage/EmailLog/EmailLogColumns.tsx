import React, { ReactNode } from 'react';
import { EyeFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { formatInTimeZone } from 'date-fns-tz';
import { autoEmailStore } from '../../../../../../store';
import styles from './EmailLog.module.scss';

export const emailLogColumns = [
  {
    key: 'dateSent',
    title: 'Date Sent',
    dataIndex: 'dateSent',
    fixed: true,
    width: 200,
    sorter: true,
    render: (value: string, record: any): ReactNode => {
      return formatInTimeZone(
        `${record.dateSent}Z`,
        'America/New_York',
        'Pp z',
      );
    },
    defaultSortOrder: 'ascend',
  },
  {
    key: 'subject',
    title: 'Email Subject',
    dataIndex: 'subject',
    render: (value: string, record: any): ReactNode => record.subject,
    fixed: true,
    width: 250,
  },
  {
    key: 'recipientList',
    title: 'Recipient List',
    dataIndex: 'recipientList',
    render: (value: string, record: any): ReactNode => {
      const { getEmailLogFile, setLoadingEmailLogFile } = autoEmailStore;

      return (
        <span
          onClick={() => {
            setLoadingEmailLogFile(true);
            getEmailLogFile(record.recipientList).then(() => {
              setLoadingEmailLogFile(false);
            });
          }}
          style={{ cursor: 'pointer' }}
          className={styles.nameFile}
        >
          {record.recipientList}
        </span>
      );
    },
    fixed: true,
    width: 200,
  },
  {
    key: 'actions',
    title: 'Actions',
    dataIndex: 'actions',
    fixed: false,
    width: 60,
    render: (value: string, record: any): ReactNode => {
      const { setIsViewEmailDetails, setEmailLogDetails } = autoEmailStore;

      return (
        <Button
          onClick={() => {
            setIsViewEmailDetails(true);
            setEmailLogDetails(record.text);
          }}
          type="link"
          icon={<EyeFilled />}
        />
      );
    },
  },
];
