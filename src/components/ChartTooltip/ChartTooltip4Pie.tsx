import React, { FC } from 'react';
import { PieDatumWithColor } from '@nivo/pie';
import styles from './ChartTooltip.module.scss';

export const ChartTooltip4Pie: FC<
  PieDatumWithColor & { formattedValue?: string; label?: string }
> = ({ formattedValue, color, label }) => {
  return (
    <>
      <span
        style={{
          background: color,
        }}
        className={styles.colorMark}
      />
      {label}
      <strong className={styles.value}>{formattedValue}</strong>
    </>
  );
};
