import React, { FC, useCallback } from 'react';
import { Store } from 'antd/lib/form/interface';
import { uiText } from 'constants/uiText';
import { VoidFn } from 'types';
import { ModalWithForm } from 'modals';
import { dataMan, ManagerName } from 'dataManagement/managers';
import { MetricCategoriesManager } from 'dataManagement/managers/MetricCategoriesManager';
import { notifyUser, showAPIError } from 'tools';
import { showFormHideConfirmation } from 'tools/formTools';
import { CATEGORY_FORM_MODAL_WIDTH } from '../../constants';
import { AddCategoryForm } from './forms/AddCategoryForm';

type AddCategoryProps = {
  onClose: VoidFn;
  onFinish: VoidFn;
  visible: boolean;
};

const FORM_ID = 'addCategory';
const categoryMgr = dataMan.manager(
  ManagerName.metricCategories,
) as MetricCategoriesManager;

export const AddCategory: FC<AddCategoryProps> = ({
  onClose,
  visible,
  onFinish,
}) => {
  const handleCreate = useCallback(
    (values: Store) => {
      categoryMgr
        .create({ name: values.name, parentId: values.parentId })
        .then(() => {
          notifyUser.ok(uiText('metrics', 'categoryCreateOk'));
          onFinish();
        })
        .catch(showAPIError(uiText('metrics', 'categoryCreateError')));
    },
    [onFinish],
  );

  const handleHide = useCallback(() => {
    showFormHideConfirmation(onClose);
  }, [onClose]);

  return (
    <ModalWithForm
      title="Create New Category"
      formId={FORM_ID}
      visible={visible}
      onCancel={handleHide}
      actionButtonText="Create"
      forceRender={false}
      width={CATEGORY_FORM_MODAL_WIDTH}
    >
      <AddCategoryForm
        formId={FORM_ID}
        onFinish={handleCreate}
        initialValues={{ name: '', parentId: '' }}
      />
    </ModalWithForm>
  );
};
