import React from 'react';
import { BasicModal } from 'modals/BasicModal';
import { ImpactPerformance } from 'scenes/RatingsDefinitions/ImpactPerformance';
import { StarFilled } from '@ant-design/icons';

type ImpactDefinitionsModalProps = {
  isVisible: boolean;
  onCancel: () => void;
};

export const ImpactDefinitionsModal = ({
  isVisible,
  onCancel,
}: ImpactDefinitionsModalProps) => {
  const getStarIcons = (amount: number) => {
    // @ts-ignore
    const arr = Array.apply(null, { length: amount }).map(Number.call, Number);

    return (
      <div>
        {arr.map((item, index) => (
          <StarFilled key={`${index}-${item}`} />
        ))}
      </div>
    );
  };
  return (
    <BasicModal visible={isVisible} title="" onCancel={onCancel} closable>
      <ImpactPerformance getStarIcons={getStarIcons} />
    </BasicModal>
  );
};
