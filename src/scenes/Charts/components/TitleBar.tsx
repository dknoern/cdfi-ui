import React, { FC } from 'react';
import { Tooltip } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { GraphMeta } from 'types/graphs';
import styles from './TitleBar.module.scss';

type TitleBarProps = {
  graph: GraphMeta;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};
export const TitleBar: FC<TitleBarProps> = ({
  graph,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>
        {graph.title}
        <Tooltip title="Edit chart">
          <EditFilled onClick={onEditClick} className={styles.btnIcon} />
        </Tooltip>
        <Tooltip title="Delete chart">
          <DeleteFilled onClick={onDeleteClick} className={styles.btnIcon} />
        </Tooltip>
      </h3>
      {!!graph.notes && <div className={styles.description}>{graph.notes}</div>}
    </div>
  );
};
