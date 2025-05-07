import React, { FC } from 'react';
import { Button } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { VoidFn } from 'types';
import { store } from '../store';
import styles from '../Metrics.module.scss';

type SectionProps = {
  onEditClick: VoidFn;
  onDeleteClick: VoidFn;
};

export const CategoryTitle: FC<SectionProps> = ({
  onEditClick,
  onDeleteClick,
}) => {
  const { category, isNoCategoryActive } = store;

  return (
    <div className={styles.pageTitleBlock}>
      <span>{isNoCategoryActive ? 'No Category' : category.name}</span>
      {!isNoCategoryActive && (
        <>
          <Button id="editBtn" type="link" title="Edit" onClick={onEditClick}>
            <EditFilled alt="EditFilled" />
          </Button>
          <Button
            id="deleteBtn"
            type="link"
            title="Delete"
            onClick={onDeleteClick}
          >
            <DeleteFilled alt="DeleteFilled" />
          </Button>
        </>
      )}
    </div>
  );
};
