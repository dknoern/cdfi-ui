import React, { ReactNode } from 'react';
import { Button } from 'antd';
import { EditFilled } from '@ant-design/icons';
import { recentActivitiesStore } from 'store';
import {
  CompanyAssignmentStatus,
  CompanyDataVarianceStatus,
  AssignmentStatus,
  CompanyAssignmentStatusActivity, Assigned
} from 'types/dataVarianceStatus';
import moment from 'moment';
import styles from './RecentActivitiesGlobal.module.scss';

const { openAssignmentStatusModal } = recentActivitiesStore;

export const recentActivityGlobalColumns: Record<string, any>[] = [
  {
    title: 'Company',
    dataIndex: 'company',
  },
  {
    title: 'Name',
    dataIndex: 'firstName',
    render: (text: string, record: any): string =>
      `${record.firstName} ${record.lastName}`,
  },
  {
    title: 'Activity Summary',
    dataIndex: 'plainSummary',
  },
];

const getStatusValue = <Key extends keyof CompanyAssignmentStatus>(
  record: CompanyDataVarianceStatus,
  key: Key,
): CompanyAssignmentStatus[Key] => {
  const { companyAssignmentStatus } = record;
  return companyAssignmentStatus ? companyAssignmentStatus[key] ?? '' : '';
};

const getDisplayName = (assignedTo: Assigned): string => {
  const name = assignedTo ? `${assignedTo?.firstName} ${assignedTo?.lastName}` : '';
  return name.trim();
};


export const mapAssignmentStatus = (status: AssignmentStatus): string => {
  switch (status) {
    case AssignmentStatus.NOT_STARTED:
      return 'Not Started';
    case AssignmentStatus.IN_PROGRESS:
      return 'In-Progress';
    case AssignmentStatus.COMPLETED:
      return 'Complete';
    default:
      return '';
  }
};

export const getAlertSummaryCounts = (
  companyDataVarianceStatus: CompanyDataVarianceStatus,
): {
  flaggedVariances: number | undefined;
  variances: number | undefined;
  requiredMetrics: number | undefined;
} => {
  const { metricVarianceValues } = companyDataVarianceStatus;
  const flaggedVariances = metricVarianceValues
    ? metricVarianceValues.length
    : 0;
  if (flaggedVariances === 0) {
    return {
      flaggedVariances: undefined,
      variances: undefined,
      requiredMetrics: undefined,
    };
  }
  let variances = 0;
  let requiredMetrics = 0;
  for (let i = 0; i < flaggedVariances; i += 1) {
    if (metricVarianceValues[i].varianceIssueType === 'RequiredMetric') {
      requiredMetrics += 1;
    } else {
      variances += 1;
    }
  }

  return {
    flaggedVariances,
    variances: variances === 0 ? undefined : variances,
    requiredMetrics: requiredMetrics === 0 ? undefined : requiredMetrics,
  };
};

export const recentActivityDataVarianceColumns = (
  handleOpenModal: (record: any) => void,
) => [
  {
    title: 'Last Updated',
    render: (_: string, record: CompanyDataVarianceStatus): ReactNode => {
      const date = moment(getStatusValue(record, 'modified'));
      const modified = date.format('M/D/YYYY, HH:mm:ss');
      return <>{modified}</>;
    },
  },
  {
    title: 'Company Name',
    render: (_: string, record: CompanyDataVarianceStatus): ReactNode => {
      return <>{getStatusValue(record, 'companyName')}</>;
    },
  },
  {
    title: 'Period',
    width: 100,
    render: (_: string, record: CompanyDataVarianceStatus): ReactNode => {
      const period = `Q${getStatusValue(
        record,
        'fiscalQuarter',
      )} ${getStatusValue(record, 'fiscalYear')}`;
      return <>{period}</>;
    },
  },
  {
    title: 'Alert Summary',
    render: (_: string, record: CompanyDataVarianceStatus): ReactNode => {
      const { flaggedVariances, requiredMetrics, variances } = getAlertSummaryCounts(record);

      if (!flaggedVariances) {
        return 'All Flags resolved';
      }

      return (
        <div className={styles.alertSummaryCell}>
          {requiredMetrics && (
            <span
              className={styles.alertRed}
              onClick={() => handleOpenModal(record)}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              {`${requiredMetrics} Required Metric${
                requiredMetrics > 1 ? 's' : ''
              } not found`}
            </span>
          )}
          {variances && (
            <span
              className={styles.alertRed}
              onClick={() => handleOpenModal(record)}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              {`${variances} Metric${variances > 1 ? 's' : ''} exceed${
                variances > 1 ? '' : 's'
              } variance maximum`}
            </span>
          )}
        </div>
      );
    },
  },

  {
    title: 'Status',
    render: (_: string, record: CompanyDataVarianceStatus): ReactNode => {
      const status = mapAssignmentStatus(
        getStatusValue(record, 'assignmentStatus'),
      );
      return <>{status}</>;
    },
  },
  {
    title: 'Assigned To',
    render: (_: string, record: CompanyDataVarianceStatus): ReactNode => {
      const assigned = getStatusValue(record, 'assigned');
      // Prevents an issue where, so we don't run this logic for "Non data variance data' from another tab
      // Not fixing the tabs yet, due to time. But we should make sure each dashboard tab is completely decoupled to fix.
      if (!assigned || !Array.isArray(assigned)) {
        return '';
      }
      const nameList = assigned
        .map((user) => getDisplayName(user))
        .filter((name) => name !== '')
        .join(', ');
      return <>{nameList}</>;
    },
  },
  {
    title: 'Action',
    width: 75,
    key: 'action',
    render: (_: string, record: CompanyDataVarianceStatus): ReactNode => (
      <Button
        aria-label="Open edit variance dialog"
        type="link"
        onClick={(): void => {
          openAssignmentStatusModal(record);
        }}
        icon={<EditFilled />}
      />
    ),
  },
];

export const companyStatusActivityLogColumns: Record<string, any>[] = [
  {
    title: 'DATE',
    render: (_: string, record: CompanyAssignmentStatusActivity): string =>
      `${moment(record.date).format('M/D/YYYY, HH:mm:ss')}`,
  },
  {
    title: 'USER',
    render: (_: string, record: CompanyAssignmentStatusActivity): string => {
      const { person } = record;
      return `${person.firstName} ${person.lastName}`;
    },
  },
  {
    title: 'DETAILS',
    dataIndex: 'description',
  },
];
