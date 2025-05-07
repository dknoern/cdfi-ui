import { observable, action, decorate, computed, when, reaction } from 'mobx';
import {
  ViewModeConfig,
  ViewMode,
  Company,
  Portfolio,
  FMCompany,
  Investment,
} from 'types';
import { path2ViewModeConfig } from 'tools';
import { dataMan } from 'dataManagement/managers';
import { userStore } from './userStore';

const defaultConfig = {
  companyId: null, // = INVESTMENT for now
  portfolioId: null,
  fundManagerId: null,
  entityId: null,
};

const PortfoliosMgr = dataMan.managers.portfolios;
const FMsMgr = dataMan.managers.fmCompanies;
const InvestmentsMgr = dataMan.managers.investments;
const EntityManager = dataMan.managers.reportingEntity;

class WorkDataStore {
  viewModeConfig: ViewModeConfig = { ...defaultConfig };

  companyItem: Investment | null = null; // = INVESTMENT for now

  portfolioItem: Portfolio | null = null;

  fundManagerItem: FMCompany | null = null;

  entityItem: Company | null = null;

  constructor() {
    when(
      () => userStore.isFM && userStore.readyToUse,
      () => {
        PortfoliosMgr.init();
        EntityManager.init();
        InvestmentsMgr.init();
      },
    );

    reaction(
      () => InvestmentsMgr.store.data,
      () => {
        if (!InvestmentsMgr.dataReady || !this.viewModeConfig.companyId) return;

        this.setCompanyData(this.viewModeConfig.companyId);
      },
    );

    reaction(
      () => PortfoliosMgr.store.data,
      () => {
        if (!PortfoliosMgr.dataReady || !this.viewModeConfig.portfolioId)
          return;

        this.setPortfolioData(this.viewModeConfig.portfolioId);
      },
    );

    reaction(
      () => EntityManager.store.data,
      () => {
        if (!EntityManager.dataReady || !this.viewModeConfig.entityId) return;

        this.setEntityData(this.viewModeConfig.entityId);
      },
    );

    this.setViewModeConfig(path2ViewModeConfig(window.location.hash));
  }

  setViewModeConfig = (config: ViewModeConfig): void => {
    if (
      config.companyId !== this.viewModeConfig.companyId ||
      config.portfolioId !== this.viewModeConfig.portfolioId ||
      config.fundManagerId !== this.viewModeConfig.fundManagerId ||
      config.entityId !== this.viewModeConfig.entityId
    ) {
      if (
        !config.portfolioId &&
        !config.companyId &&
        !config.fundManagerId &&
        !config.entityId
      ) {
        this.viewModeConfig = { ...defaultConfig };
        this.companyItem = null;
        this.portfolioItem = null;
        this.fundManagerItem = null;
        this.entityItem = null;
        return;
      }
      this.setPortfolio(config.portfolioId as number);
      this.setCompany(config.companyId as number);
      this.setFundManager(config.fundManagerId as number);
      this.setEntity(config.entityId as number);
    }
  };

  setCompanyData = (companyId: Investment['id']): void => {
    this.companyItem = InvestmentsMgr.store.data?.find(
      (item) => item.id === companyId,
    ) as Investment;
  };

  setCompany = (companyId: Investment['id']): void => {
    if (companyId === this.viewModeConfig.companyId) return;

    this.viewModeConfig.companyId = companyId;

    when(
      () => InvestmentsMgr.dataReady,
      () => {
        this.setCompanyData(companyId);
      },
    );
  };

  setEntityData = (entityId: Company['id']): void => {
    this.entityItem = EntityManager.store.data?.find(
      (item: Company) => item.id === entityId,
    ) as Company;
  };

  setEntity = (entityId: Company['id']): void => {
    if (entityId === this.viewModeConfig.entityId) return;

    this.viewModeConfig.entityId = entityId;

    when(
      () => EntityManager.dataReady,
      () => {
        this.setEntityData(entityId);
      },
    );
  };

  setPortfolioData = (portfolioId: Portfolio['id']): void => {
    this.portfolioItem = PortfoliosMgr.store.data?.find(
      (item) => item.id === portfolioId,
    ) as Portfolio;
  };

  setPortfolio = (portfolioId: Portfolio['id']): void => {
    if (portfolioId === this.viewModeConfig.portfolioId) return;

    this.viewModeConfig.portfolioId = portfolioId;

    when(
      () => PortfoliosMgr.dataReady,
      () => {
        this.setPortfolioData(portfolioId);
      },
    );
  };

  setFundManagerData = (fundManagerId: FMCompany['id']): void => {
    this.fundManagerItem = FMsMgr.store.data?.find(
      (item) => item.id === fundManagerId,
    ) as FMCompany;
  };

  setFundManager = (fundManagerId: FMCompany['id']): void => {
    if (fundManagerId === this.viewModeConfig.fundManagerId) return;

    this.viewModeConfig.fundManagerId = fundManagerId;

    when(
      () => FMsMgr.dataReady,
      () => {
        this.setFundManagerData(fundManagerId);
      },
    );
  };

  get viewMode(): ViewMode {
    if (this.viewModeConfig.companyId) return 'INVESTMENT';
    if (this.viewModeConfig.entityId) return 'ENTITY';
    if (this.viewModeConfig.portfolioId) return 'PORTFOLIO';
    if (this.viewModeConfig.fundManagerId) return 'FUNDMANAGER';
    return 'GLOBAL';
  }

  get isCompanyViewMode(): boolean {
    return this.viewMode === 'INVESTMENT';
  }

  get company(): Investment | null {
    return this.companyItem;
  }

  get entity(): Company | null {
    return this.entityItem;
  }

  get portfolio(): Portfolio | null {
    return this.portfolioItem;
  }

  get fundManager(): FMCompany | null {
    return this.fundManagerItem;
  }

  get companyId(): Investment['id'] {
    return this.viewModeConfig.companyId as Company['id'];
  }

  get entityId(): Company['id'] {
    return this.viewModeConfig.entityId as Company['id'];
  }

  get portfolioId(): Portfolio['id'] {
    return this.viewModeConfig.portfolioId as Portfolio['id'];
  }

  get investmentParent(): null | Company {
    if (!this.viewModeConfig.companyId) return null;

    if (!EntityManager.dataReady) return null;

    return (
      EntityManager.store.data?.find((item) =>
        item.investmentsInfo.find(
          (investmentItem) =>
            investmentItem.id === this.viewModeConfig.companyId,
        ),
      ) ?? null
    );
  }
}
decorate(WorkDataStore, {
  viewModeConfig: observable,
  companyItem: observable,
  entityItem: observable,
  portfolioItem: observable,
  fundManagerItem: observable,
  setViewModeConfig: action,
  setCompany: action,
  setEntity: action,
  setPortfolio: action,
  setFundManager: action,
  viewMode: computed,
  company: computed,
  entity: computed,
  portfolio: computed,
  fundManager: computed,
  isCompanyViewMode: computed,
  setCompanyData: action,
  setEntityData: action,
  setFundManagerData: action,
  companyId: computed,
  entityId: computed,
  portfolioId: computed,
  investmentParent: computed,
});

export const workDataStore = new WorkDataStore();
