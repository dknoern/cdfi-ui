import React, { FC } from 'react';
import { PointTooltipProps } from '@nivo/line';
import styles from './ChartTooltip.module.scss';

export const ChartTooltip4Line: FC<PointTooltipProps> = ({ point }) => {
  const {
    data: { x, y, formattedY },
    serieColor,
    serieId,
  } = point as any; // TODO type this properly
  return (
    <div className={styles.container}>
      <span
        className={styles.colorMark}
        style={{ backgroundColor: serieColor }}
      />
      {serieId} - {x}:<strong className={styles.value}>{formattedY}</strong>
    </div>
  );
};
