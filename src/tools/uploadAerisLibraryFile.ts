import { FileUploadFinishHandler } from 'types';
import {
  FileUploadFormData,
  FileUploadFormDataDocumentType,
} from 'types/library';
import { FolderView } from 'types/libraryViews';
import { uiText } from 'constants/uiText';
import { ModalTypes } from 'constants/ui';
import { library } from 'dataManagement';
import { notifyUser, showAPIError } from 'tools';

export type UploadAerisFileConfig = {
  values: FileUploadFormData;
  folderId: FolderView['id'];
  companyId: FolderView['id'];
  onUploadFinish: FileUploadFinishHandler;
  documentTypeId: string | number;
};

export const uploadAerisLibraryFile = (
  config: UploadAerisFileConfig,
): Promise<void> => {
  const { values, companyId, folderId, documentTypeId, onUploadFinish } =
    config;
  const { file: formFile, fiscalYear, fiscalQuarter } = values;
  const formData = new FormData();
  const formDataValues: Record<string, string | number> = {
    companyId,
    folderId,
    fiscalQuarter: fiscalQuarter ?? null,
    fiscalYear: fiscalYear ?? null,
    documentTypeId,
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

export type UploadAerisFileConfigDocumentType = {
  values: FileUploadFormDataDocumentType;
  folderId: FolderView['id'];
  companyId: FolderView['id'];
  onUploadFinish: FileUploadFinishHandler;
  documentTypeId: string | number;
};

export const uploadAerisLibraryFileDocumentType = (
  config: UploadAerisFileConfigDocumentType,
): Promise<void> => {
  const { values, companyId, folderId, onUploadFinish } = config;
  const {
    file: formFile,
    fiscalYear,
    fiscalQuarter,
    documentTypeId: formDocumentTypeId,
  } = values;
  const formData = new FormData();
  const formDataValues: Record<string, string | number> = {
    companyId,
    folderId,
    fiscalQuarter: fiscalQuarter ?? null,
    fiscalYear: fiscalYear ?? null,
    documentTypeId: formDocumentTypeId,
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
