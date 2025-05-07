import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { useDrop } from 'react-dnd';
import { DND_TYPES } from '../constants';
import { metricType } from '../types';
import { valuesSum } from '../tools';
import { mapStore } from '../store';
import { MetricValueCellContents } from './MetricValueCellContents';
import styles from './Mappings.module.scss';

const MetricValueCellFn = ({ mappedItems, onDrop, metric }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [DND_TYPES.CELL],
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const classes = [styles.metricValueCell];
  if (isOver && canDrop) {
    classes.push(styles.metricLabelCellIsActive);
  }

  const withValues = useMemo(() => {
    return mappedItems.filter((item) => !!item.valueCellKey);
  }, [mappedItems]);

  const onlyValues = useMemo(
    () => withValues.map((item) => mapStore.plainData[item.valueCellKey].value),
    [withValues],
  );

  const sum = useMemo(() => valuesSum(onlyValues), [onlyValues]);

  return (
    <td key={metric.id}>
      <div ref={drop} className={classes.join(' ')}>
        <MetricValueCellContents
          metricId={metric.id}
          metricType={metric.type}
          values={onlyValues}
          mappedItems={withValues}
          sum={sum}
        />
      </div>
    </td>
  );
};
MetricValueCellFn.propTypes = {
  onDrop: PropTypes.func.isRequired,
  mappedItems: PropTypes.arrayOf(
    PropTypes.shape({
      labelCellKey: PropTypes.string,
      valueCellKey: PropTypes.string,
    }),
  ),
  metric: metricType.isRequired,
};
MetricValueCellFn.defaultProps = {
  mappedItems: [],
};

export const MetricValueCell = observer(MetricValueCellFn);
