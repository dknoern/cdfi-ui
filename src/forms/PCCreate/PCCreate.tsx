import React, { FC, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Company, VoidFn, Portfolio, LibraryFolderType } from 'types';
import { Nullable } from 'types/utility';
import { LibraryFolderViewState } from 'types/libraryViews';
import { uiText } from 'constants/uiText';
import { ModalWithSteps } from 'modals';
import { portfolioCompany as portfolioCompanyManager } from 'dataManagement';
import { notifyUser, showAPIError } from 'tools';
import { showFormHideConfirmation } from 'tools/formTools';
import { makeLibraryLink } from './tools';
import { formConfig } from './formConfig';
import { formStore } from './formStore';
import { FinalModal } from './components';

type PCCreateProps = {
  onCancel: VoidFn;
  onFinish: VoidFn;
  onFail: VoidFn;
  visible: boolean;
  portfolioId?: Portfolio['id'];
};

export const PCCreate: FC<PCCreateProps> = ({
  onCancel,
  onFinish,
  onFail,
  visible,
  portfolioId,
}) => {
  const history = useHistory();
  const [finished, setFinished] = useState(false);
  const [createdPcId, setCreatedPcId] = useState<Nullable<Company['id']>>(null);

  const onClose = useCallback(() => {
    onCancel();
    formStore.resetForm();
  }, [onCancel]);

  const handleHide = useCallback(() => {
    showFormHideConfirmation(onClose);
  }, [onClose]);

  const handleFinish = useCallback(() => {
    portfolioCompanyManager
      .create(formStore.prepareDataForSave(), portfolioId)
      .then((createdPC) => {
        notifyUser.ok(uiText('investments', 'createOk'));

        setCreatedPcId(createdPC.id);
        onFinish();
        setFinished(true);
      })
      .catch(showAPIError(uiText('investments', 'createError')));
  }, [onFinish, portfolioId]);

  const finishSetup = useCallback(() => {
    onClose();
    setFinished(false);
  }, [onClose]);

  const handleUploadClick = useCallback(() => {
    finishSetup();

    history.push({
      pathname: makeLibraryLink({ companyId: createdPcId, portfolioId }),
      state: {
        folderType: LibraryFolderType.PERFORMANCE_DATA,
      } as LibraryFolderViewState,
    });
  }, [createdPcId, finishSetup, history, portfolioId]);

  if (finished) {
    return (
      <FinalModal
        visible={visible}
        onLaterClick={finishSetup}
        onOkClick={handleUploadClick}
      />
    );
  }

  return (
    <ModalWithSteps
      formConfig={formConfig}
      onHide={handleHide}
      visible={visible}
      onFinish={handleFinish}
    />
  );
};
