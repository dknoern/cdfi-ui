import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Collapsible from 'react-collapsible';
import { MetricLabelCell } from './MetricLabelCell';
import { MetricValueCell } from './MetricValueCell';
import { mapStore } from '../store';
import styles from './Mappings.module.scss';

const CollapsibleTrigger = ({ className, title }) => (
  <div className={className}>
    <i className="fas fa-caret-right" />
    &nbsp; {title}
  </div>
);

const CollapsibleItem = ({
  metric,
  mappedItems,
  mappedLabels,
  handleDropLabel,
  handleRemoveMapping,
  handleDropValue,
}) => {
  return (
    <tr key={metric.id}>
      <MetricLabelCell
        onDrop={(cellItem) =>
          handleDropLabel({
            metricId: metric.id,
            labelCellKey: cellItem.cellKey,
          })
        }
        metric={metric}
        onRemoveMapping={(labelCellKey) =>
          handleRemoveMapping({
            metricId: metric.id,
            labelCellKey,
          })
        }
        mappedLabels={mappedLabels}
      />
      <MetricValueCell
        onDrop={(cellItem) =>
          handleDropValue({
            metricId: metric.id,
            valueCellKey: cellItem.cellKey,
          })
        }
        mappedItems={mappedItems}
        metric={metric}
      />
    </tr>
  );
};

CollapsibleTrigger.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

CollapsibleTrigger.defaultProps = {
  className: null,
  title: null,
};

const MappingsFn = ({
  metricCategories,
  metrics,
  handleDropLabel,
  handleDropValue,
  handleRemoveMapping,
}) => {
  const categories = useMemo(
    () =>
      metricCategories && metricCategories.length
        ? metricCategories.filter((cat) => !cat.parentId)
        : [],
    [metricCategories],
  );

  const subCategories = useMemo(
    () =>
      metricCategories && metricCategories.length
        ? metricCategories.filter((cat) => cat.parentId)
        : [],
    [metricCategories],
  );

  return (
    <>
      {categories.map((cat) => (
        <Collapsible
          open
          transitionTime={200}
          key={cat.id}
          trigger={
            <CollapsibleTrigger
              title={cat.name}
              className={styles.categoryBlock}
            />
          }
        >
          <table className={styles.metricsTable}>
            <tbody>
              {(metrics || [])
                .filter(
                  (metric) =>
                    metric.grandParentId === cat.id && !metric.parentId,
                )
                .map((metric) => {
                  const mappedLabels = mapStore.metric2cells[metric.id] || [];
                  const mappedItems = mappedLabels.map((labelCellKey) => ({
                    labelCellKey,
                    valueCellKey: mapStore.label2Value[labelCellKey],
                  }));
                  return (
                    <CollapsibleItem
                      key={metric.id}
                      metric={metric}
                      mappedItems={mappedItems}
                      mappedLabels={mappedLabels}
                      handleDropValue={handleDropValue}
                      handleDropLabel={handleDropLabel}
                      handleRemoveMapping={handleRemoveMapping}
                    />
                  );
                })}
            </tbody>
          </table>
          {subCategories
            .filter((subcat) => subcat.parentId === cat.id)
            .map((subcat) => (
              <Collapsible
                open
                transitionTime={200}
                key={subcat.id}
                trigger={
                  <CollapsibleTrigger
                    title={subcat.name}
                    className={styles.subCategoryBlock}
                  />
                }
              >
                <table className={styles.metricsTable}>
                  <tbody>
                    {(metrics || [])
                      .filter((metric) => metric.parentId === subcat.id)
                      .map((metric) => {
                        const mappedLabels =
                          mapStore.metric2cells[metric.id] || [];
                        const mappedItems = mappedLabels.map(
                          (labelCellKey) => ({
                            labelCellKey,
                            valueCellKey: mapStore.label2Value[labelCellKey],
                          }),
                        );
                        return (
                          <CollapsibleItem
                            key={metric.id}
                            metric={metric}
                            mappedItems={mappedItems}
                            mappedLabels={mappedLabels}
                            handleDropValue={handleDropValue}
                            handleDropLabel={handleDropLabel}
                            handleRemoveMapping={handleRemoveMapping}
                          />
                        );
                      })}
                  </tbody>
                </table>
              </Collapsible>
            ))}
        </Collapsible>
      ))}
      {(metrics || []).find((metric) => !metric.grandParentId) && (
        <Collapsible
          open
          transitionTime={200}
          trigger={
            <CollapsibleTrigger
              title="No category"
              className={styles.categoryBlock}
            />
          }
        >
          <table className={styles.metricsTable}>
            <tbody>
              {(metrics || [])
                .filter((metric) => !metric.grandParentId)
                .map((metric) => {
                  const mappedLabels = mapStore.metric2cells[metric.id] || [];
                  const mappedItems = mappedLabels.map((labelCellKey) => ({
                    labelCellKey,
                    valueCellKey: mapStore.label2Value[labelCellKey],
                  }));
                  return (
                    <CollapsibleItem
                      key={metric.id}
                      metric={metric}
                      mappedItems={mappedItems}
                      mappedLabels={mappedLabels}
                      handleDropValue={handleDropValue}
                      handleDropLabel={handleDropLabel}
                      handleRemoveMapping={handleRemoveMapping}
                    />
                  );
                })}
            </tbody>
          </table>
        </Collapsible>
      )}
    </>
  );
};

MappingsFn.propTypes = {
  metricCategories: PropTypes.instanceOf(Array),
  metrics: PropTypes.instanceOf(Array),
  mappedItems: PropTypes.instanceOf(Map),
  onDropValue: PropTypes.func,
  onDropLabel: PropTypes.func,
  onRemoveMapping: PropTypes.func,
  isLoading: PropTypes.bool,
};

MappingsFn.defaultProps = {
  metricCategories: null,
  metrics: null,
  mappedItems: null,
  onDropLabel: undefined,
  onDropValue: undefined,
  onRemoveMapping: undefined,
  isLoading: true,
};

export const Mappings = observer(MappingsFn);
