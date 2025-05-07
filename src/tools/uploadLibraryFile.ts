import { FileUploadFinishHandler } from 'types';
import { FileUploadFormData } from 'types/library';
import { FolderView } from 'types/libraryViews';
import { uiText } from 'constants/uiText';
import { ModalTypes } from 'constants/ui';
import { library } from 'dataManagement';
import { notifyUser, showAPIError } from 'tools';

export type UploadFileConfig = {
  values: FileUploadFormData;
  folderId: FolderView['id'];
  companyId: FolderView['id'];
  onUploadFinish: FileUploadFinishHandler;
};

export const uploadLibraryFile = (config: UploadFileConfig): Promise<void> => {
  const { values, companyId, folderId, onUploadFinish } = config;
  const { file: formFile, fiscalYear, fiscalQuarter } = values;
  const formData = new FormData();
  const formDataValues: Record<string, string | number> = {
    pcId: companyId,
    folderId,
    quarter: fiscalQuarter ?? null,
    year: fiscalYear ?? null,
  };

  Object.keys(formDataValues).forEach((key) =>
    formData.append(key, formDataValues[key] as string),
  );
  formData.append(
    'document',
    formFile[0].originFileObj as File,
    formFile[0].name,
  );

  return library
    .uploadFile(formData)
    .then(() => {
      notifyUser.ok(uiText('directEntryUpload', 'uploadOk'));
      onUploadFinish(ModalTypes.Success);
    })
    .catch((e) => {
      showAPIError(uiText('directEntryUpload', 'uploadError'))(e);
      onUploadFinish(
        ModalTypes.Error,
        e?.data?.errorDocumentId,
        e?.data?.message,
      );
    });
};
