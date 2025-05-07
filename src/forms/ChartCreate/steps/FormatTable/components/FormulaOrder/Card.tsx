import React, { FC, useRef } from 'react';
import {
  useDrag,
  useDrop,
  DropTargetMonitor,
  XYCoord,
  DragSourceMonitor,
} from 'react-dnd';
import { EllipsisOutlined } from '@ant-design/icons';
import { SortableListItem, SwapFn } from 'types/customDataTable';
import styles from './FormulaOrder.module.scss';

const CARD_TYPE = 'DATA_ITEM_CARD';

interface DragItem {
  index: number;
  id: number;
  type: string;
  dataItem: SortableListItem;
}

type CardProps = {
  data: SortableListItem;
  onSwap: SwapFn;
  index: number;
};
export const Card: FC<CardProps> = ({ data, onSwap, index }) => {
  const ref = useRef<HTMLLIElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: CARD_TYPE,
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      // Don't replace items with themselves
      if (item.id === data.id) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      onSwap(item.dataItem, data);
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: CARD_TYPE, id: data.id, index, dataItem: data },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={`${styles.item} ${isDragging ? styles.dragging : ''} ${
        isOver ? styles.isOver : ''
      }`}
    >
      <EllipsisOutlined rotate={90} className={styles.icon} />
      <span>{data.name}</span>
    </li>
  );
};
