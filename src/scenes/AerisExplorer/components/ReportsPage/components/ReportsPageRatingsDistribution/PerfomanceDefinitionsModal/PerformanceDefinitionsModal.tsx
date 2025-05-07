import React from 'react';
import { BasicModal } from 'modals/BasicModal';
import { FinancialPerformance } from 'scenes/RatingsDefinitions/FinancialPerformance';

type PerformanceDefinitionsModalProps = {
  isVisible: boolean;
  onCancel: () => void;
};

export const PerformanceDefinitionsModal = ({
  isVisible,
  onCancel,
}: PerformanceDefinitionsModalProps) => {
  return (
    <BasicModal visible={isVisible} title="" onCancel={onCancel} closable>
      <FinancialPerformance />
    </BasicModal>
  );
};
