import React, { ReactNode } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DelegatedSubscription, VoidFn } from 'types';
import styles from './SubscriberActivities.module.scss';
import { ColumnProps } from 'antd/lib/table';
import {
  Activity,
  PersonRole,
  SubscriberContactEditFormData,
  SubscriberSubscriptionEditFormData,
} from 'types';
import { sortByString } from 'tools';
import { EditFilled } from '@ant-design/icons';

export const tableTabs: Record<string, string> = {
  documents: 'Documents',
  financials: 'Financials',
  factSheets: 'Fact Sheets',
  aerisExplorer: 'Aeris Explorer',
};

export const subscriberActivityColumns: ColumnProps<Activity>[] = [
  {
    title: 'Name',
    dataIndex: 'firstName',
    width: 200,
    render: (text: string, record: any) =>
      record.firstName + ' ' + record.lastName,
    sorter: (a, b): number => sortByString(a.firstName, b.firstName),
  },
  {
    title: 'Activity Summary',
    dataIndex: 'plainSummary',
  },
];

export const subscriberContactCreateDefaultValues: SubscriberContactEditFormData =
  {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    phoneExtension: '',
    title: '',
    role: PersonRole.ANALYST,
    enabled: true,
    fullName: '',
    email: '',
    isActive: true,
    emailReminders: false,
    uploadReminders: false,
  };

export const actionButtons = (onAddClick: VoidFn): ReactNode[] => [
  <Button
    id="addNewContactButton"
    onClick={onAddClick}
    type="default"
    icon={<PlusOutlined />}
    className={styles.actionButton}
  >
    Create Contact
  </Button>,
];

export const subscriptionsButton = (onAddClick: VoidFn): ReactNode[] => [
  <Button
    id="createSubscriptionButton"
    onClick={onAddClick}
    type="default"
    icon={<PlusOutlined />}
    className={styles.actionButton}
  >
    Create Subscription
  </Button>,
];

export const smallCardStyle = {
  minHeight: 200,
  height: '100%',
};
export const largeCardStyle = {
  minHeight: '60vh',
  height: 'calc(100% - 24px)',
};

export const contentText = {
  noData: 'No Data',
  noNumber: '+1',
  noWebsite: 'https://',
  noRated: 'Not rated',
  noAddress: 'No address provided',
};

export const delegatedSubscriptionsColumns: ColumnProps<DelegatedSubscription>[] =
  [
    {
      title: 'Subscription Type',
      dataIndex: 'subscriptionType',
      width: '200px',
      sorter: (a, b): number =>
        ('' + a.subscriptionType).localeCompare(b.subscriptionType),
    },
    {
      title: 'Expiration Date',
      dataIndex: 'expirationDate',
      width: '200px',
      sorter: (a, b): number =>
        ('' + a.expirationDate).localeCompare(b.expirationDate),
    },
    {
      title: 'CDFI',
      dataIndex: 'cdfi',
    },
    {
      title: 'Access Details',
      dataIndex: 'accessDetails',
      width: '200px',
      render: (accessDetails, row): ReactNode => (
        <>
          {accessDetails.map((access: string, index: number) => {
            return (
              <p key={access + index}>
                <em>{access}</em>
              </p>
            );
          })}
        </>
      ),
    },
    {
      title: '',
      dataIndex: 'actions',
      align: 'right',
      width: '100px',
      render: (value, subscription): ReactNode => (
        <>
          <Button
            type="link"
            onClick={() => alert('Edit functionality not yet implemented.')}
            name="edit"
            value={subscription.id}
            icon={<EditFilled />}
            title="Edit delegated subscription"

          />
        </>
      ),
    },
  ];

export const subscriberSubscriptionCreateDefaultValues: SubscriberSubscriptionEditFormData =
  {
    id: 0,
    isRatingReports: false,
    subscriptionType: 'MULTIPLE',
    cdfiCountRatingReports: 0,
    cdfisRatingReports: [],
    isPerformanceMaps: false,
    cdfiCountPerformanceMaps: 0,
    cdfisPerformanceMaps: [],
    isPeerGroups: false,
    cdfiCountPeerGroups: 0,
    cdfisPeerGroups: [],
    isShowPeerMetrics: false,
    isFactSheets: true,
    cdfiCountFactSheets: 0,
    cdfisFactSheets: [],
    isLibrary: false,
    cdfiCountLibrary: 0,
    cdfisLibrary: [],
    isImpactManagementReports: false,
    cdfiCountImpactManagementReports: 0,
    cdfisImpactManagementReports: [],
    isCustomDataReports: false,
    expirationDate: '',
    startDate: '',
    outputMapGroup: '',
    accessList: [],
    notes: '',
    explorerFiltersEnabled: false,
  };
