import React, { FC, useCallback } from 'react';
import {
  VoidFn,
  AerisLibraryViewer,
  DocumentPermissionsWithViewersType,
} from 'types';
import { Typography } from 'antd';
import { uiText } from 'constants/uiText';
import { MODAL_WIDTH } from 'constants/ui';
import { notifyUser, showAPIError } from 'tools';
import { ModalWithForm } from 'modals';
import { DocumentPermissionsForm } from 'forms/LibraryForms/ViewerAccess';
import { cdfiStore, userStore } from 'store';
import { library as libraryManager } from 'dataManagement';
import {useLocation} from "react-router-dom";

const { Paragraph } = Typography;
const { cdfiId } = cdfiStore;

// const FORM_ID = 'documentUploadForm';
const FORM_ID = 'documentViewerAccess';

type DocumentUploadModalProps = {
  visible: boolean;
  onCancel: VoidFn;
  onFinish: VoidFn;
  viewers: AerisLibraryViewer[];
};

export const DocumentPermissionsModal: FC<DocumentUploadModalProps> = ({
  visible,
  onCancel,
  onFinish,
  viewers,
}) => {
  const location = useLocation();
  const {isAerisAdmin} = userStore;
  const getCdfiId = isAerisAdmin ? location.pathname.split('/')[3] : location.pathname.split('/')[2];

  const onFinishPermissions = useCallback(
    (values: DocumentPermissionsWithViewersType) => {
      libraryManager
        .putLibraryDocumentsAccess(
          +getCdfiId,
          values.viewers.value,
          values.documentsList,
          values.selectAll
        )
        .then(() => {
          notifyUser.ok(uiText('library', 'documentsPermissionsOk'));
          onFinish();
        })
        .catch(showAPIError(uiText('library', 'documentsPermissionsError')));
    },
    [onFinish],
  );

  const handleHide = useCallback(() => {
    onCancel();
  }, [onCancel]);

  return (
    <ModalWithForm
      formId={FORM_ID}
      title="Manage Viewer Access"
      visible={visible}
      onCancel={handleHide}
      actionButtonText="Save"
      forceRender={false}
      width={MODAL_WIDTH.SMALL}
      showCloseButton={false}
    >
      <Paragraph>
        Please select a viewer to allow access to selected files
      </Paragraph>
      <DocumentPermissionsForm
        formId={FORM_ID}
        onFinish={onFinishPermissions}
        viewers={viewers}
      />
    </ModalWithForm>
  );
};
