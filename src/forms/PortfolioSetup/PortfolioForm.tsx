import React, { FC, useCallback } from 'react';
import { VoidFn } from 'types';
import { ModalWithSteps } from 'modals';
import { showFormHideConfirmation } from 'tools/formTools';
import { formConfig } from './formConfig';
import { formStore } from './formStore';

type PortfolioSetupProps = {
  onCancel: VoidFn;
  onFinish: VoidFn;
  active: boolean;
  isEdit?: boolean;
};

export const PortfolioSetup: FC<PortfolioSetupProps> = ({
  active,
  onFinish,
  onCancel,
  isEdit = false,
}) => {
  const onClose = useCallback(() => {
    onCancel();
    formStore.reset();
  }, [onCancel]);

  const handleHide = useCallback(() => {
    showFormHideConfirmation(onClose);
  }, [onClose]);

  return (
    <ModalWithSteps
      visible={active}
      formConfig={formConfig(isEdit)}
      onFinish={onFinish}
      onHide={handleHide}
    />
  );
};
