import React, { FC } from 'react';
import { VoidFn } from 'types';
import { GraphPreviewViewWithMetricData } from 'types/graphs';
import { MODAL_WIDTH } from 'constants/ui';
import { BasicModal } from 'modals/BasicModal';
import { ChartContent } from './ChartContent';

type ChartModalProps = {
  visible: boolean;
  onCancel: VoidFn;
  graph: GraphPreviewViewWithMetricData;
  isLoading: boolean;
  onEdit: VoidFn;
};

export const ChartModal: FC<ChartModalProps> = ({
  visible,
  onCancel,
  graph,
  isLoading,
  onEdit,
}) => {
  return (
    <BasicModal
      visible={visible}
      title={graph.name}
      onCancel={onCancel}
      width={MODAL_WIDTH.LARGE}
    >
      <ChartContent graph={graph} isLoading={isLoading} onEdit={onEdit} />
    </BasicModal>
  );
};
