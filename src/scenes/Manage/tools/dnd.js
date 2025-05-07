export const dropSpec = {
  hover: (props, monitor, component) => {
    if (!component) {
      return;
    }
    // node = HTML Div element from imperative API
    const node = component.getNode();
    if (!node) {
      return;
    }
    const {
      index, parentId, onSwap,
    } = props;

    const dragItem = monitor.getItem();

    if (parentId !== dragItem.parentId) return;

    const dragIndex = dragItem.index;
    const hoverIndex = index;
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }
    // Determine rectangle on screen
    const hoverBoundingRect = node.getBoundingClientRect();
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
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

    // Time to actually perform the swap action
    onSwap(parentId, dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    dragItem.index = hoverIndex;
  },
};

export const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  overItemParentId: monitor.isOver({ shallow: true }) ? monitor.getItem().parentId : undefined,
  overItem: monitor.isOver({ shallow: true }) ? monitor.getItem() : undefined,
});

export const dragSpec = {
  beginDrag: props => ({
    id: props.id,
    index: props.index,
    parentId: props.parentId,
  }),
  endDrag: (props, monitor) => {
    const dropResult = monitor.getDropResult();
    if (dropResult && dropResult.isDropZone) {
      props.onMove(dropResult);
    }
  },
};

export const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});
