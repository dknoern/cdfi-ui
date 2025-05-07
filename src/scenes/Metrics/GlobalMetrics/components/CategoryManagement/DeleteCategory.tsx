import React, { FC, useCallback } from 'react';
import { VoidFn } from 'types';
import { uiText } from 'constants/uiText';
import { ModalTypes } from 'constants/ui';
import { NotificationModal } from 'modals';
import { dataMan, ManagerName } from 'dataManagement/managers';
import { MetricCategoriesManager } from 'dataManagement/managers/MetricCategoriesManager';
import { notifyUser, showAPIError } from 'tools';
import { store } from '../../store';
import styles from '../Categories.module.scss';

type DeleteCategoryProps = {
  visible: boolean;
  onClose: VoidFn;
  onFinish: VoidFn;
};

const categoryMgr = dataMan.manager(
  ManagerName.metricCategories,
) as MetricCategoriesManager;

export const DeleteCategory: FC<DeleteCategoryProps> = ({
  visible,
  onClose,
  onFinish,
}) => {
  const { category } = store;

  const handleDelete = useCallback(() => {
    categoryMgr
      .delete(category.id)
      .then(() => {
        notifyUser.ok(uiText('metrics', 'categoryDeleteOk'));
        onFinish();
      })
      .catch(showAPIError(uiText('metrics', 'categoryDeleteError')));
  }, [onFinish, category]);

  return (
    <NotificationModal
      title={`Do you really want to delete '${category.name}'?`}
      isVisible={visible}
      type={ModalTypes.Warning}
      buttonsConfig={[
        {
          id: 'deleteBtn',
          key: 'delete',
          text: 'Delete',
          action: handleDelete,
          type: 'primary',
          danger: true,
        },
        {
          id: 'cancelBtn',
          key: 'cancel',
          text: 'Cancel',
          action: onClose,
          className: styles.cancelBtn,
          type: 'ghost',
        },
      ]}
    />
  );
};
