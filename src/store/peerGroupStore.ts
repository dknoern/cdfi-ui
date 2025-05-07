import { TablePaginationConfig } from 'antd/lib/table/interface';
import { apiProcessor, notifyUser } from '../tools';
import { action, decorate, observable } from 'mobx';
import { uiText } from '../constants';
import { uiStore } from './uiStore';

const defaultConfig = {
  pagination: {
    current: 0,
    pageSize: 10,
  },
  peerGroups: {},
  peerGroupsTotal: {},
  cdfiPeerGroups: {},
  searchPeerGroups: '',
  loading: false,
  sorter: {},
  selectedCdfi: '',
};

class PeerGroupStore {
  pagination: TablePaginationConfig = defaultConfig.pagination;
  peerGroups: any | undefined = defaultConfig.peerGroups;
  peerGroupsTotal: any | undefined = defaultConfig.peerGroupsTotal;
  cdfiPeerGroups: any | undefined = defaultConfig.cdfiPeerGroups;
  searchPeerGroups: any = defaultConfig.searchPeerGroups;
  loading: any = defaultConfig.loading;
  sorter: {} = defaultConfig.sorter;
  selectedCdfi: {} = defaultConfig.selectedCdfi;

  setPeerGroups = (result: any): void => {
    this.peerGroups = result;
  };
  setPeerGroupsTotal = (result: any): void => {
    this.peerGroupsTotal = result;
  };
  setCdfiPeerGroups = (result: any): void => {
    this.cdfiPeerGroups = result;
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

  setSearchPeerGroups = (value: any): void => {
    this.searchPeerGroups = value;
  };

  setSorter = (data: {} | undefined): void => {
    this.sorter = data || {};
  };
  setSelectedCdfi = (cdfiId: string | number): void => {
    this.selectedCdfi = cdfiId;
  };

  getAllCdfis = async (
    pageNumber: number = 1,
    pageSize: number = 10,
    search: string = '',
    sorter: any | undefined = { field: 'name', order: 'ascend' },
  ): Promise<any> => {
    this.setSorter(sorter);

    const order = sorter && sorter.order === 'descend' ? 'desc' : 'asc';
    const field =
      sorter && sorter.field === 'name'
        ? 'name'
        : sorter.field === 'dateUpdated'
        ? 'updated_date'
        : '';

    const allCdfisResult = await apiProcessor.get('allCdfis', {
      pageNumber,
      pageSize,
      search,
      order,
      field,
    });

    this.setPeerGroups(allCdfisResult);
  };

  getTotalCdfis = async (): Promise<any> => {
    try {
      const allCdfisTotalResult = await apiProcessor.get('allCdfis', {
        pageNumber: 0,
        pageSize: 500,
        search: '',
      });
      this.setPeerGroupsTotal(allCdfisTotalResult);
      return allCdfisTotalResult;
    } catch (error) {
      console.error('Error fetching total CDFIs:', error);
      return null;
    }
  };

  getCdfiPeerGroups = async (
    cdfiId?: string | number,
    companyId = null,
    includeGlobal = true,
  ): Promise<any[]> => {
    const allCdfiPeerGroups = await apiProcessor.get('peerGroups', {
      cdfiId,
      companyId,
      includeGlobal,
    });
    this.setCdfiPeerGroups(allCdfiPeerGroups);
    return allCdfiPeerGroups;
  };

  getUpdatePeerGroups = async (data: any): Promise<any> => {
    await apiProcessor
      .post('updatePeerGroups', this.selectedCdfi, {
        ...data,
      })
      .then(() => {
        notifyUser.ok(uiText('peerGroups', 'updateOk'));
      })
      .finally(() => {
        uiStore.endLoading('updatePeerGroups');
      });
  };
}

decorate(PeerGroupStore, {
  pagination: observable,
  searchPeerGroups: observable,
  loading: observable,
  sorter: observable,
  peerGroups: observable,
  cdfiPeerGroups: observable,
  peerGroupsTotal: observable,
  setPagination: action,
  setSelectedCdfi: action,
  getAllCdfis: action,
  getCdfiPeerGroups: action,
  getTotalCdfis: action,
  setSearchPeerGroups: action,
  setLoading: action,
  getUpdatePeerGroups: action,
});

export const peerGroupStore = new PeerGroupStore();
