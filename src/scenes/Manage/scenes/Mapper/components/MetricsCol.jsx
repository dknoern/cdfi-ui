import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { uiText } from 'constants/uiText';
import { typography } from 'constants/typography';
import { PageSectionWrapper } from 'components';
import { Log, notifyUser } from 'tools';
import { mapStore } from '../store';
import { Mappings } from './Mappings';
import styles from './Constructor.module.scss';

const { metricsSectionTitle } = typography('mapper');

const MetricsColFn = ({ metrics, metricCategories }) => {
  const handleDropLabel = useCallback(({ metricId, labelCellKey }) => {
    Log.log('[MetricsColFn] handleDropLabel', metricId, labelCellKey);

    mapStore.setCurrentDroppedItem({ metricId, labelCellKey });

    if (mapStore.mapLabel({ metricId, labelCellKey })) {
      const valueCellKey = mapStore.findValueCell(labelCellKey);
      if (valueCellKey) {
        mapStore.setLabelValue({ labelCellKey, valueCellKey });
      }
    }
  }, []);

  const handleDropValue = useCallback(({ metricId, valueCellKey }) => {
    Log.log('[MetricsColFn] handleDropValue', metricId, valueCellKey);

    const mappedLabels = mapStore.metric2cells[metricId];

    let labelCellKey;
    if (!mappedLabels) {
      // currently have no maps for this metric
      // find label cell and map
      labelCellKey = mapStore.findLabelCell4ValueCell(valueCellKey);
      if (!labelCellKey) {
        notifyUser.error(uiText('mapper', 'canNotFindLabel'));
        return;
      }
      mapStore.mapLabel({ metricId, labelCellKey });
    } else if (mappedLabels.length < 2) {
      // have 1 label mapped to this metric
      // use existing label
      [labelCellKey] = mappedLabels;
    } else {
      // default flow - look for last dropped label
      // and consider it as a target
      if (!mapStore.currentDroppedItem) {
        notifyUser.error(uiText('mapper', 'dropLabelFirst'), {
          type: 'error',
        });
        return;
      }

      const labelMetricId = mapStore.currentDroppedItem.metricId;
      const valueMetricId = metricId;

      if (labelMetricId !== valueMetricId) {
        notifyUser.error(uiText('mapper', 'droppedMetricIdNotEqual'), {
          type: 'error',
        });
        return;
      }

      ({ labelCellKey } = mapStore.currentDroppedItem);
    }

    mapStore.setLabelValue({
      labelCellKey,
      valueCellKey,
      isValuesRight: false, // use exact coordinates for this case
    });
  }, []);

  const handleRemoveMapping = useCallback(({ metricId, labelCellKey }) => {
    Log.log('[MetricsColFn] handleRemoveMapping', metricId, labelCellKey);
    mapStore.unMap({ metricId, labelCellKey });
  }, []);

  return (
    <PageSectionWrapper
      title={metricsSectionTitle}
      className={styles.pageSection}
      titleClassName={styles.title}
    >
      <div className={styles.mappingsContainer}>
        <Mappings
          metricCategories={metricCategories}
          metrics={metrics}
          handleDropLabel={handleDropLabel}
          handleDropValue={handleDropValue}
          handleRemoveMapping={handleRemoveMapping}
        />
      </div>
    </PageSectionWrapper>
  );
};
MetricsColFn.propTypes = {
  metrics: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  metricCategories: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};

export const MetricsCol = observer(MetricsColFn);
