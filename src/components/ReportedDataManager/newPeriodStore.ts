import { action, decorate, observable } from 'mobx';
import { Metric } from 'types';
import { ReportingPeriod } from 'types/reportedData';
import { MetricValue } from 'types/metricValue';
import { PeriodDataAction, OccupiedPeriods } from './types';
import { newPeriodDataReducer } from './tools';

class NewPeriodDataStore {
  newPeriodConfig: null | ReportingPeriod = null;

  newPeriodData: Map<Metric['id'], MetricValue> = new Map();

  modalActive = false;

  occupiedPeriods: OccupiedPeriods = new Map();

  setNewPeriodConfig = (config: ReportingPeriod | null): void => {
    this.newPeriodConfig = config;
    this.toggleModal(false);
  };

  changePeriodData = (dataAction?: PeriodDataAction): void => {
    this.newPeriodData = newPeriodDataReducer(this.newPeriodData, dataAction);
  };

  reset = (): void => {
    this.setNewPeriodConfig(null);
    this.newPeriodData = new Map();
    this.toggleModal(false);
  };

  toggleModal = (isActive?: boolean): void => {
    this.modalActive = isActive !== undefined ? isActive : !this.modalActive;
  };

  startFlow = (): void => {
    this.reset();
    this.toggleModal(true);
  };

  setOccupiedPeriods = (periods?: OccupiedPeriods): void => {
    if (!periods) {
      this.occupiedPeriods.clear();
      return;
    }
    this.occupiedPeriods = new Map(periods);
  };
}

decorate(NewPeriodDataStore, {
  newPeriodConfig: observable,
  newPeriodData: observable,
  modalActive: observable,
  occupiedPeriods: observable,
  setNewPeriodConfig: action,
  changePeriodData: action,
  reset: action,
  toggleModal: action,
  startFlow: action,
  setOccupiedPeriods: action,
});

export const newPeriodStore = new NewPeriodDataStore();
