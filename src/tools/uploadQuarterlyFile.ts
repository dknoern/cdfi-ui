import { FileUploadFinishHandler } from 'types';
import { FileUploadFormData } from 'types/library';
import { FolderView } from 'types/libraryViews';
import { uiText } from 'constants/uiText';
import { ModalTypes } from 'constants/ui';
import { library } from 'dataManagement';
import { notifyUser, showAPIError } from 'tools';

export type UploadQuarterlyFileConfig = {
  values: FileUploadFormData;
  companyId: FolderView['id'];
  onUploadFinish: FileUploadFinishHandler;
  documentTypeId: string | number;
};

export const uploadQuarterlyFile = (
  config: UploadQuarterlyFileConfig,
): Promise<void> => {
  const { values, companyId, documentTypeId, onUploadFinish } =
    config;
  const { file: formFile, fiscalYear, fiscalQuarter } = values;
  const formData = new FormData();
  const formDataValues: Record<string, string | number> = {
    companyId,
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
