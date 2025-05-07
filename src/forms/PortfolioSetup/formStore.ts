import { action, computed, decorate, observable, toJS } from 'mobx';
import { Portfolio } from 'types';
import { FormData, SelectedMetric } from './types';
import { formInitialState } from './constants';

class PortfolioSetupStore {
  formData: FormData;

  portfolioId: Portfolio['id'] | null = null;

  dataLoaded = false;

  constructor() {
    this.formData = Object.assign({}, formInitialState);
  }

  initWithData = (data: FormData): void => {
    this.formData = data;
    this.dataLoaded = true;
  };

  setPortfolioId = (id: Portfolio['id']): void => {
    this.portfolioId = id;
  };

  reset = (): void => {
    this.formData = Object.assign({}, formInitialState);
    this.portfolioId = null;
    this.dataLoaded = false;
  };

  updateData = (dataPart: Partial<FormData>): void => {
    this.formData = { ...this.formData, ...toJS(dataPart) };
  };

  addNewMetric = (metric: SelectedMetric): void => {
    this.formData.assignedMetrics.push(metric);
  };

  get investments(): FormData['investments'] {
    return toJS(this.formData.investments);
  }

  get selectedMetrics(): FormData['assignedMetrics'] {
    return toJS(this.formData.assignedMetrics);
  }

  get selectedCharts(): FormData['charts'] {
    return toJS(this.formData.charts);
  }
}

decorate(PortfolioSetupStore, {
  formData: observable,
  portfolioId: observable,
  dataLoaded: observable,
  reset: action,
  updateData: action,
  initWithData: action,
  setPortfolioId: action,
  investments: computed,
  selectedMetrics: computed,
  selectedCharts: computed,
});

export const formStore = new PortfolioSetupStore();
