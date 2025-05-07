import React, { FC, useCallback, useState } from 'react';
import { VoidFn } from 'types';
import { ModalWithForm } from 'modals';
import {
  CustomDataReportCreateForm,
  CustomDataReportFormData,
} from './CustomDataReportCreateForm';
import { MODAL_WIDTH } from 'constants/ui';
import { Form } from 'antd';
import {
  createCustomDataReport,
  updateCustomDataReport,
  uploadCustomDataReport,
  sendCustomDataReportToClient,
} from '../tools';
import moment from 'moment';

type CustomDataReportEditModalProps = {
  visible: boolean;
  onClose: VoidFn;
  onFinish: VoidFn;
  formId: string;
  initialValues: CustomDataReportFormData | null | undefined;
  customDataReportId: number;
  isSendToClientEnabled?: boolean;
};

export const CustomDataReportEditModal: FC<CustomDataReportEditModalProps> = ({
  visible,
  onClose,
  onFinish,
  formId,
  initialValues,
  customDataReportId,
  isSendToClientEnabled,
}) => {
  const [form] = Form.useForm();

  const [hasFile, setHasFile] = useState(false);

  const onSubmitCustomDataReport = useCallback(
    (values: CustomDataReportFormData) => {
      const dateFormat = 'YYYY-MM-DD';
      let recipientsArr: string[] = [];

      if (typeof values.recipients === 'string') {
        recipientsArr = values.recipients.replace(' ', '').split(';');
      }

      const valuesToSubmit = {
        ...values,
        recipients: recipientsArr,
        dateGenerated: values.dateGenerated
          ? moment(values.dateGenerated).format(dateFormat)
          : '',
        dateRequested: values.dateRequested
          ? moment(values.dateRequested).format(dateFormat)
          : '',
        expirationDate: values.expirationDate
          ? moment(values.expirationDate).format(dateFormat)
          : '',
      };

      let proceedSave = isEditForm
        ? (): ReturnType<typeof createCustomDataReport> =>
            updateCustomDataReport(customDataReportId, valuesToSubmit)
        : (): ReturnType<typeof createCustomDataReport> =>
            createCustomDataReport(valuesToSubmit);

      if (!isEditForm) {
        form.resetFields();
      } else {
        form.setFieldsValue({
          file: undefined,
        });
      }

      proceedSave().then(() => {
        if (values.file) {
          const proceedUpload = (): ReturnType<typeof uploadCustomDataReport> =>
            uploadCustomDataReport(customDataReportId, values.file);
          proceedUpload().then();
        }
        onFinish();
      });

      setHasFile(false);
    },
    [onFinish],
  );

  const onSendToClient = useCallback(() => {
    const proceedSendToClient = (): ReturnType<
      typeof sendCustomDataReportToClient
    > => sendCustomDataReportToClient(customDataReportId);
    proceedSendToClient().then(onFinish);
  }, [onFinish]);

  const isEditForm = formId === 'EDIT_CUSTOM_DATA_REPORT' ? true : false;

  return (
    <ModalWithForm
      formId={formId}
      title={
        isEditForm
          ? 'Edit Custom Data Report Request'
          : 'Create Custom Data Report Request'
      }
      visible={visible}
      onCancel={onClose}
      actionButtonText={isEditForm ? 'Update Request' : 'Create Request'}
      secondaryActionButton={isEditForm}
      secondaryActionButtonVisible={isSendToClientEnabled}
      secondaryActionButtonText={'Send to Client'}
      onSecondaryActionButtonClick={onSendToClient}
      width={MODAL_WIDTH.MEDIUM}
    >
      <CustomDataReportCreateForm
        initialValues={initialValues ?? {}}
        formId={formId}
        onFinish={onSubmitCustomDataReport}
        form={form}
        filePresented={hasFile}
        setFilePresented={setHasFile}
      ></CustomDataReportCreateForm>
    </ModalWithForm>
  );
};
