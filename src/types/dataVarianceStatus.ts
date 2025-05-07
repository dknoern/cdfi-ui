import { FiscalQuarter } from './reportedData';
import { UserSimple } from './user';

export type Assigned = {
  firstName?: string;
  lastName?: string;
  id: number;
  companyId?: number;
};

export enum AssignmentStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export type MetricVarianceValue = {
  companyId: number;
  id: number;
  metricId: number;
  metricName: string;
  metricCode: string;
  metricValue: number;
  mitigated: boolean;
  quarter: number;
  varianceIssueType: 'RequiredMetric' | 'Variance';
  year: number;
};

export type CompanyAssignmentStatus = {
  companyId: number;
  companyName: string;
  fiscalYear: number;
  fiscalQuarter: FiscalQuarter;
  assigned: Assigned[];
  assignmentStatus: AssignmentStatus;
  modified: string;
  latestPeriod: boolean;
  [key: string]: string | number | boolean | FiscalQuarter | Assigned[];
};

export type CompanyDataVarianceStatus = {
  companyAssignmentStatus: CompanyAssignmentStatus;
  metricVarianceValues: MetricVarianceValue[];
};

export type CompanyDataVarianceStatusParent = {
  content: CompanyDataVarianceStatus[];
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type CompanyAssignmentPayloadType = {
  companyId: number | undefined;
  fiscalYear: number | undefined;
  fiscalQuarter: FiscalQuarter | undefined;
  assignmentStatus: AssignmentStatus;
  assigned: Assigned[];
};

export type CompanyAssignmentStatusActivity = {
  activityId: number;
  person: UserSimple;
  companyId: number;
  quarter: FiscalQuarter;
  year: number;
  description: string;
  date: string;
  activityType: string;
};

export type CompanyDataVarianceCdfi = {
  id: number;
  name: string;
};
