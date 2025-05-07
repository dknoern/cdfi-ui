import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  SupportRequestSubject,
  VoidFn,
  SupportRequestSubjectData,
} from 'types';
import { ModalWithForm } from 'modals';
import {
  SupportRequestSubjectsEditForm,
  SupportRequestSubjectsFormData as SupportRequestSubjectsFormData,
} from './SupportRequestSubjectsEditForm';
import { MODAL_WIDTH } from 'constants/ui';
import { Divider, Form } from 'antd';
import {
  createSupportRequestSubject,
  deleteSupportRequestSubject,
  updateSupportRequestSubject,
} from './tools';
import { Table } from 'antd';
import { makeSupportRequestSubjectsColumns } from './constants';
import { useSupportRequestSubjects } from 'dataManagement/usePlatformSettings';
import tableStyles from 'components/ManageTableStyles.module.scss';
import { SupportRequestSubjectsEditValueModal } from './SupportRequestSubjectsEditValueModal';

type SupportRequestSubjectsEditModalProps = {
  visible: boolean;
  onClose: VoidFn;
  onFinish: VoidFn;
  formId: string;
};

function addIdAsKey(
  data: SupportRequestSubject[],
): SupportRequestSubjectData[] {
  return data.map((subject) => ({ key: subject.id, ...subject }));
}

export const SupportRequestSubjectsEditModal: FC<
  SupportRequestSubjectsEditModalProps
> = ({ visible, onClose, onFinish, formId }) => {
  const [form] = Form.useForm();

  const { data } = useSupportRequestSubjects();

  const supportRequestSubjects = addIdAsKey(data ? data.subjects : []);

  const [supportRequestSubjectEditId, setSupportRequestSubjectEditId] =
    useState<any>();
  const [supportRequestSubjectDeleteId, setSupportRequestSubjectDeleteId] =
    useState<number>();
  const [finishedButtonClicked, setFinishedButtonClicked] =
    useState<boolean>(false);
  const [subjectFieldValue, setSubjectFieldValue] = useState<any>();

  const [
    showSupportRequestSubjectEditValueModal,
    setShowSupportRequestSubjectEditValueModal,
  ] = useState<boolean>(false);

  const onSubmit = useCallback(
    (values: SupportRequestSubjectsFormData) => {
      if (finishedButtonClicked) {
        onFinish();
      } else {
        const proceedSave = (): ReturnType<
          typeof createSupportRequestSubject
        > => createSupportRequestSubject(values);

        proceedSave().then(() => {
          onFinish();
        });
      }
      setSupportRequestSubjectEditId(undefined);
      setSupportRequestSubjectDeleteId(undefined);
      setFinishedButtonClicked(false);
      form.resetFields();
    },
    [onFinish],
  );

  const columns = makeSupportRequestSubjectsColumns(
    setSupportRequestSubjectDeleteId,
    setSupportRequestSubjectEditId,
    setSubjectFieldValue,
  );

  useEffect(() => {
    if (supportRequestSubjectDeleteId) {
      const subjectToArchive = supportRequestSubjects.find(
        (sub) => sub.id === supportRequestSubjectDeleteId,
      );
      const subject = subjectToArchive?.subject
        ? subjectToArchive?.subject
        : '';
      const payload = { subject: subject, isEnabled: false };

      const proceedDelete = (): ReturnType<
        typeof updateSupportRequestSubject
      > => updateSupportRequestSubject(supportRequestSubjectDeleteId, payload);

      proceedDelete().then(() => {
        setSupportRequestSubjectDeleteId(undefined);
        onFinish();
      });
    }
    if (supportRequestSubjectEditId) {
      setShowSupportRequestSubjectEditValueModal(true);
    }
  }, [
    supportRequestSubjectDeleteId,
    supportRequestSubjectEditId,
    subjectFieldValue,
  ]);

  const onFinishedClick = () => {
    setSupportRequestSubjectDeleteId(undefined);
    setSupportRequestSubjectEditId(undefined);
    setFinishedButtonClicked(false);
    setSubjectFieldValue(undefined);
    onClose();
  };

  const onCloseEditValue = () => {
    setSupportRequestSubjectDeleteId(undefined);
    setSupportRequestSubjectEditId(undefined);
    setFinishedButtonClicked(false);
    setSubjectFieldValue(undefined);
    setShowSupportRequestSubjectEditValueModal(false);
  };

  const onFinishEditValue = () => {
    onCloseEditValue();
  };

  return (
    <ModalWithForm
      formId={formId}
      title={'Manage Support Request Subjects'}
      visible={visible}
      onCancel={onClose}
      actionButtonText={'Finished'}
      width={MODAL_WIDTH.MEDIUM}
      hideActionButton={true}
      secondaryActionButton={true}
      secondaryActionButtonVisible={true}
      secondaryActionButtonText={'Finished'}
      onSecondaryActionButtonClick={onFinishedClick}
    >
      <Table
        rowClassName={(record) =>
          !record.isEnabled ? `${tableStyles.red}` : ''
        }
        dataSource={supportRequestSubjects}
        columns={columns}
        pagination={{ showSizeChanger: true }}
        size={'small'}
        showSorterTooltip
        className={tableStyles.table}
      ></Table>
      <Divider style={{ border: 'unset' }}></Divider>
      <SupportRequestSubjectsEditForm
        formId={formId}
        onFinish={onSubmit}
        form={form}
        setFinishedButtonClicked={setFinishedButtonClicked}
      />
      <SupportRequestSubjectsEditValueModal
        visible={showSupportRequestSubjectEditValueModal}
        onClose={onCloseEditValue}
        onFinish={onFinishEditValue}
        formId={'SUPPORT_REQUEST_EDIT_VALUE_FORM'}
        subjectFieldValue={subjectFieldValue}
        setSubjectFieldValue={setSubjectFieldValue}
        supportRequestEditId={supportRequestSubjectEditId}
      />
    </ModalWithForm>
  );
};
