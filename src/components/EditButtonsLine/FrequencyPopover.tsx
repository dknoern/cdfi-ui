import React, { useReducer, FC } from 'react';
import { Button, Popover } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { CalendarOutlined } from '@ant-design/icons';
import { Metric } from 'types';
import { uiText } from 'constants/uiText';
import { FrequencySelector } from './components/FrequencySelector';
import {
  editButtonsReducer,
  initialState,
  ActionType,
} from './components/EditButtonsReducer';
import styles from './Popover.module.scss';

type FrequencyPopoverProps = {
  selectedMetricIds: Metric['id'][];
  setParam: (setData: { [key: string]: any }) => void;
  showIcon?: boolean;
  initialValues?: Store;
  buttonText?: string;
  isEdit?: boolean;
};

export const FrequencyPopover: FC<FrequencyPopoverProps> = ({
  selectedMetricIds,
  setParam,
  showIcon = false,
  initialValues,
  buttonText = uiText('metrics', 'updateFrequencyBtnText'),
  isEdit = true,
}) => {
  const [state, dispatch] = useReducer(editButtonsReducer, initialState);

  return (
    <Popover
      placement="bottom"
      overlayClassName={styles.popover}
      content={
        <FrequencySelector
          onCancel={(): void => {
            dispatch({ type: ActionType.SHOW_FREQUENCY });
          }}
          onSubmit={(values: any): void => {
            dispatch({ type: ActionType.SHOW_FREQUENCY });
            setParam(values);
          }}
          initialValues={initialValues}
          isEdit={isEdit}
        />
      }
      destroyTooltipOnHide
      trigger="click"
      visible={state.showFrequency}
      onVisibleChange={(): void => {
        if (selectedMetricIds.length)
          dispatch({ type: ActionType.SHOW_FREQUENCY });
      }}
    >
      <Button
        id="editFrequencyButton"
        type="primary"
        size="middle"
        disabled={!selectedMetricIds.length}
        icon={
          showIcon ? <CalendarOutlined className={styles.buttonIcon} /> : null
        }
      >
        {buttonText}
      </Button>
    </Popover>
  );
};
