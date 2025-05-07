import React, { useReducer, FC } from 'react';
import { Button, Popover } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { Metric } from 'types';
import { CategorySelector } from './components/CategorySelector';
import {
  editButtonsReducer,
  initialState,
  ActionType,
} from './components/EditButtonsReducer';
import styles from './Popover.module.scss';

type CategoryPopoverProps = {
  selectedMetricIds: Metric['id'][];
  setParam: (setData: { [key: string]: any }) => void;
  showIcon?: boolean;
};

export const CategoryPopover: FC<CategoryPopoverProps> = ({
  selectedMetricIds,
  setParam,
  showIcon = false,
}) => {
  const [state, dispatch] = useReducer(editButtonsReducer, initialState);

  return (
    <Popover
      placement="bottom"
      overlayClassName={styles.popover}
      content={
        <CategorySelector
          onCancel={(): void => {
            dispatch({ type: ActionType.SHOW_CATEGORY });
          }}
          onSubmit={(values: any): void => {
            dispatch({ type: ActionType.SHOW_CATEGORY });
            setParam(values);
          }}
        />
      }
      destroyTooltipOnHide
      trigger="click"
      visible={state.showCategory}
      onVisibleChange={(): void => {
        if (selectedMetricIds.length)
          dispatch({ type: ActionType.SHOW_CATEGORY });
      }}
    >
      <Button
        id="editCategoryButton"
        type="primary"
        size="middle"
        disabled={!selectedMetricIds.length}
        icon={
          showIcon ? <AppstoreOutlined className={styles.buttonIcon} /> : null
        }
      >
        Edit Category
      </Button>
    </Popover>
  );
};
