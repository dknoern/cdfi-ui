import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { useDrop } from 'react-dnd';
import { ConditionalTooltip } from 'components';
import { DND_TYPES } from '../constants';
import { makeMetricLabelCellTooltipText } from '../tools/makeMetricLabelCellTooltipText';
import { mapStore } from '../store';
import styles from './Mappings.module.scss';

const MetricLabelCellFn = ({
  onDrop,
  mappedLabels,
  onRemoveMapping,
  metric,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [DND_TYPES.CELL],
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const tooltipTitle = makeMetricLabelCellTooltipText(metric);

  const classes = [styles.metricLabelCell];
  if (isOver && canDrop) {
    classes.push(styles.metricLabelCellIsActive);
  }

  return (
    <ConditionalTooltip condition={!!tooltipTitle} tooltipTitle={tooltipTitle}>
      <td>
        <span ref={drop} className={classes.join(' ')}>
          {metric.name}
          {!!mappedLabels.length && (
            <ul className={styles.mappedLabelsList}>
              {mappedLabels.map((labelCellKey) => (
                <li key={`${metric.id}_${labelCellKey}`}>
                  {mapStore.plainData[labelCellKey].value || '[empty]'}
                  <button
                    type="button"
                    onClick={() => onRemoveMapping(labelCellKey)}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          )}
        </span>
      </td>
    </ConditionalTooltip>
  );
};
MetricLabelCellFn.propTypes = {
  onDrop: PropTypes.func.isRequired,
  onRemoveMapping: PropTypes.func.isRequired,
  metric: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  mappedLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export const MetricLabelCell = observer(MetricLabelCellFn);
