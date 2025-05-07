import { UserSimple } from 'types/user';

export interface PeerGroupUpdatedI {
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  dateCreated: Date;
  dateUpdated: Date;
}

export interface CreatedByI {
  firstName: string;
  lastName: string;
  id: number;
  company: number;
}

// Is this a peer group, or is it peergroups associated with a cdfi??
export interface PeerGroupI {
  id: string;
  name: string;
  companyType: string;
  active: boolean;
  totalAssets: string;
  dateCreated: Date;
  primaryLendingTypes: string[];
  peerGroups: string[];
  updatedBy: PeerGroupUpdatedI;
}

export interface PeerGroupsI {
  content: PeerGroupI[];
  totalElements: number;
}

export interface CdfiPeerGroupI {
  id: string | number;
  name: string;
  active: boolean;
}

export type PeerCdfi = {
  id: number;
  name?: string;
};

export type PeerGroupName = {
  id?: number;
  name: string;
};

export type ComparisonName = {
  id?: number;
  name: string;
};

export enum GroupType {
  PEER_GROUP = 'PEER_GROUP',
  PORTFOLIO_SEGMENT = 'PORTFOLIO_SEGMENT',
}

export type PeerPortfolioPermissions = {
  updatable: boolean;
  deletable: boolean;
  archivable: boolean;
  restorable: boolean;
  data: PeerPortfolioSegment;
};

export type PeerPortfolioSegment = {
  id?: number;
  name: string;
  peers: number[];
  groupType: GroupType;
  description?: string;
  filters?: any[];
  updated?: string;
  transitory?: boolean;
  originalId?: number;
  owner?: CreatedByI;
  archived?: boolean;
  peerCompanies?: PeerCdfi[];
  updatedDate?: string;
  copiedFrom?: number;
  cdfiId?: number;
  companyId?: number;
};

export type Equation = {
  decimalPlaces?: number;
  unitType: 'DOLLAR' | 'PERCENTAGE' | 'NUMBER' | string;
  smallValuePreference?: boolean;
  formula?: string;
  name?: string;
  id?: number;
  definition?: string;
};

export type ChartColumnsType = {
  [key: string]: number;
};

export type RatingsDistributionReport = {
  rowName: string;
  equation: Equation;
  columns: ChartColumnsType;
};

export type PeerAnalysisReportChart = {
  columns: ChartColumnsType;
  equation: Equation;
  rowName: string;
};

export type PeerAnalysisReportTable = PeerAnalysisReportChart & {
  company: {
    active: false;
    id: number;
    name: string;
    rated: boolean;
    reporting: boolean;
  };
};

export type PeerAnalysisReport = {
  chart: PeerAnalysisReportChart[];
  table: PeerAnalysisReportTable[];
  compareChart?: PeerAnalysisReportChart[];
  compareTable?: PeerAnalysisReportTable[];
  periods: string[];
};

export type ComparisonPermissions = {
  updatable: boolean;
  deletable: boolean;
  archivable: boolean;
  restorable: boolean;
  data: Comparison;
};

export type Comparison = {
  id?: number;
  name: string;
  description?: string;
  basePeerGroupId: number;
  comparePeerGroupId?: number;
  compareCdfis?: number[];
  company?: { id: number };
  archived?: boolean;
  updatedAt?: string;
  createdBy?: UserSimple;
  compareAggregate?: string;
};

export type CategoryItem = {
  name: string;
  metrics: {
    metric: string;
    values: string[];
  }[];
};

export type GlobalCdifiWithMetrics = {
  cdfi: {
    categories: CategoryItem[];
    name: string;
  };
  dates: string[];
};

export type CompanyMetaData = {
  name: string | undefined;
  peerCompanies: PeerCdfi[];
};
