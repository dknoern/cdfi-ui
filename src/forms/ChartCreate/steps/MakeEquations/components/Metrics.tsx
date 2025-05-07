import React, { FC } from 'react';
import { Button } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { GlobalMetric } from 'types';
import { FormPrimaryLabel, ConditionalTooltip } from 'components';
import { isTextLong } from 'tools';
import styles from '../MakeEquations.module.scss';

type MetricsProps = {
  metrics: GlobalMetric[];
  handleMetricsClick: (event: React.MouseEvent, index: number) => void;
};

export const Metrics: FC<MetricsProps> = ({ metrics, handleMetricsClick }) => {
  return (
    <>
      <FormPrimaryLabel text="Metrics" />
      <div className={styles.listWrapper}>
        <Scrollbars autoHeight autoHeightMax="350px">
          <ul id="selectedMetricsList" className={styles.list}>
            {metrics.map((metric, index) => (
              <ConditionalTooltip
                condition={isTextLong(metric.name)}
                tooltipTitle={metric.name}
                key={metric.id}
              >
                <li>
                  <Button
                    type="ghost"
                    onClick={(event): void => {
                      handleMetricsClick(event, index);
                    }}
                  >
                    {metric.name}
                  </Button>
                </li>
              </ConditionalTooltip>
            ))}
          </ul>
        </Scrollbars>
      </div>
    </>
  );
};
