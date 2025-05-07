import React, { FC, useCallback, useState } from 'react';
import { Metric, GlobalMetric, VoidFn } from 'types';
import { EditMetricsLine, CategoryPopover, TagsPopover } from 'components';
import { Delete } from 'components/EditButtonsLine/components';
import { BatchDelete } from 'components/BatchDelete';
import { updateGlobalMetricsBatch, deleteGlobalMetricsBatch } from '../tools';

type EditMetricsBatchProps = {
  selectedMetricsIds: Metric['id'][];
  metrics: GlobalMetric[];
  reload: VoidFn;
};

export const EditMetricsBatch: FC<EditMetricsBatchProps> = ({
  selectedMetricsIds,
  metrics,
  reload,
}) => {
  const [showDeleteBatch, setShowDeleteBatch] = useState(false);

  const finishDelete = useCallback(() => {
    setShowDeleteBatch(false);
    reload();
  }, [reload]);

  const proceedDelete = useCallback(() => {
    if (!selectedMetricsIds.length) return;

    deleteGlobalMetricsBatch(selectedMetricsIds).then(finishDelete);
  }, [finishDelete, selectedMetricsIds]);

  const updateMetricsData = useCallback(
    (values) => {
      updateGlobalMetricsBatch(selectedMetricsIds, values).then(reload);
    },
    [reload, selectedMetricsIds],
  );

  return (
    <>
      <EditMetricsLine selectedMetricIds={selectedMetricsIds}>
        <CategoryPopover
          // selectedMetricIds={selectedMetricsIds}
          selectedMetricIds={[]} // disables "Edit Category"
          setParam={updateMetricsData}
          showIcon
        />
        <TagsPopover
          selectedMetricIds={selectedMetricsIds}
          setParam={updateMetricsData}
          metrics={metrics}
          showIcon
        />
        {/* To enable, set disabled condition to !selectedMetricsIds.length */}
        <Delete disabled onClick={(): void => setShowDeleteBatch(true)} />
      </EditMetricsLine>
      <BatchDelete
        visible={showDeleteBatch}
        onClose={(): void => setShowDeleteBatch(false)}
        onConfirm={proceedDelete}
      />
    </>
  );
};
