import React, { useReducer, PropsWithChildren } from 'react';
import { observer } from 'mobx-react';
import { Button, Popover } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { FormSubmitFn } from 'types/form';
import { Log } from 'tools';
import { NameEditDataType } from './types';
import { NameInput } from './components';
import {
  editButtonsReducer,
  initialState,
  ActionType,
} from './components/EditButtonsReducer';
import styles from './Popover.module.scss';

type NamePopoverProps<IdType> = {
  isDisabled: boolean;
  onSubmit: FormSubmitFn<Promise<void>, NameEditDataType<IdType>>;
  initialValues: NameEditDataType<IdType>;
};

const NamePopoverFn = <IdType,>({
  isDisabled,
  onSubmit,
  initialValues,
}: PropsWithChildren<NamePopoverProps<IdType>>): JSX.Element => {
  const [state, dispatch] = useReducer(editButtonsReducer, initialState);

  return (
    <Popover
      content={
        <NameInput
          onCancel={(): void => {
            dispatch({ type: ActionType.SHOW_RENAME });
          }}
          onSubmit={(form) => (values): void => {
            onSubmit(form)({ ...initialValues, name: values.name })
              .then(() => {
                dispatch({ type: ActionType.SHOW_RENAME });
              })
              .catch(Log.error);
          }}
          initialValues={initialValues}
        />
      }
      visible={state.showRename}
      onVisibleChange={(): void => {
        if (!isDisabled)
          dispatch({
            type: ActionType.SHOW_RENAME,
          });
      }}
      trigger="click"
      destroyTooltipOnHide
      placement="bottom"
      overlayClassName={styles.popover}
    >
      <Button
        id="renameButton"
        disabled={isDisabled}
        type="primary"
        size="middle"
        icon={<EditOutlined className={styles.buttonIcon} />}
      >
        Rename
      </Button>
    </Popover>
  );
};

export const NamePopover = observer(NamePopoverFn);
