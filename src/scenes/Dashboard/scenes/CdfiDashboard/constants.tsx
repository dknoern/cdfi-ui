import React, { ReactNode } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { CdfiRating } from 'types/cdfiRating';
import { sortByString } from 'tools';
import { CdfiSubscriber, CdfiContactEditFormData, PersonRole } from 'types';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { VoidFn } from 'types';
import styles from './ContactsDashboard.module.scss';

export const actionItemsColumns: Record<string, any>[] = [
  {
    title: 'Details',
    dataIndex: 'title',
  },
];

export const subscriberColumns: ColumnProps<CdfiSubscriber>[] = [
  {
    title: 'Organization',
    dataIndex: 'companyName',
    sorter: (a, b): number => sortByString(a.companyName, b.companyName),
  },
  {
    title: 'Last Accessed Date',
    dataIndex: 'lastAccessedDate',
    sorter: (a, b): number =>
      ('' + a.lastAccessedDate).localeCompare(b.lastAccessedDate),
  },
];

export const ratingsNoReleaseDateColumns: ColumnProps<CdfiRating>[] = [
  {
    title: 'Activity',
    dataIndex: 'activity',
    sorter: (a, b): number => ('' + a.activity).localeCompare(b.activity),
  },
  {
    title: 'Date of Analysis',
    dataIndex: 'dateOfAnalysis',
    sorter: (a, b): number =>
      ('' + a.dateOfAnalysis).localeCompare(b.dateOfAnalysis),
  },
  {
    title: 'Impact Management',
    dataIndex: 'impactPerformance',
    sorter: (a, b): number =>
      ('' + a.impactPerformance).localeCompare(b.impactPerformance),
  },
  {
    title: 'Financial Strength',
    dataIndex: 'financialStrength',
    sorter: (a, b): number =>
      ('' + a.financialStrength).localeCompare(b.financialStrength),
  },
]

export const initialRatingsColumns: ColumnProps<CdfiRating>[] = [
  {
    title: 'Activity',
    dataIndex: 'activity',
    sorter: (a, b): number => ('' + a.activity).localeCompare(b.activity),
  },
  {
    title: 'Date of Analysis',
    dataIndex: 'dateOfAnalysis',
    sorter: (a, b): number =>
      ('' + a.dateOfAnalysis).localeCompare(b.dateOfAnalysis),
  },
  {
    title: 'Release Date',
    dataIndex: 'releaseDate',
    sorter: (a, b): number =>
      ('' + a.releaseDate).localeCompare(b.releaseDate),
  },
  {
    title: 'Impact Management',
    dataIndex: 'impactPerformance',
    sorter: (a, b): number =>
      ('' + a.impactPerformance).localeCompare(b.impactPerformance),
  },
  {
    title: 'Financial Strength',
    dataIndex: 'financialStrength',
    sorter: (a, b): number =>
      ('' + a.financialStrength).localeCompare(b.financialStrength),
  },
];

export const analystsColumns: Record<string, any>[] = [
  {
    title: 'Name',
    dataIndex: 'firstName',
    render: (text: string, record: any) =>
      record.firstName + ' ' + record.lastName,
  },
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
  missionEmpty:
    'A mission statement has not been added to your account. Please contact CDFI support to update your organization details.',
  descriptionEmpty:
    'A description has not been added to your account. Please contact CDFI support to update your organization details.',
  noData: 'No Data',
  noNumber: '+1',
  noWebsite: 'https://',
  noRated: 'Not rated',
  noAddress: 'No address provided',
};

export const logoCard = {
  height: '100%',
  minHeight: 200,
  width: '100%',
  minWidth: 300,
  padding: '10px',
};

export const quarters = [
  { qtrVal: 1, displayName: 'First' },
  { qtrVal: 2, displayName: 'Second' },
  { qtrVal: 3, displayName: 'Third' },
  { qtrVal: 4, displayName: 'Fourth' },
];

export const impactPerformanceRatings = ['★★★★', '★★★', '★★', '★', ''];

export const impactPerformancesAnnual = [
  'Improvement',
  'Stable with Improving Trends',
  'Stable',
  'Stable with Declining Trends',
  'Decline',
  '',
];

export const financialStrengthRatings = [
  'AAA',
  'AA+',
  'AA',
  'AA-',
  'A+',
  'A',
  'A-',
  'BBB+',
  'BBB',
  'BBB-',
  'BB+',
  'BB',
  'BB-',
  'B',
  '',
];

export const financialStrengthsAnnual = [
  'Improvement',
  'Stable with Improving Trends',
  'Stable',
  'Stable with Declining Trends',
  'Decline',
  '',
];

export const reviewTypes = [
  { name: 'ANNUAL_RATING', displayName: 'Aeris Rating' },
  { name: 'ANNUAL', displayName: 'Annual Review' },
];

export const cdfiContactCreateDefaultValues: CdfiContactEditFormData = {
  id: 0,
  firstName: '',
  lastName: '',
  username: '',
  phone: '',
  phoneExtension: '',
  dateCreated: new Date(),
  title: '',
  role: PersonRole.ANALYST,
  enabled: true,
  fullName: '',
  email: '',
  isActive: true,
  uploadReminders: false,
  isPublicContact: false,
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

export const ratingsActionButtons = (onAddClick: VoidFn): ReactNode[] => [
  <Button
    id="createRatingButton"
    onClick={onAddClick}
    type="default"
    icon={<PlusOutlined />}
    className={styles.actionButton}
  >
    Add Rating
  </Button>,
];
