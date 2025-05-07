import React, { FC, useCallback } from 'react';
import { VoidFn } from 'types';
import { uiText } from 'constants/uiText';
import { ModalWithForm } from 'modals';
import { notifyUser } from 'tools';
import { showAPIError } from 'tools/APITools';
import { library as libraryManager } from 'dataManagement';
import { AffirmAsCurrentForm, InitialsFormData } from './AffirmAsCurrentForm';
import { cdfiStore } from 'store';

type AffirmAsCurrentModalProps = {
  visible: boolean;
  onClose: VoidFn;
  onFinish: VoidFn;
  documentTypeId: number;
  reviewId: number;
};

export const AffirmAsCurrentModal: FC<AffirmAsCurrentModalProps> = ({
  visible,
  onClose,
  onFinish,
  documentTypeId,
  reviewId,
}) => {
  const { cdfiId } = cdfiStore;

  const onAffirm = useCallback(
    (values: InitialsFormData) => {
      let valuesToSubmit = {
        initials: values.initials,
        documentTypeId: documentTypeId,
      };
      libraryManager
        .affirmAsCurrent(cdfiId, reviewId, valuesToSubmit)
        .then(() => {
          notifyUser.ok(uiText('library', 'affirmAsCurrentOk'));
          onFinish();
        })
        .catch(showAPIError(uiText('library', 'affirmAsCurrentError')))
        .finally(() => {
          onClose();
        });
    },
    [onFinish],
  );

  const formId = 'AFFIRM_AS_CURRENT';

  return (
    <ModalWithForm
      formId={formId}
      title={'Affirm as Current'}
      visible={visible}
      onCancel={onClose}
      forceRender={false}
      actionButtonText='Affirm'
    >
      <AffirmAsCurrentForm onFinish={onAffirm} formId={formId} />
    </ModalWithForm>
  );
};
