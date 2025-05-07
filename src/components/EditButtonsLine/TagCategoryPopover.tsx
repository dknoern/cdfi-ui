import React, { useReducer, FC } from 'react';
import { Button, Popover } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import { VoidFn } from 'types';
import {
  editButtonsReducer,
  initialState,
  ActionType,
} from './components/EditButtonsReducer';
import { TagCategorySelector } from './components/TagCategorySelector';
import styles from './Popover.module.scss';

type TagCategoryPopoverProps = {
  isDisabled: boolean;
  onSubmit: VoidFn;
  initialValues: Store;
  showIcon?: boolean;
};

export const TagCategoryPopover: FC<TagCategoryPopoverProps> = ({
  isDisabled,
  onSubmit,
  initialValues,
  showIcon = false,
}) => {
  const [state, dispatch] = useReducer(editButtonsReducer, initialState);

  return (
    <Popover
      placement="bottom"
      overlayClassName={styles.popover}
      content={
        <TagCategorySelector
          onCancel={(): void => {
            dispatch({ type: ActionType.SHOW_TAG_CATEGORY });
          }}
          onSubmit={(values: any): void => {
            dispatch({ type: ActionType.SHOW_TAG_CATEGORY });
            onSubmit(values);
          }}
          initialValues={initialValues}
        />
      }
      trigger="click"
      visible={state.showTagCategory}
      onVisibleChange={(): void => {
        if (!isDisabled) dispatch({ type: ActionType.SHOW_TAG_CATEGORY });
      }}
      destroyTooltipOnHide
    >
      <Button
        id="editCategoryButton"
        type="primary"
        size="middle"
        disabled={isDisabled}
        icon={
          showIcon ? <AppstoreOutlined className={styles.buttonIcon} /> : null
        }
      >
        Edit Category
      </Button>
    </Popover>
  );
};
