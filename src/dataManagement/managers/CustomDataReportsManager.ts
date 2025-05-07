import { ManagerDefault } from './ManagerDefault';
import {
  createCustomDataReport,
  getCustomDataReports,
  deleteCustomDataReport,
  updateCustomDataReport,
  uploadCustomDataReport,
  downloadCustomDataReport,
  sendCustomDataReportToClient,
  getCustomDataReportsSubscriber,
  getCustomDataReportsCdfi,
  downloadCustomDataReports
} from '../operations/customDataReportsOperations';
import { uiText } from 'constants/uiText';
import { CustomDataReport } from 'types';
import { notifyUser } from 'tools/notifyUser';

export interface CustomDataManagerResults {
  external: CustomDataReport[];
  internal: CustomDataReport[];
}

export class CustomDataReportsManager extends ManagerDefault<CustomDataManagerResults> {
  reload = (): void => {
    this.proceedReload(
      () =>
        Promise.all([
          getCustomDataReports('EXTERNAL'),
          getCustomDataReports('INTERNAL'),
        ]).then(
          (values): CustomDataManagerResults => ({
            external: values[0],
            internal: values[1],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('customDataReport', 'loadError'));
      },
    );
  };

  createCustomDataReport: typeof createCustomDataReport = (data) => {
    return createCustomDataReport(data);
  };

  deleteCustomDataReport: typeof deleteCustomDataReport = (
    customDataReportId,
  ) => {
    return deleteCustomDataReport(customDataReportId);
  };

  updateCustomDataReport: typeof updateCustomDataReport = (
    customDataReportId,
    data,
  ) => {
    return updateCustomDataReport(customDataReportId, data).then(() =>
      this.reload(),
    );
  };

  uploadCustomDataReport: typeof uploadCustomDataReport = (
    customDataReportId,
    data,
  ) => {
    return uploadCustomDataReport(customDataReportId, data).then(() =>
      this.reload(),
    );
  };

  downloadCustomDataReport: typeof downloadCustomDataReport = (
    customDataReportId,
  ) => {
    return downloadCustomDataReport(customDataReportId);
  };

  sendCustomDataReportToClient: typeof sendCustomDataReportToClient = (
    customDataReportId,
  ) => {
    return sendCustomDataReportToClient(customDataReportId);
  };
}

export interface CustomDataReportsManagerResults {
  customDataReports: CustomDataReport[];
}

export class CustomDataReportsSubscriberManager extends ManagerDefault<CustomDataReportsManagerResults> {
  reload = (subscriberId?: number): void => {
    if (subscriberId) {
      this.getCustomDataReports(subscriberId);
    }
  };

  getCustomDataReports = (subscriberId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([getCustomDataReportsSubscriber(subscriberId)]).then(
          (values): CustomDataReportsManagerResults => ({
            customDataReports: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('customDataReport', 'loadError'));
      },
    );
  };

  downloadCustomDataReport: typeof downloadCustomDataReport = (
    customDataReportId,
  ) => {
    return downloadCustomDataReport(customDataReportId);
  };

  downloadCustomDataReports: typeof downloadCustomDataReports = (
    customDataReportIds,
  ) => {
    return downloadCustomDataReports(customDataReportIds);
  };
}


export class CustomDataReportsCdfiManager extends ManagerDefault<CustomDataReportsManagerResults> {
  reload = (cdfiId?: number): void => {
    if (cdfiId) {
      this.getCustomDataReports(cdfiId);
    }
  };

  getCustomDataReports = (cdfiId?: number): void => {
    this.proceedReload(
      () =>
        Promise.all([getCustomDataReportsCdfi(cdfiId)]).then(
          (values): CustomDataReportsManagerResults => ({
            customDataReports: values[0],
          }),
        ),
      (e) => {
        notifyUser.error(uiText('customDataReport', 'loadError'));
      },
    );
  };

  downloadCustomDataReport: typeof downloadCustomDataReport = (
    customDataReportId,
  ) => {
    return downloadCustomDataReport(customDataReportId);
  };
}
