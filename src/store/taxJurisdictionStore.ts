import { observable, action, decorate } from 'mobx';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { apiProcessor, notifyUser } from '../tools';
import { uiStore } from './uiStore';
import { uiText } from '../constants';
import { TaxJurisdictions } from '../types/taxJurisdiction';

const defaultConfig = {
  taxJurisdictionList: [],
  taxJurisdiction: {},
  loadingTaxJurisdictionList: false,
  isEditTaxJurisdiction: true,
  isDeleteTaxJurisdiction: false,
  sorter: {},
  pagination: {
    current: 1,
    pageSize: 10,
  },
};

class TaxJurisdictionStore {
  taxJurisdictionList: any | undefined = defaultConfig.taxJurisdictionList;

  taxJurisdiction: any | undefined = defaultConfig.taxJurisdiction;

  loadingTaxJurisdictionList: boolean =
    defaultConfig.loadingTaxJurisdictionList;

  isDeleteTaxJurisdiction: boolean = defaultConfig.isDeleteTaxJurisdiction;

  sorter: {} = defaultConfig.sorter;

  pagination: TablePaginationConfig = defaultConfig.pagination;

  isEditTaxJurisdiction: boolean = defaultConfig.isEditTaxJurisdiction;

  setLoadingTaxJurisdictionList = (value: boolean) => {
    this.loadingTaxJurisdictionList = value;
  };

  setSorter = (data: {}): void => {
    this.sorter = data;
  };

  setIsDeleteTaxJurisdiction = (value: boolean): void => {
    this.isDeleteTaxJurisdiction = value;
  };

  setTaxJurisdictionList = (result: any): void => {
    this.taxJurisdictionList = result;
  };

  setTaxJurisdiction = (result: any): void => {
    this.taxJurisdiction = result;
  };

  getTaxJurisdictionList = async (
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
      sorter.field === 'name'
        ? 'name'
        : sorter.field === 'language'
        ? 'language'
        : sorter.field === 'country'
        ? 'country'
        : undefined;
    this.setTaxJurisdictionList(
      await apiProcessor.get('taxJurisdictionAll', {
        pageNumber,
        pageSize,
        order,
        field,
      }),
    );
  };

  getTaxJurisdiction = async (id: number): Promise<void> => {
    this.setTaxJurisdiction(await apiProcessor.get('taxJurisdiction', id));
  };

  getCreateTaxJurisdiction = async (data: any): Promise<any> => {
    await apiProcessor
      .put('taxJurisdictionCreate', data?.id, {
        ...data,
      })
      .then(() => {
        notifyUser.ok(uiText('taxJurisdiction', 'createOk'));
      })
      .catch(() => {
        notifyUser.error(uiText('taxJurisdiction', 'createError'));
      })
      .finally(() => {
        uiStore.endLoading('taxJurisdictionCreate');
      });
  };

  getUpdateTaxJurisdiction = async (data: any): Promise<any> => {
    await apiProcessor
      .post('taxJurisdictionUpdate', this.taxJurisdiction?.id, {
        ...data,
      })
      .then(() => {
        notifyUser.ok(uiText('taxJurisdiction', 'updateOk'));
      })
      .catch(() => {
        notifyUser.error(uiText('taxJurisdiction', 'updateError'));
      })
      .finally(() => {
        uiStore.endLoading('taxJurisdictionUpdate');
      });
  };

  getDeleteTaxJurisdiction = (id: number | undefined): Promise<void> => {
    const OPERATION = 'taxJurisdictionDelete';
    uiStore.addLoading(OPERATION);
    return apiProcessor
      .delete(OPERATION, id)
      .then(() => {
        notifyUser.ok(uiText('taxJurisdiction', 'deleteOk'));
        const updatedTaxJurisdictionList: TaxJurisdictions[] =
          this.taxJurisdictionList.content.filter(
            (taxJur: TaxJurisdictions) => taxJur.id !== id,
          );
        this.taxJurisdictionList.content = updatedTaxJurisdictionList;
      })
      .catch(() => {
        notifyUser.error(uiText('taxJurisdiction', 'deleteError'));
      })
      .finally(() => {
        uiStore.endLoading(OPERATION);
      });
  };

  setIsEditTaxJurisdiction = (value: boolean): void => {
    this.isEditTaxJurisdiction = value;
  };

  setPagination = (value: TablePaginationConfig): void => {
    this.pagination = {
      current: value.current !== undefined ? value.current + 1 : value.current,
      pageSize: value.pageSize,
    };
  };
}

decorate(TaxJurisdictionStore, {
  getCreateTaxJurisdiction: action,
  getDeleteTaxJurisdiction: action,
  getTaxJurisdiction: action,
  getTaxJurisdictionList: action,
  getUpdateTaxJurisdiction: action,
  setTaxJurisdiction: action,
  setTaxJurisdictionList: action,
  setIsDeleteTaxJurisdiction: action,
  setIsEditTaxJurisdiction: action,
  taxJurisdiction: observable,
  taxJurisdictionList: observable,
  isEditTaxJurisdiction: observable,
  isDeleteTaxJurisdiction: observable,
  loadingTaxJurisdictionList: observable,
  sorter: observable,
  pagination: observable,
  setPagination: action,
});

export const taxJurisdictionStore = new TaxJurisdictionStore();
