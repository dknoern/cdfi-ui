import React, { FC } from 'react';
import { Company, VoidFn } from 'types';
import { GraphMeta } from 'types/graphs';
import { uiText } from 'constants/uiText';
import { NotificationModal } from 'modals';
import { ModalTypes } from 'constants/ui';
import { graphs } from 'dataManagement/graphs';
import { showAPIError, notifyUser } from 'tools';
import styles from './DeleteChart.module.scss';

type DeleteChartProps = {
  graph?: GraphMeta;
  visible: boolean;
  onClose: VoidFn;
  reload: VoidFn;
  companyId: Company['id'] | null;
};

export const DeleteChart: FC<DeleteChartProps> = ({
  graph,
  visible,
  onClose,
  reload,
  companyId,
}) => {
  const onDelete = (id: GraphMeta['id']): void => {
    graphs
      .delete(id)
      .then(() => {
        notifyUser.ok(uiText('graphs', 'deleteOk'));
        reload();
      })
      .catch(showAPIError(uiText('graphs', 'deleteError')))
      .finally(onClose);
  };

  const onDeleteForCompany = (
    id: GraphMeta['id'],
    pcId: Company['id'],
  ): void => {
    graphs
      .deleteForCompany(id, pcId)
      .then(() => {
        notifyUser.ok(uiText('graphs', 'deleteForCompanyOk'));
        reload();
      })
      .catch(showAPIError(uiText('graphs', 'deleteError')))
      .finally(onClose);
  };

  if (!graph) {
    return null;
  }

  return (
    <NotificationModal
      title={`Do you really want to delete '${graph.title}'?`}
      isVisible={visible}
      type={ModalTypes.Warning}
      buttonsConfig={
        companyId
          ? [
              {
                id: 'deleteBtn',
                key: 'deleteForPortfolio',
                text: 'Delete for Portfolio',
                action: (): void => onDelete(graph.id),
                type: 'primary',
                danger: true,
              },
              {
                id: 'deleteBtn',
                key: 'deleteForCompany',
                text: 'Delete for Company',
                action: (): void => onDeleteForCompany(graph.id, companyId),
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
            ]
          : [
              {
                id: 'deleteBtn',
                key: 'delete',
                text: 'Delete',
                action: (): void => onDelete(graph.id),
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
            ]
      }
    />
  );
};
