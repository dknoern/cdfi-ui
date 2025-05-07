import React, { FC, useCallback, useState } from 'react';
import { VoidFn } from 'types';
import { ModalWithForm } from 'modals';
import { MODAL_WIDTH } from 'constants/ui';
import { Form } from 'antd';
import { peerGroupStore } from 'store';
import { PeerGroupsForm } from './PeerGroupsForm';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import styles from '../PeerGroupsPage.module.scss';
import { notifyUser } from 'tools';

type PeerGroupEditModalProps = {
  visible: boolean;
  onClose: VoidFn;
  onFinish: VoidFn;
  formId: string;
};

export const PeerGroupsEditModal: FC<PeerGroupEditModalProps> = ({
  visible,
  onClose,
  onFinish,
  formId,
}) => {
  const [form] = Form.useForm();
  const { getUpdatePeerGroups } = peerGroupStore;
  const [formChanged, setFormChanged] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [disabledCancelButton, setDisabledCancelButton] = useState(false);

  const handleModalClose = () => {
    if (form.isFieldsTouched()) {
      setIsConfirmModalVisible(true);
    } else {
      onClose();
      setIsConfirmModalVisible(false);
    }
  };

  const handleCloseBothModals = () => {
    onClose();
    setIsConfirmModalVisible(false);
  };

  const handleConfirmClose = () => {
    setIsConfirmModalVisible(false);
  };

  const onFormValuesChange = () => {
    if (!formChanged) setFormChanged(true);
  };

  const onSubmitPeerGroup = useCallback(
    (formValues: any) => {
      setDisabledCancelButton(true);
      const peerGroupList = Object.entries(formValues)
        .filter(([key, _]) => key.startsWith('peerGroup_'))
        .map(([key, active]) => ({
          id: key.split('_')[1],
          active,
        }));

      const payload = { peerGroupList };
      getUpdatePeerGroups(payload)
        .then(() => {
          onFinish();
          handleCloseBothModals();
          setDisabledCancelButton(false);
        })
        .catch(() => {
          notifyUser.error('peerGroups', 'updateError');
          setDisabledCancelButton(false);
        });
    },
    [onFinish],
  );

  return (
    <>
      <ModalWithForm
        formId={formId}
        title="Manage Peer Groups"
        visible={visible}
        onCancel={handleModalClose}
        actionButtonText="Save"
        cancelButtonText="Close"
        maskClosable={false}
        width={MODAL_WIDTH.SMALL}
        className={`${styles.peerGroupsModal} ${
          disabledCancelButton ? styles.disableFooterButtons : ''
        }`}
        showCloseButton={!disabledCancelButton}
      >
        <PeerGroupsForm
          formId={formId}
          onFinish={onSubmitPeerGroup}
          form={form}
          onValuesChange={onFormValuesChange}
        />
      </ModalWithForm>
      <ConfirmModal
        visible={isConfirmModalVisible}
        onClose={handleConfirmClose}
        onClick={handleCloseBothModals}
        text="Do you really want to cancel? All data entered will be lost."
        buttonText="Yes"
        closeConfirmationButtonText="No"
      />
    </>
  );
};
