import { observable, action, decorate, computed, when, reaction } from 'mobx';
import {ViewModeConfig, ViewMode, Cdfi, IEmailTemplates, Metric} from 'types';
import {apiProcessor, notifyUser, path2ViewModeConfig} from 'tools';
import { dataMan } from 'dataManagement/managers';
import { userStore } from './userStore';
import {uiText} from "../constants";
import {downloadFetchedFile} from "../tools/fileDownloadTools";

const defaultConfig = {
  entityId: null,
  companyId: null,
  portfolioId: null,
  fundManagerId: null,
  cdfiId: null,
  isLoadingDownloadFiles: false,
  isErrorMessageDownloadFiles: false,
  cdfiMetricValues: [],
  cdfiMetricExcelReport: null,
};

const SelectedCdfiManager = dataMan.managers.selectedCdfi;

class CdfiStore {
  viewModeConfig: ViewModeConfig = { ...defaultConfig };
  isLoadingDownloadFiles: boolean = defaultConfig.isLoadingDownloadFiles;
  isErrorMessageDownloadFiles: boolean = defaultConfig.isErrorMessageDownloadFiles;
  cdfiItem: Cdfi | null = null;
  cdfiMetricValues: Metric[] = defaultConfig.cdfiMetricValues;
  cdfiMetricExcelReport: null  = defaultConfig.cdfiMetricExcelReport;

  constructor() {
    when(
      () => userStore.readyToUse,
      () => {
        SelectedCdfiManager.init();
      },
    );

    reaction(
      () => SelectedCdfiManager.store.data,
      () => {
        if (!SelectedCdfiManager.dataReady || !this.viewModeConfig.cdfiId)
          return;

        this.setSelectedCdfi(this.viewModeConfig.cdfiId);
      },
    );
    this.setViewModeConfig(path2ViewModeConfig(window.location.hash));
  }

  setViewModeConfig = (config: ViewModeConfig): void => {
    if (config.cdfiId !== this.viewModeConfig.cdfiId) {
      if (!config.cdfiId) {
        this.viewModeConfig = { ...defaultConfig };
        this.cdfiItem = null;
        return;
      }
      this.setCdfiId(config.cdfiId as number);
    }
  };

  setIsLoadingDownloadFiles = (value: boolean) => {
    this.isLoadingDownloadFiles = value;
  }

  setIsErrorMessageDownloadFiles = (value: boolean) => {
    this.isErrorMessageDownloadFiles = value;
  }


  setSelectedCdfi = (cdfiId: Cdfi['id'] | null): void => {
    this.cdfiItem = SelectedCdfiManager.store.data?.find(
      (item: { id: number }) => item.id === cdfiId,
    ) as Cdfi;
  };

  setCdfiId = (cdfiId: Cdfi['id'] | null): void => {
    if (cdfiId === this.viewModeConfig.cdfiId) return;

    this.viewModeConfig.cdfiId = cdfiId;

    when(
      () => SelectedCdfiManager.dataReady,
      () => {
        this.setSelectedCdfi(cdfiId);
      },
    );
  };

  getCdfiMetricValues = async (cdfiId: number, dataset: string, showAllYears: boolean | null): Promise<any> => {
    this.setCdfiMetricValues(await apiProcessor.get('cdfiMetricsData',{
        cdfiId,
        dataset,
        showAllYears
    }));
  };

  setCdfiMetricValues = (result: any): void => {
    this.cdfiMetricValues = result;
  };

  getCdfiMetricExcelReport = async (cdfiId: number, dataset: string, showAllYears: boolean | null): Promise<void> => {
    this.setCdfiMetricExcelReport(await apiProcessor.get('cdfiMetricsExcelReport', {
          cdfiId,
          dataset,
          showAllYears
        })
        .then((response) => {
          notifyUser.ok(uiText('metricValues', 'downloadOk'));
          downloadFetchedFile(response);
        }).catch((e) => {
          notifyUser.error(uiText('metricValues', 'downloadError'));
        }));
  };

  setCdfiMetricExcelReport = (data: any) => {
    this.cdfiMetricExcelReport = data;
  }

  get viewMode(): ViewMode {
    if (this.viewModeConfig.companyId) return 'INVESTMENT';
    if (this.viewModeConfig.entityId) return 'ENTITY';
    if (this.viewModeConfig.portfolioId) return 'PORTFOLIO';
    if (this.viewModeConfig.fundManagerId) return 'FUNDMANAGER';
    if (this.viewModeConfig.cdfiId) return 'CDFI';
    return 'GLOBAL';
  }

  get isCdfiViewMode(): boolean {
    return this.viewMode === 'CDFI';
  }

  get cdfi(): Cdfi | null {
    return this.cdfiItem;
  }

  get cdfiId(): Cdfi['id'] {
    return this.viewModeConfig.cdfiId as Cdfi['id'];
  }
}

decorate(CdfiStore, {
  viewModeConfig: observable,
  cdfiItem: observable,
  isLoadingDownloadFiles: observable,
  isErrorMessageDownloadFiles: observable,
  cdfiMetricValues: observable,
  cdfiMetricExcelReport: observable,
  setViewModeConfig: action,
  setSelectedCdfi: action,
  setCdfiId: action,
  setIsLoadingDownloadFiles: action,
  setIsErrorMessageDownloadFiles: action,
  getCdfiMetricValues: action,
  setCdfiMetricValues: action,
  getCdfiMetricExcelReport: action,
  setCdfiMetricExcelReport: action,
  viewMode: computed,
  isCdfiViewMode: computed,
  cdfi: computed,
  cdfiId: computed,
});

export const cdfiStore = new CdfiStore();
