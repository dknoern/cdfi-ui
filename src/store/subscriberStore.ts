import { observable, action, decorate, computed, when, reaction } from 'mobx';
import { ViewModeConfig, ViewMode, Subscriber } from 'types';
import { path2ViewModeConfig } from 'tools';
import { dataMan } from 'dataManagement/managers';
import { userStore } from './userStore';
import { TablePaginationConfig } from 'antd/lib/table/interface';

const defaultConfig = {
  entityId: null,
  companyId: null,
  portfolioId: null,
  fundManagerId: null,
  cdfiId: null,
  subscriberId: null,
  isConfirmModal: false,
  subscribers: [],
  subscriptions: null,
  allCdfisRatingReports: [],
  deleteSubscriberId: null,
  pagination: {
    current: 0,
    pageSize: 25,
  },
  loading: false,
  sorter: {},
};

const SelectedSubscriberManager = dataMan.managers.selectedSubscriber;

class SubscriberStore {
  viewModeConfig: ViewModeConfig = { ...defaultConfig };
  isConfirmModal: boolean = defaultConfig.isConfirmModal;
  subscribers: Subscriber[] | null = defaultConfig.subscribers;
  subscriptions: any | null = defaultConfig.subscriptions;
  allCdfisRatingReports: any | undefined = defaultConfig.allCdfisRatingReports;
  deleteSubscriberId: number | null = defaultConfig.deleteSubscriberId;
  subscriberItem: Subscriber | null = null;
  pagination: TablePaginationConfig = defaultConfig.pagination;
  loading: any = defaultConfig.loading;
  sorter: {} = defaultConfig.sorter;

  constructor() {
    when(
      () => userStore.readyToUse,
      () => {
        SelectedSubscriberManager.init();
      },
    );

    reaction(
      () => SelectedSubscriberManager.store.data,
      () => {
        if (!SelectedSubscriberManager.dataReady || !this.viewModeConfig.cdfiId)
          return;

        this.setSelectedSubscriber(this.viewModeConfig.cdfiId);
      },
    );

    this.setViewModeConfig(path2ViewModeConfig(window.location.hash));
  }

  setIsConfirmModal = (value: boolean): void => {
    this.isConfirmModal = value;
  };

  setAllCdfisRatingReports = (values: any | undefined): void => {
    this.allCdfisRatingReports = values;
  };

  setSubscribers = (data: Subscriber[] | null): void => {
    this.subscribers = data;
  };

  setSubscriptions = (data: any | null): void => {
    this.subscriptions = data;
  };

  setDeleteSubscriberId = (value: number): void => {
    this.deleteSubscriberId = value;
  };

  setViewModeConfig = (config: ViewModeConfig): void => {
    if (config.subscriberId !== this.viewModeConfig.subscriberId) {
      if (!config.subscriberId) {
        this.viewModeConfig = { ...defaultConfig };
        this.subscriberItem = null;
        return;
      }
      this.setSubscriberId(config.subscriberId as number);
    }
  };

  setSelectedSubscriber = (subscriberId: Subscriber['id'] | null): void => {
    this.subscriberItem = SelectedSubscriberManager.store.data?.find(
      (item: { id: number }) => item.id === subscriberId,
    ) as Subscriber;
  };

  setSubscriberId = (subscriberId: Subscriber['id'] | null): void => {
    if (subscriberId === this.viewModeConfig.subscriberId) return;

    this.viewModeConfig.subscriberId = subscriberId;

    when(
      () => SelectedSubscriberManager.dataReady,
      () => {
        this.setSelectedSubscriber(subscriberId);
      },
    );
  };

  setSubscriberDetails = (subscriber: Subscriber): void => {
    this.subscriberItem = subscriber as Subscriber;
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

  setSorter = (data: {}): void => {
    this.sorter = data;
  };

  get viewMode(): ViewMode {
    if (this.viewModeConfig.companyId) return 'INVESTMENT';
    if (this.viewModeConfig.entityId) return 'ENTITY';
    if (this.viewModeConfig.portfolioId) return 'PORTFOLIO';
    if (this.viewModeConfig.fundManagerId) return 'FUNDMANAGER';
    if (this.viewModeConfig.cdfiId) return 'CDFI';
    if (this.viewModeConfig.subscriberId) return 'SUBSCRIBER';
    return 'GLOBAL';
  }

  get isSubscriberViewMode(): boolean {
    return this.viewMode === 'SUBSCRIBER';
  }

  get subscriber(): Subscriber | null {
    return this.subscriberItem;
  }

  get subscriberId(): Subscriber['id'] {
    return this.viewModeConfig.subscriberId as Subscriber['id'];
  }
}

decorate(SubscriberStore, {
  viewModeConfig: observable,
  subscriberItem: observable,
  isConfirmModal: observable,
  subscribers: observable,
  subscriptions: observable,
  deleteSubscriberId: observable,
  pagination: observable,
  loading: observable,
  sorter: observable,
  setViewModeConfig: action,
  setSelectedSubscriber: action,
  setSubscriberId: action,
  setIsConfirmModal: action,
  setSubscribers: action,
  setSubscriptions: action,
  setDeleteSubscriberId: action,
  setPagination: action,
  setLoading: action,
  viewMode: computed,
  isSubscriberViewMode: computed,
  subscriber: computed,
  subscriberId: computed,
});

export const subscriberStore = new SubscriberStore();
