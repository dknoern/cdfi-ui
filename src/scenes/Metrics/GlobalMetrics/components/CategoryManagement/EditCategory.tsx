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
import { EditCategoryForm } from './forms/EditCategoryForm';
import { store } from '../../store';

const FORM_ID = 'editCategory';
const categoryMgr = dataMan.manager(
  ManagerName.metricCategories,
) as MetricCategoriesManager;

type EditCategoryProps = {
  onClose: VoidFn;
  onFinish: VoidFn;
  visible: boolean;
};

export const EditCategory: FC<EditCategoryProps> = ({
  visible,
  onFinish,
  onClose,
}) => {
  const { category } = store;

  const handleEdit = useCallback(
    (values: Store) => {
      categoryMgr
        .update(category.id, {
          ...category,
          name: values.name,
          parentId: values.parentId,
        })
        .then(() => {
          notifyUser.ok(uiText('metrics', 'categoryUpdateOk'));
          onFinish();
        })
        .catch(showAPIError(uiText('metrics', 'categoryUpdateError')));
    },
    [onFinish, category],
  );

  const handleHide = useCallback(() => {
    showFormHideConfirmation(onClose);
  }, [onClose]);

  return (
    <ModalWithForm
      title="Edit Category"
      formId={FORM_ID}
      visible={visible}
      onCancel={handleHide}
      actionButtonText="Update"
      forceRender={false}
      width={CATEGORY_FORM_MODAL_WIDTH}
    >
      <EditCategoryForm
        formId={FORM_ID}
        onFinish={handleEdit}
        initialValues={category}
      />
    </ModalWithForm>
  );
};
