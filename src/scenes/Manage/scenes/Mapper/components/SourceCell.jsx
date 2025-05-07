import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { useDrag } from 'react-dnd';
import { InfoCircleFilled } from '@ant-design/icons';
import { ConditionalTooltip } from 'components';
import { DND_TYPES } from '../constants';
import { mapStore } from '../store';
import styles from './SourceCell.module.scss';

const SourceCellFn = ({ cellKey, style, errorMessage }) => {
  const hasError = !!errorMessage;
  const { value, isLabel, isValue } = mapStore.plainData[cellKey];

  const [{ isDragging }, drag] = useDrag({
    item: Object.assign({ type: DND_TYPES.CELL }, mapStore.plainData[cellKey]),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <ConditionalTooltip condition={hasError} tooltipTitle={errorMessage}>
      <div style={style}>
        <div
          ref={drag}
          className={`${styles.sourceCell} ${
            isLabel ? styles.sourceCellIsLabel : ''
          } ${isValue ? styles.sourceCellIsValue : ''} ${
            isDragging ? styles.sourceCellIsDragging : ''
          } ${hasError ? styles.sourceCellHasError : ''}`}
        >
          <span className={styles.value}>{value}</span>
          {hasError && <InfoCircleFilled className={styles.icon} />}
        </div>
      </div>
    </ConditionalTooltip>
  );
};
SourceCellFn.defaultProps = { errorMessage: '' };
SourceCellFn.propTypes = {
  cellKey: PropTypes.string.isRequired,
  style: PropTypes.instanceOf(Object).isRequired,
  errorMessage: PropTypes.string,
};
export const SourceCell = observer(SourceCellFn);
