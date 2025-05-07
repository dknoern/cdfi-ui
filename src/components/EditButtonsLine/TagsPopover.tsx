import React, { useReducer, FC, useMemo } from 'react';
import { Button, Popover } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import { Metric, Tag } from 'types';
import { MetricTags } from './types';
import { TagSelector } from './components/TagSelector';
import {
  editButtonsReducer,
  initialState,
  ActionType,
} from './components/EditButtonsReducer';
import styles from './Popover.module.scss';

type TagsPopoverProps = {
  selectedMetricIds: Metric['id'][];
  setParam: (setData: { tags: Tag['id'][] }) => void;
  metrics: MetricTags[];
  showIcon?: boolean;
};

export const TagsPopover: FC<TagsPopoverProps> = ({
  selectedMetricIds,
  setParam,
  metrics,
  showIcon = false,
}) => {
  const [state, dispatch] = useReducer(editButtonsReducer, initialState);

  const currentTags = useMemo(() => {
    const tags: Tag['id'][] = [];

    metrics.forEach((metric) => {
      if (selectedMetricIds.includes(metric.id) && metric.tags) {
        tags.push(...metric.tags);
      }
    });

    return tags;
  }, [selectedMetricIds, metrics]);

  return (
    <Popover
      placement="bottom"
      overlayClassName={styles.popover}
      content={
        <TagSelector
          onCancel={(): void => {
            dispatch({ type: ActionType.SHOW_TAGS });
          }}
          onSubmit={(values: { tags: Tag['id'][] }): void => {
            dispatch({ type: ActionType.SHOW_TAGS });
            setParam({
              tags: [...Array.from(new Set(values.tags as Tag['id'][]))],
            });
          }}
          value={currentTags}
        />
      }
      destroyTooltipOnHide
      trigger="click"
      visible={state.showTags}
      onVisibleChange={(): void => {
        if (selectedMetricIds.length) dispatch({ type: ActionType.SHOW_TAGS });
      }}
    >
    </Popover>
  );
};
