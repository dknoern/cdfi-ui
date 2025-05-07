import { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { DataHookResult } from 'types';
import { dataMan, ManagerName } from './managers';
import {
  CustomDataManagerResults,
  CustomDataReportsManager,
  CustomDataReportsManagerResults,
  CustomDataReportsSubscriberManager,
  CustomDataReportsCdfiManager
} from './managers/CustomDataReportsManager';

type UseCustomDataReportsResults = DataHookResult & {
  data: CustomDataManagerResults;
};

const mgr = dataMan.manager(
  ManagerName.customDataReports,
) as CustomDataReportsManager;

export const useCustomDataReports = (): UseCustomDataReportsResults => {
  useEffect(() => {
    mgr.init();
  }, []);

  return useObserver(() => {
    return { ...(mgr.store as UseCustomDataReportsResults) };
  });
};

type UseCustomDataReportsSubscriberResults = DataHookResult & {
  data: CustomDataReportsManagerResults;
};

const mgrSubscriber = dataMan.manager(
  ManagerName.customDataReportsSubscriber,
) as CustomDataReportsSubscriberManager;

export const useCustomDataReportsSubscriber = (
  subscriberId: number,
): UseCustomDataReportsSubscriberResults => {
  useEffect(() => {
    if (subscriberId) {
      mgrSubscriber.init();
      mgrSubscriber.reload(subscriberId);
    }
  }, [subscriberId]);

  return useObserver(() => {
    return {
      ...(mgrSubscriber.store as UseCustomDataReportsSubscriberResults),
    };
  });
};

type UseCustomDataReportsCdfiResults = DataHookResult & {
  data: CustomDataReportsManagerResults;
};

const mgrCdfi = dataMan.manager(
  ManagerName.customDataReportsCdfi,
) as CustomDataReportsCdfiManager;

export const useCustomDataReportsCdfi = (
  cdfiId: number,
): UseCustomDataReportsCdfiResults => {
  useEffect(() => {
    if (cdfiId) {
      mgrCdfi.init();
      mgrCdfi.reload(cdfiId);
    }
  }, [cdfiId]);

  return useObserver(() => {
    return {
      ...(mgrCdfi.store as UseCustomDataReportsCdfiResults),
    };
  });
};
