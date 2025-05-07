import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Typography, Row, Col, Divider } from 'antd';
import { SortableListItem, SwapFn } from 'types/customDataTable';
import { GRID_COL_FULL_ROW_SPAN } from 'constants/ui';
import { uiText } from 'constants/uiText';
import { FormPrimaryLabel } from 'components';
import { sortByOrder } from 'tools/sort';
import { Card } from './Card';
import styles from './FormulaOrder.module.scss';

const { Text } = Typography;

type FormulaOrderProps = {
  items: SortableListItem[];
  onSwap: SwapFn;
};
const FormulaOrderFn: FC<FormulaOrderProps> = ({ items, onSwap }) => {
  return (
    <>
      <FormPrimaryLabel num={1} text="Formula Order (Drag to rearrange)" />
      {items.length ? (
        <DndProvider backend={HTML5Backend}>
          <ul id="formulaOrderList" className={styles.list}>
            {items
              .slice() // need to work with mobx store
              .sort(sortByOrder)
              .map((item, index) => (
                <Card key={item.id} data={item} onSwap={onSwap} index={index} />
              ))}
          </ul>
        </DndProvider>
      ) : (
        <Row>
          <Col span={GRID_COL_FULL_ROW_SPAN}>
            <Divider />
            <Text type="warning">{uiText('forecasts', 'noItemsToSort')}</Text>
          </Col>
        </Row>
      )}
    </>
  );
};

export const FormulaOrder = observer(FormulaOrderFn);
