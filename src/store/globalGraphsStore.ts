import { observable, action, decorate } from 'mobx';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { apiProcessor, notifyUser } from '../tools';
import { uiStore } from './uiStore';
import { uiText } from '../constants';

const defaultConfig = {
  globalGraphs: [],
  globalGraph: {},
  isDeleteGlobalGraph: false,
  pagination: {
    current: 1,
    pageSize: 5,
  },
  sorter: {},
  loadingGlobalGraphs: false,
  isEditGraph: true,
  graphTypes: [],
  unitTypes: [],
  periodTypes: [],
};

class GlobalGraphsStore {
  globalGraphs: any | undefined = defaultConfig.globalGraphs;
  globalGraph: any | undefined = defaultConfig.globalGraph;
  isDeleteGlobalGraph: boolean = defaultConfig.isDeleteGlobalGraph;
  pagination: TablePaginationConfig = defaultConfig.pagination;
  sorter: {} = defaultConfig.sorter;
  loadingGlobalGraphs: boolean = defaultConfig.loadingGlobalGraphs;
  isEditGraph: boolean = defaultConfig.isEditGraph;
  graphTypes: string[] = defaultConfig.graphTypes;
  unitTypes: string[] = defaultConfig.unitTypes;
  periodTypes: string[] = defaultConfig.periodTypes;

  setLoadingGlobalGraphs = (value: boolean) => {
    this.loadingGlobalGraphs = value;
  };

  setSorter = (data: {}): void => {
    this.sorter = data;
  };

  setPagination = (value: TablePaginationConfig): void => {
    this.pagination = {
      current: value.current !== undefined ? value.current + 1 : value.current,
      pageSize: value.pageSize,
    };
  };

  setIsDeleteGlobalGraph = (value: boolean): void => {
    this.isDeleteGlobalGraph = value;
  };

  setGlobalGraphs = (result: any): void => {
    this.globalGraphs = result;
  };

  setGlobalGraph = (result: any): void => {
    this.globalGraph = result;
  };

  getGlobalGraphs = async (
    pageNumber = 1,
    pageSize = 10,
    sorter: any = {},
  ): Promise<any> => {
    this.setSorter(sorter);
    const order =
      sorter.order === 'descend'
        ? 'desc'
        : sorter.order === 'ascend'
        ? 'asc'
        : undefined;
    const field =
      sorter.field === 'title'
        ? 'title'
        : sorter.field === 'code'
        ? 'code'
        : sorter.field === 'graphType'
        ? 'graphType'
        : sorter.field === 'unitType'
        ? 'unitType'
        : undefined;
    this.setGlobalGraphs(
      await apiProcessor.get('globalGraphsAll', {
        pageNumber,
        pageSize,
        order,
        field,
      }),
    );
  };

  getGlobalGraph = async (id: number): Promise<void> => {
    this.setGlobalGraph(await apiProcessor.get('globalGraph', id));
  };

  getCreateGlobalGraph = async (data: any): Promise<any> => {
    await apiProcessor
      .post('globalGraphCreate', data?.id, {
        ...data,
      })
      .then(() => {
        notifyUser.ok(uiText('graphs', 'createOk'));
      })
      .finally(() => {
        uiStore.endLoading('globalGraphCreate');
      });
  };

  getUpdateGlobalGraph = async (data: any): Promise<any> => {
    await apiProcessor
      .put('globalGraphUpdate', this.globalGraph?.id, {
        ...data,
      })
      .then(() => {
        notifyUser.ok(uiText('graphs', 'updateOk'));
      })
      .finally(() => {
        uiStore.endLoading('globalGraphUpdate');
      });
  };

  getDeleteGlobalGraph = (id: number | undefined): Promise<void> => {
    const OPERATION = 'globalGraphDelete';
    uiStore.addLoading(OPERATION);
    return apiProcessor
      .delete(OPERATION, id)
      .then(() => {
        notifyUser.ok(uiText('graphs', 'deleteOk'));
      })
      .finally(() => {
        uiStore.endLoading(OPERATION);
      });
  };

  setIsEditGraph = (value: boolean): void => {
    this.isEditGraph = value;
  };

  setGraphTypes = (result: any): void => {
    this.graphTypes = result;
  };

  getGraphTypes = async (): Promise<void> => {
    this.setGraphTypes(await apiProcessor.get('getGlobalGraphTypes'));
  };

  setUnitTypes = (result: any): void => {
    this.unitTypes = result;
  };

  getUnitTypes = async (): Promise<void> => {
    this.setUnitTypes(await apiProcessor.get('getGlobalUnitTypes'));
  };

  setPeriodTypes = (result: any): void => {
    this.periodTypes = result;
  };

  getPeriodTypes = async (): Promise<void> => {
    this.setPeriodTypes(await apiProcessor.get('getGlobalPeriodTypes'));
  };
}

decorate(GlobalGraphsStore, {
  getCreateGlobalGraph: action,
  getDeleteGlobalGraph: action,
  getGlobalGraph: action,
  getGlobalGraphs: action,
  getGraphTypes: action,
  getPeriodTypes: action,
  getUnitTypes: action,
  getUpdateGlobalGraph: action,
  globalGraph: observable,
  globalGraphs: observable,
  isEditGraph: observable,
  isDeleteGlobalGraph: observable,
  loadingGlobalGraphs: observable,
  pagination: observable,
  setGlobalGraph: action,
  setGlobalGraphs: action,
  setGraphTypes: action,
  setIsDeleteGlobalGraph: action,
  setIsEditGraph: action,
  setPagination: action,
  setPeriodTypes: action,
  setUnitTypes: action,
  sorter: observable,
});

export const globalGraphsStore = new GlobalGraphsStore();
