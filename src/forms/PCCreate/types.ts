import {
  AssignedMetric,
  CompanyInfoBase,
  Contact,
  InvestmentType,
  Company,
  Tag,
  NotificationsConfig,
} from 'types';
import { ReportedDataTableConfigRaw } from 'types/reportedDataTableConfig';
import { Folder, Library } from 'types/library';

export enum FormStep {
  generalInfo = 'generalInfo',
  assignMetrics = 'assignMetrics',
  customizeMetrics = 'customizeMetrics',
  reportingConfig = 'reportingConfig',
  librarySetup = 'librarySetup',
  notificationsSetup = 'notificationsSetup',
  review = 'review',
}

export interface CreatedFolder {
  name: Folder['name'];
  description: Folder['description'];
  personalTemplate: boolean;
  subFolders: CreatedFolder & { frequency: Folder['frequency'] }[];
}

// used to save
export interface PortfolioCompanyCreate {
  general: CompanyInfoBase & {
    description: Company['description'];
    fiscalYearEnd: number;
    investment: number;
    investmentLife: {
      start: string;
      maturity: string;
    };
    contacts: Contact[];
    investmentType: InvestmentType;
    tags: Tag['id'][];
    reportingStartDate: Company['reportingStartDate'];
  };
  requestedMetrics: Omit<AssignedMetric, 'status'>[];
  createdMetrics: Omit<AssignedMetric, 'status' | 'id'>[];
  reportingConfig: ReportedDataTableConfigRaw;
  library: {
    templateId: Library['id'];
    createFolders?: CreatedFolder[];
    createSubFolders?: CreatedFolder[];
  };
  notifications: NotificationsConfig;
}
