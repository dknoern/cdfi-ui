import React, { FC } from 'react';
import { Select } from 'antd';
import { GraphMeta } from 'types/graphs';
import styles from './GraphSelector.module.scss';

type GraphSelectorProps = {
  id?: string;
  items: GraphMeta[];
  selected?: number;
  onSelect: (graphId: number) => void;
  isLoading: boolean;
};

export const GraphSelector: FC<GraphSelectorProps> = ({
  id,
  items,
  onSelect,
  selected,
  isLoading,
}) => {
  return (
    <Select
      id={id}
      className={styles.select}
      value={selected}
      onSelect={onSelect}
      showSearch
      optionFilterProp="children"
      loading={isLoading}
    >
      {items.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.title}
        </Select.Option>
      ))}
      {items.length < 1 && (
        <Select.Option disabled value={0}>
          You have no available graphs
        </Select.Option>
      )}
    </Select>
  );
};
