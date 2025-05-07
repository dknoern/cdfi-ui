import React, { FC, useState } from 'react';
import { Form, Button, Select } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { MetricSharePeriod, VoidFn } from 'types';
import { uiText } from 'constants/uiText';
import { metricSharePeriodNames } from 'constants/metricSharePeriod';
import { withFrequencyPrefix } from './tools';
import styles from '../Popover.module.scss';

export type FrequencySelectorProps = {
  onCancel: VoidFn;
  onSubmit: (values: Store) => void;
  initialValues?: Store;
  isEdit?: boolean;
};

export const FrequencySelector: FC<FrequencySelectorProps> = ({
  onCancel,
  onSubmit,
  initialValues,
  isEdit = true,
}) => {
  const [selected, setSelected] = useState<MetricSharePeriod | undefined>(
    undefined,
  );

  return (
    <div className={styles.container}>
      <Form
        layout="vertical"
        size="middle"
        onFinish={onSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          label={uiText('metrics', isEdit ? 'updateFrequency' : 'setFrequency')}
          name="frequency"
        >
          <Select
            placeholder="Select Frequency"
            options={Object.values(MetricSharePeriod).map((value) => ({
              label: metricSharePeriodNames[value],
              value,
            }))}
            onChange={(value: MetricSharePeriod): void => {
              setSelected(value);
            }}
          />
        </Form.Item>
        <div className={styles.buttons}>
          <Button
            id={withFrequencyPrefix('cancelButton')}
            htmlType="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            id={withFrequencyPrefix('updateButton')}
            type="primary"
            htmlType="submit"
            disabled={!selected}
          >
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};
