import React, { FC, useReducer } from 'react';
import { Button, Popover } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import { DirectoryTreeProps } from 'antd/lib/tree';
import { VoidFn } from 'types';
import { MoveSelector } from './components';
import {
  editButtonsReducer,
  initialState,
  ActionType,
} from './components/EditButtonsReducer';
import styles from './Popover.module.scss';

type MovePopoverProps = {
  treeData: DirectoryTreeProps['treeData'];
  isDisabled: boolean;
  onSubmit: VoidFn;
};

export const MovePopover: FC<MovePopoverProps> = ({
  isDisabled,
  onSubmit,
  treeData,
}) => {
  const [state, dispatch] = useReducer(editButtonsReducer, initialState);

  return (
    <Popover
      content={
        <MoveSelector
          onCancel={(): void => {
            dispatch({ type: ActionType.SHOW_MOVE });
          }}
          onSubmit={(folderId: number): void => {
            dispatch({ type: ActionType.SHOW_MOVE });
            onSubmit(folderId);
          }}
          treeData={treeData}
        />
      }
      visible={state.showMove}
      onVisibleChange={(): void => {
        if (!isDisabled)
          dispatch({
            type: ActionType.SHOW_MOVE,
          });
      }}
      trigger="click"
      destroyTooltipOnHide
      placement="bottom"
      overlayClassName={styles.popover}
    >
      <Button
        disabled={isDisabled}
        id="moveButton"
        type="primary"
        size="middle"
        icon={<ExportOutlined className={styles.buttonIcon} />}
      >
        Move
      </Button>
    </Popover>
  );
};
