import { TablePaginationConfig } from 'antd/lib/table/interface';
import { action, decorate, observable } from 'mobx';
import { apiProcessor, notifyUser } from '../tools';
import { downloadFetchedFile } from '../tools/fileDownloadTools';
import { uiText } from '../constants';

const defaultConfig = {
  pagination: {
    current: 0,
    pageSize: 10,
  },
  allSubscribers: {},
  searchSubscribers: '',
  loading: false,
  sorter: {},
};

class AllSubscribersStore {
  pagination: TablePaginationConfig = defaultConfig.pagination;

  allSubscribers: any | undefined = defaultConfig.allSubscribers;

  searchSubscribers: any = defaultConfig.searchSubscribers;

  loading: any = defaultConfig.loading;

  sorter: {} = defaultConfig.sorter;

  setAllSubscribers = (result: any): void => {
    this.allSubscribers = result;
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

  setSearchSubscribers = (value: any): void => {
    this.searchSubscribers = value;
  };

  setSorter = (data: {}): void => {
    this.sorter = data;
  };

  getAllSubscribers = async (
    pageNumber: number = 1,
    pageSize: number = 10,
    search: string = '',
    sorter: any = { field: 'name', order: 'ascend' },
  ): Promise<any> => {
    this.setSorter(sorter);
    const order =
      sorter.order === 'descend'
        ? 'DESC'
        : sorter.order === 'ascend'
        ? 'ASC'
        : '';
    const field =
      sorter.field === 'name'
        ? 'name'
        : sorter.field === 'startDate'
        ? 'start_date'
        : sorter.field === 'expirationDate'
        ? 'expiration_date'
        : sorter.field === 'isCustomDataReports'
        ? 'custom_data_reports'
        : '';

    const allSubscribersResult = await apiProcessor.get('allSubscribers', {
      pageNumber,
      pageSize,
      search,
      order,
      field,
    });
    this.setAllSubscribers(allSubscribersResult);
  };

  exportSubscribersList = async (
    sorter: any = this.sorter || { field: 'name', order: 'ascend' },
  ): Promise<any> => {
    this.setSorter(sorter);
    const order =
      sorter.order === 'descend'
        ? 'DESC'
        : sorter.order === 'ascend'
        ? 'ASC'
        : '';
    const field =
      sorter.field === 'name'
        ? 'name'
        : sorter.field === 'startDate'
        ? 'start_date'
        : sorter.field === 'expirationDate'
        ? 'expiration_date'
        : sorter.field === 'isCustomDataReports'
        ? 'custom_data_reports'
        : '';

    await apiProcessor
      .get('allSubscribersExport', {
        order,
        field,
      })
      .then((response) => {
        notifyUser.ok(uiText('subscribers', 'downloadOk'));
        downloadFetchedFile(response);
      })
      .catch((e) => {
        notifyUser.error(uiText('subscribers', 'downloadError'));
      });
  };
}

decorate(AllSubscribersStore, {
  pagination: observable,
  searchSubscribers: observable,
  loading: observable,
  sorter: observable,
  allSubscribers: observable,
  setPagination: action,
  getAllSubscribers: action,
  setSearchSubscribers: action,
  setLoading: action,
  exportSubscribersList: action,
});

export const allSubscribersStore = new AllSubscribersStore();
