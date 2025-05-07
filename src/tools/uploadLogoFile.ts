import { UploadChangeParam } from 'antd/lib/upload';
import { uiText } from 'constants/uiText';
import { library } from 'dataManagement';
import { notifyUser, showAPIError } from 'tools';

export const LOGO_DOCUMENT_TYPE_ID = 52

export const uploadLogoFile = (
  companyId: string | undefined,
  values: UploadChangeParam,
): Promise<void> => {
  const { fileList } = values;
  const formData = new FormData();
  const formDataValues: Record<string, string | number | undefined> = {
    companyId,
    documentTypeId: LOGO_DOCUMENT_TYPE_ID,
  };

  Object.keys(formDataValues).forEach((key) =>
    formData.append(key, formDataValues[key] as string),
  );

  formData.append(
    'document',
    fileList[0].originFileObj as File,
    fileList[0].name,
  );

  return library
    .uploadFile(formData)
    .then(() => {
      notifyUser.ok(uiText('directEntryUpload', 'uploadOk'));
    })
    .catch((e) => {
      showAPIError(uiText('directEntryUpload', 'uploadError'))(e);
    });
};
