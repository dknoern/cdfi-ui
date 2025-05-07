import React, { SyntheticEvent, ReactElement } from 'react';
import { Resizable } from 'react-resizable';

import styles from './ResizableHeader.module.scss';

type ResizeCallbackData = {
  node: HTMLElement;
  size: { width: number; height: number };
  handle: ResizeHandleAxis;
};
type ResizeHandleAxis = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne';

type ResizableProps = {
  children?: React.ReactNode;
  className?: string | undefined;
  width: number;
  height: number;
  handle?:
    | React.ReactNode
    | ((resizeHandle: ResizeHandleAxis) => React.ReactNode)
    | undefined;
  handleSize?: [number, number] | undefined;
  lockAspectRatio?: boolean | undefined;
  axis?: 'both' | 'x' | 'y' | 'none' | undefined;
  minConstraints?: [number, number] | undefined;
  maxConstraints?: [number, number] | undefined;
  onResizeStop?:
    | ((e: React.SyntheticEvent, data: ResizeCallbackData) => any)
    | undefined;
  onResizeStart?:
    | ((e: React.SyntheticEvent, data: ResizeCallbackData) => any)
    | undefined;
  onResize?:
    | ((e: React.SyntheticEvent, data: ResizeCallbackData) => any)
    | undefined;
  draggableOpts?: any;
  resizeHandles?: ResizeHandleAxis[] | undefined;
};

const ResizableHeader = (props: ResizableProps) => {
  const { onResize, width, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className={`${styles}.'react_resizable_handle'`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

export default ResizableHeader;
