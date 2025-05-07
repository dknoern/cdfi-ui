import { observable, decorate } from 'mobx';
import { apiProcessor } from '../tools';
import { Equation } from '../forms/ChartCreate/types';

export type ExplorerFilter = {
  equationId: number;
  equationName?: string;
  createdAt?: string;
  createdById?: number;
  createdByName?: string;
  updatedAt?: string;
  updatedById?: number;
  updatedByName?: string;
};

export class ManageExplorerStore {
  loading = false;

  explorerFilters: ExplorerFilter[] | undefined = [];

  availableFilters: Equation[] | undefined = [];

  setLoading = (value: boolean): void => {
    this.loading = value;
  };

  getExplorerFilters = async (): Promise<ExplorerFilter[]> => {
    return apiProcessor.get('getManageExplorerFilters').then((data) => {
      this.setExplorerFilters(data);
      return data;
    });
  };

  createExplorerFilter = async (
    filter: ExplorerFilter,
  ): Promise<ExplorerFilter> => {
    return apiProcessor.post('createManageExplorerFilter', undefined, filter);
  };

  deleteExplorerFilter = async (filterId: number): Promise<void> => {
    return apiProcessor.delete('deleteManageExplorerFilter', filterId);
  };

  setExplorerFilters = (result: ExplorerFilter[]): void => {
    this.explorerFilters = result;
  };

  getAvailableFilters = async (): Promise<Equation[]> => {
    return apiProcessor.get('getManageAvailableFilters').then((data) => {
      this.setAvailableFilters(data);
      return data;
    });
  };

  setAvailableFilters = (result: Equation[]): void => {
    this.availableFilters = result;
  };
}

decorate(ManageExplorerStore, {
  explorerFilters: observable,
});

export const manageExplorerStore = new ManageExplorerStore();
