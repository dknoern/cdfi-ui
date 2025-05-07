import {
  GlobalMetric,
  Contact,
  InvestmentType,
  Company,
  Tag,
  NotificationsConfig,
  Portfolio,
  CompanyMetric,
  ReportingEntity,
} from 'types';
import { ReportedDataTableConfigRaw } from 'types/reportedDataTableConfig';
import { Library, CreatedFolder } from 'types/library';
import { InvestmentLife } from './company';

export type InvestmentVM = {
  id: number;
  name: string;
  tags: Tag[];
  investmentLife: InvestmentLife;
  investmentType: InvestmentType;
  fiscalYearEnd: number;
  reportingStartDate: string;
  totalCommitment: number;
  investmentNumValue: number; // only for PC
  primaryContactId: Contact['id'];
};
export type Investment = InvestmentVM;

export type InvestmentCard = Pick<
  Investment,
  'id' | 'name' | 'totalCommitment' | 'investmentLife'
>;

export type MetricConfigurableFields = Pick<
  CompanyMetric,
  'tags' | 'parentId' | 'grandParentId' | 'frequency'
>;
export type MetricConfigs = Pick<MetricConfigurableFields, 'frequency'> &
  Partial<Omit<MetricConfigurableFields, 'frequency'>>;

export type RequestedMetric = Pick<GlobalMetric, 'id'> & MetricConfigs;
export type CreatedMetric = Omit<GlobalMetric, 'id'> & MetricConfigs;

// used to save
export interface InvestmentCreateData {
  pcId: ReportingEntity['id'];
  portfolioId: Portfolio['id'] | null;
  generalInfo: {
    name: string;
    fiscalYearEnd: number;
    totalCommitment: number;
    investmentLife: {
      start: string;
      maturity: string;
    };
    primaryContactId: Contact['id'];
    investmentType: InvestmentType;
    tags: Tag['id'][];
    reportingStartDate: Company['reportingStartDate'];
    pcId: ReportingEntity['id'];
    portfolioId: Portfolio['id'] | null;
  };
  requestedMetrics: RequestedMetric[];
  createdMetrics: CreatedMetric[];
  reportingConfig: ReportedDataTableConfigRaw;
  library: {
    templateId: Library['id'];
    createFolders?: CreatedFolder[];
    createSubFolders?: CreatedFolder[];
  };
  notifications: NotificationsConfig;
}

export type InvestmentUpdateFormData = Omit<
  InvestmentCreateData['generalInfo'],
  'pcId' | 'portfolioId'
> &
  Partial<Pick<InvestmentCreateData['generalInfo'], 'pcId' | 'portfolioId'>> & {
    id?: InvestmentVM['id'];
  };
