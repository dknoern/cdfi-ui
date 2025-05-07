import { observable, action, decorate, computed, when } from 'mobx';
import { apiProcessor } from 'tools';
import { APIError } from 'types/apiError';
import { userStore } from './userStore';

type FeatureFlag = {
  name: string;
  value: string;
};

interface FeatureFlagResults {
  featureFlags: FeatureFlag[];
}

enum FeatureFlagTypes {
  CDFI_DELETE_ENABLED = 'cdfi.delete.enabled',
  SUBSCRIBER_DELETE_ENABLED = 'subscriber.delete.enabled',
}

class ConfigStore {
  featureFlags: FeatureFlagResults | null = null;
  cdfiDeleteEnabled: FeatureFlag | undefined = undefined;
  subscriberDeleteEnabled: FeatureFlag | undefined = undefined;

  constructor() {
    when(
      () => userStore.readyToUse,
      () => {
        this.setFeatureFlags();
      },
    );
  }

  setFeatureFlags = (): void => {
    this.proceedReload(this.getConfig, (e?: APIError) => void {});
  };

  getConfig: typeof getConfig = () => {
    return getConfig();
  };

  proceedReload = (
    getterFn: () => Promise<FeatureFlagResults>,
    errorCallback: (e?: APIError) => void,
  ): void => {
    getterFn()
      .then((data) => {
        this.featureFlags = data;
        this.cdfiDeleteEnabled = data.featureFlags.find((flag) => flag.name === FeatureFlagTypes.CDFI_DELETE_ENABLED);
        this.subscriberDeleteEnabled = data.featureFlags.find((flag) => flag.name === FeatureFlagTypes.SUBSCRIBER_DELETE_ENABLED);
      })
      .catch((e: APIError) => {
        errorCallback(e);
      });
  };

  get viewFeatureFlags(): FeatureFlagResults | null {
    return this.featureFlags;
  }

  get cdfiDeleteEnabledValue(): boolean {
    return this.cdfiDeleteEnabled?.value === 'true';
  }

  get subscriberDeleteEnabledValue(): boolean {
    return this.subscriberDeleteEnabled?.value === 'true';
  }
}

decorate(ConfigStore, {
  featureFlags: observable,
  cdfiDeleteEnabled: observable,
  subscriberDeleteEnabled: observable,
  setFeatureFlags: action,
  viewFeatureFlags: computed,
  cdfiDeleteEnabledValue: computed,
  subscriberDeleteEnabledValue: computed,
});

const getConfig = (): Promise<FeatureFlagResults> => {
  return apiProcessor.get('config');
};

export const configStore = new ConfigStore();
