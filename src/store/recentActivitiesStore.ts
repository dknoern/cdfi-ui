import { observable, action, decorate } from 'mobx';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import {
  CompanyDataVarianceStatus,
  CompanyAssignmentPayloadType,
  CompanyAssignmentStatusActivity,
  CompanyDataVarianceStatusParent,
  CompanyDataVarianceCdfi,
} from 'types/dataVarianceStatus';
import { UserSimple, PersonRole } from 'types';
import { apiProcessor } from '../tools';

const defaultConfig = {
  pagination: {
    current: 0,
    pageSize: 100,
  },
  recentActivitiesGlobal: [],
  recentDataVarianceActivities: undefined,
  recentDataVarianceCdfis: undefined,
  searchActivities: '',
  loading: false,
  isAssignmentStatusModalVisible: false,
  assignmentStatusFormData: undefined,
  adminContractorUsers: undefined,
  companyStatusActivityLog: undefined,
  aerisExplorerActivitiesGlobal: undefined,
};

class RecentActivitiesStore {
  pagination: TablePaginationConfig = defaultConfig.pagination;

  recentActivitiesGlobal: any | undefined =
    defaultConfig.recentActivitiesGlobal;

  recentDataVarianceActivities: CompanyDataVarianceStatusParent | undefined =
    defaultConfig.recentDataVarianceActivities;

  recentDataVarianceCdfis: CompanyDataVarianceCdfi[] | undefined =
    defaultConfig.recentDataVarianceCdfis;

  searchActivities: any = defaultConfig.searchActivities;

  loading: any = defaultConfig.loading;

  isAssignmentStatusModalVisible = defaultConfig.isAssignmentStatusModalVisible;

  assignmentStatusFormData: CompanyDataVarianceStatus | undefined =
    defaultConfig.assignmentStatusFormData;

  adminContractorUsers: UserSimple[] | undefined =
    defaultConfig.adminContractorUsers;

  companyStatusActivityLog: CompanyAssignmentStatusActivity[] | undefined =
    defaultConfig.companyStatusActivityLog;

  aerisExplorerActivitiesGlobal: any | undefined = defaultConfig.aerisExplorerActivitiesGlobal;

  setSearchActivities = (value: any): void => {
    this.searchActivities = value;
  };

  setLoading = (value: boolean): void => {
    this.loading = value;
  };

  setPagination = (value: TablePaginationConfig): void => {
    this.pagination = {
      current: value.current !== undefined ? value.current + 1 : value.current,
      pageSize: value.pageSize,
    };
  };

  setRecentActivitiesGlobal = (result: any): void => {
    this.recentActivitiesGlobal = result;
  };

  getRecentActivitiesGlobal = async (
    companyType = 'cdfi',
    pageNumber = 1,
    pageSize = 10,
    search = '',
  ): Promise<void> => {
    this.setRecentActivitiesGlobal(
      await apiProcessor.get('recentActivitiesGlobal', {
        companyType,
        pageNumber,
        pageSize,
        search,
      }),
    );
  };

  setRecentDataVarianceActivities = (
    result: CompanyDataVarianceStatusParent,
  ): void => {
    this.recentDataVarianceActivities = result;
  };

  setRecentDataVarianceCdfis = (
    result: CompanyDataVarianceCdfi[],
  ): void => {
    this.recentDataVarianceCdfis = result;
  };

  getDataVarianceRecentActivities = async (
    assignedTo: number[] | undefined,
    statusFilter: string[] | undefined,
    companyFilter: number[] | undefined,
    isCurrentPeriod: boolean | undefined,
    pageNumber = 1,
    pageSize = 10,
  ): Promise<void> => {
    const assignedToValues: string | undefined = assignedTo
      ? assignedTo.toString()
      : undefined;
    const companyFilterValues: string | undefined = companyFilter
      ? companyFilter.toString()
      : undefined;
    const statusFilterValues: string | undefined = statusFilter ? statusFilter.toString() : undefined;
    this.setRecentDataVarianceActivities(
      await apiProcessor.get('recentDataVarianceActivities', {
        assignedToValues,
        statusFilterValues,
        companyFilterValues,
        isCurrentPeriod,
        pageNumber,
        pageSize,
      }),
    );
  };

  getDataVarianceCdfis = async (
    assignedTo: number[] | undefined,
    statusFilter: string[] | undefined,
    isCurrentPeriod: boolean | undefined
  ): Promise<void> => {
    const assignedToValues: string | undefined = assignedTo
      ? assignedTo.toString()
      : undefined;
    const statusFilterValues: string | undefined = statusFilter ? statusFilter.toString() : undefined;
    this.setRecentDataVarianceCdfis(
      await apiProcessor.get('recentDataVarianceCdfis', {
        assignedToValues,
        statusFilterValues,
        isCurrentPeriod
      }),
    );
  };

  setAdminContractorUsers = (result: UserSimple[]): void => {
    this.adminContractorUsers = result;
  };

  getAdminContractorUsers = async ({
    companyType = 'Cars',
    role = `${PersonRole.ADMIN},${PersonRole.CONTRACTOR}`,
  }: {
    companyType?: string;
    role?: string;
  } = {}): Promise<void> => {
    this.setAdminContractorUsers(
      await apiProcessor.get('usersByCompanyAndRoles', {
        companyType,
        role,
      }),
    );
  };

  setCompanyStatusActivityLog = (
    result: CompanyAssignmentStatusActivity[],
  ): void => {
    this.companyStatusActivityLog = result;
  };

  getCompanyStatusActivityLog = async (
    companyId: number,
    year: number,
    quarter: number,
  ): Promise<void> => {
    this.setCompanyStatusActivityLog(
      await apiProcessor.get('companyStatusActivityLog', {
        companyId,
        year,
        quarter,
      }),
    );
  };

  updateUserAssignmentDataVariance = async (
    payload: CompanyAssignmentPayloadType,
  ): Promise<void> => {
    await apiProcessor.put('assignUsersDataVariance', null, payload);
  };

  setAssignmentStatusFormData = (
    data: CompanyDataVarianceStatus | undefined,
  ): void => {
    this.assignmentStatusFormData = data;
  };

  openAssignmentStatusModal = (
    data: CompanyDataVarianceStatus | undefined,
  ): void => {
    this.isAssignmentStatusModalVisible = !!data;
    this.setAssignmentStatusFormData(data);
  };

  closeAssignmentStatusModal = (): void => {
    this.isAssignmentStatusModalVisible = false;
    this.setAssignmentStatusFormData(undefined);
  };
}

decorate(RecentActivitiesStore, {
  pagination: observable,
  searchActivities: observable,
  loading: observable,
  recentActivitiesGlobal: observable,
  recentDataVarianceActivities: observable,
  isAssignmentStatusModalVisible: observable,
  assignmentStatusFormData: observable,
  adminContractorUsers: observable,
  companyStatusActivityLog: observable,
  setPagination: action,
  getRecentActivitiesGlobal: action,
  getDataVarianceRecentActivities: action,
  setSearchActivities: action,
  setLoading: action,
  openAssignmentStatusModal: action,
  closeAssignmentStatusModal: action,
  getAdminContractorUsers: action,
  updateUserAssignmentDataVariance: action,
  getCompanyStatusActivityLog: action,
});

export const recentActivitiesStore = new RecentActivitiesStore();
