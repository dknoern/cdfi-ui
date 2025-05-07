import React, { FC } from 'react';
import { BarExtendedDatum } from '@nivo/bar';
import styles from './ChartTooltip.module.scss';

interface TooltipValues {
  actualValues: { [key: string]: number };
}

export const ChartTooltip4Bar: FC<BarExtendedDatum> = ({
  id,
  color,
  indexValue,
  data,
}: BarExtendedDatum) => {
  const { actualValues } = (data as unknown) as TooltipValues;
  return (
    <>
      <span
        style={{
          background: color,
        }}
        className={styles.colorMark}
      />
      {id} - {indexValue}:
      <strong className={styles.value}>{actualValues[id]}</strong>
    </>
  );
};
