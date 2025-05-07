import { observable, action, decorate } from 'mobx';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { apiProcessor, notifyUser } from '../tools';
import { uiText } from '../constants';
import { downloadFetchedFile } from '../tools/fileDownloadTools';

const defaultConfig = {
  emailLog: [],
  paginationEmailLog: {
    current: 1,
    pageSize: 20,
  },
  emailLogFile: null,
  emailLogDetails: '',
  sorterEmailLog: {},
  loadingEmailLogFile: false,
  isViewEmailDetails: false,
};

class AutoEmailStore {
  paginationEmailLog: TablePaginationConfig = defaultConfig.paginationEmailLog;
  sorterEmailLog: {} = defaultConfig.sorterEmailLog;
  emailLog: any = defaultConfig.emailLog;
  emailLogFile: any = defaultConfig.emailLogFile;
  emailLogDetails: string = defaultConfig.emailLogDetails;
  loadingEmailLogFile: boolean = defaultConfig.loadingEmailLogFile;
  isViewEmailDetails: boolean = defaultConfig.isViewEmailDetails;

  setLoadingEmailLogFile = (value: boolean) => {
    this.loadingEmailLogFile = value;
  };

  setEmailLog = (data: any) => {
    this.emailLog = data;
  };

  setEmailLogDetails = (data: string) => {
    this.emailLogDetails = data;
  };

  setEmailLogFile = (data: any) => {
    this.emailLogFile = data;
  };

  setSorterEmailLog = (data: {}): void => {
    this.sorterEmailLog = data;
  };

  setPaginationEmailLog = (value: TablePaginationConfig): void => {
    this.paginationEmailLog = {
      current: value.current !== undefined ? value.current + 1 : value.current,
      pageSize: value.pageSize,
    };
  };

  setIsViewEmailDetails = (value: boolean) => {
    this.isViewEmailDetails = value;
  };

  getEmailLog = async (
    pageNumber: number = 1,
    pageSize: number = 10,
    sorter: any = {},
  ): Promise<any> => {
    this.setSorterEmailLog(sorter);
    const order =
      sorter.order === 'descend'
        ? 'desc'
        : sorter.order === 'ascend'
        ? 'asc'
        : undefined;
    const field = sorter.field;
    this.setEmailLog(
      await apiProcessor.get('autoEmailLog', {
        pageNumber,
        pageSize,
        order,
        field,
      }),
    );
  };

  getEmailLogFile = async (name: string): Promise<void> => {
    this.setEmailLogFile(
      await apiProcessor
        .get('autoEmailLogFile', { name })
        .then((response) => {
          notifyUser.ok(uiText('recipientsList', 'createOk'));
          downloadFetchedFile(response);
        })
        .catch((e) => {
          notifyUser.error(uiText('recipientsList', 'createError'));
        }),
    );
  };
}

decorate(AutoEmailStore, {
  paginationEmailLog: observable,
  sorterEmailLog: observable,
  emailLogFile: observable,
  emailLog: observable,
  isViewEmailDetails: observable,
  loadingEmailLogFile: observable,
  setEmailLog: action,
  getEmailLog: action,
  getEmailLogFile: action,
  setEmailLogDetails: action,
  setLoadingEmailLogFile: action,
});

export const autoEmailStore = new AutoEmailStore();
