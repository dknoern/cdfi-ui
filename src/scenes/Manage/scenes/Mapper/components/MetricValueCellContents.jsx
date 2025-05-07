import React from 'react';
import PropTypes from 'prop-types';
import { METRIC_TYPE } from 'constants/METRIC_TYPE';
import styles from './Mappings.module.scss';

export const MetricValueCellContents = ({
  metricId,
  metricType,
  values,
  sum,
  mappedItems,
}) => {
  // with sum
  if (metricType === METRIC_TYPE.NUMERIC && values.length > 1) {
    return (
      <>
        {values.map((value, itemIndex) => (
          <React.Fragment
            key={`${metricId}_${mappedItems[itemIndex].valueCellKey}`}
          >
            {itemIndex > 0 && '+\u00A0'}
            <span className={`${styles.valueItem} ${styles.valueItemIncluded}`}>
              {value || '[empty]'}
            </span>
            &nbsp;
          </React.Fragment>
        ))}
        =&nbsp;{sum}
      </>
    );
  }

  // just one numeric value
  if (metricType === METRIC_TYPE.NUMERIC) {
    if (values.length) return values[0];
    return null;
  }

  // text values
  return values.map((value) => (
    <span key={`${metricId}_${value}`} className={styles.valueItem}>
      {value || '[empty]'}
    </span>
  ));
};
MetricValueCellContents.propTypes = {
  metricId: PropTypes.number.isRequired,
  metricType: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  mappedItems: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  sum: PropTypes.number.isRequired,
};
