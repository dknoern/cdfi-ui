import { uiText } from 'constants/uiText';
import { notifyUser, showAPIError } from 'tools';
import { dataMan, ManagerName } from 'dataManagement/managers';
import {
  CustomDataReportsManager,
  CustomDataReportsSubscriberManager,
} from 'dataManagement/managers/CustomDataReportsManager';
import { CustomDataReportFormData } from './CustomDataReportsAdmin/CustomDataReportCreateForm';

const mgr = dataMan.manager(
  ManagerName.customDataReports,
) as CustomDataReportsManager;

interface SaveFn {
  (data: CustomDataReportFormData): Promise<void>;
}

export const createCustomDataReport: SaveFn = (data) => {
  const proceedSave = (): ReturnType<typeof mgr.createCustomDataReport> =>
    mgr.createCustomDataReport(data);

  return proceedSave()
    .then(() => {
      notifyUser.ok(uiText('customDataReport', 'createOk'));
      mgr.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('customDataReport', 'createError');
      showAPIError(message)(error);
    });
};

interface DeleteFn {
  (customDataReportId: number): Promise<void>;
}

export const deleteCustomDataReport: DeleteFn = (customDataReportId) => {
  const proceedDelete = (): ReturnType<typeof mgr.deleteCustomDataReport> =>
    mgr.deleteCustomDataReport(customDataReportId);

  return proceedDelete()
    .then(() => {
      notifyUser.ok(uiText('customDataReport', 'deleteOk'));
      mgr.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('customDataReport', 'deleteError');
      showAPIError(message)(error);
    });
};

interface DownloadFn {
  (customDataReportId: number): Promise<void>;
}

export const downloadCustomDataReport: DownloadFn = (customDataReportId) => {
  const proceedDownload = (): ReturnType<typeof mgr.downloadCustomDataReport> =>
    mgr.downloadCustomDataReport(customDataReportId);

  return proceedDownload()
    .then(() => {
      mgr.reload();
    })
    .catch((error) => {});
};

interface UpdateFn {
  (
    customDataReportId: number,
    data?: CustomDataReportFormData | undefined,
  ): Promise<void>;
}

export const updateCustomDataReport: UpdateFn = (customDataReportId, data) => {
  const proceedUpdate = (): ReturnType<typeof mgr.updateCustomDataReport> =>
    mgr.updateCustomDataReport(customDataReportId, data);

  return proceedUpdate()
    .then(() => {
      notifyUser.ok(uiText('customDataReport', 'updateOk'));
      mgr.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('customDataReport', 'updateError');
      showAPIError(message)(error);
    });
};

interface UploadFn {
  (customDataReportId: number, data: any): Promise<void>;
}

export const uploadCustomDataReport: UploadFn = (customDataReportId, data) => {
  const formData = new FormData();

  const formDataValues: Record<string, string | number> = {
    customDataReportId,
  };

  Object.keys(formDataValues).forEach((key) =>
    formData.append(key, formDataValues[key] as string),
  );

  formData.append('document', data[0].originFileObj as File, data[0].name);

  const proceedUpload = (): ReturnType<typeof mgr.uploadCustomDataReport> =>
    mgr.uploadCustomDataReport(customDataReportId, formData);

  return proceedUpload()
    .then(() => {
      notifyUser.ok(uiText('customDataReport', 'uploadOk'));
      mgr.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('customDataReport', 'uploadError');
      showAPIError(message)(error);
    });
};

interface SendToClientFn {
  (customDataReportId: number): Promise<void>;
}

export const sendCustomDataReportToClient: SendToClientFn = (
  customDataReportId,
) => {
  const proceedSendToClient = (): ReturnType<
    typeof mgr.sendCustomDataReportToClient
  > => mgr.sendCustomDataReportToClient(customDataReportId);

  return proceedSendToClient()
    .then(() => {
      notifyUser.ok(uiText('customDataReport', 'sendToClientOk'));
      mgr.reload();
    })
    .catch((error) => {
      const message = error.data.message
        ? error.data.message
        : uiText('customDataReport', 'sendToClientError');
      showAPIError(message)(error);
    });
};

const mgrSubscriber = dataMan.manager(
  ManagerName.customDataReportsSubscriber,
) as CustomDataReportsSubscriberManager;

export const downloadCustomDataReportSubscriber: DownloadFn = (
  customDataReportId,
) => {
  const proceedDownload = (): ReturnType<typeof mgrSubscriber.downloadCustomDataReport> =>
    mgrSubscriber.downloadCustomDataReport(customDataReportId);

  return proceedDownload()
    .then(() => {
      mgrSubscriber.reload();
    })
    .catch((error) => {});
};

interface DownloadZipFn {
  (customDataReportIds: number[]): Promise<void>;
}

export const downloadCustomDataReportsSubscriber: DownloadZipFn = (
  customDataReportIds,
) => {
  const proceedDownload = (): ReturnType<typeof mgrSubscriber.downloadCustomDataReports> =>
    mgrSubscriber.downloadCustomDataReports(customDataReportIds.toString());

  return proceedDownload()
    .then(() => {
      mgrSubscriber.reload();
    })
    .catch((error) => {});
};