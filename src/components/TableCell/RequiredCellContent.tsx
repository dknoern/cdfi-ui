import React, { FC } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { MetricType, MetricTypeConfig } from 'types';
import { MetricValue } from 'types/metricValue';
import { amount2TableValue } from 'tools/reportedData';
import { userStore } from 'store';
import { WithRecord } from './types';
import { DisplayValue } from './DisplayValue';

type RequiredCellContentProps = WithRecord<{
  metricTypeConfig: MetricTypeConfig;
  currentValue: MetricValue;
}>;

export const RequiredCellContent: FC<RequiredCellContentProps> = React.memo(
  ({ currentValue, metricTypeConfig, record }) => {
    if (currentValue === '' && !userStore.isFM)
      return (
        <>
          Please add data <EditOutlined />
        </>
      );

    let displayValue = currentValue;
    if (currentValue !== '' && metricTypeConfig.type === MetricType.NUMERIC) {
      displayValue = amount2TableValue(
        currentValue as number,
        metricTypeConfig,
      );
    }

    return <DisplayValue displayValue={displayValue} record={record} />;
  },
);
