import React, { FC } from 'react';
import { Form, Checkbox, Select } from 'antd';
import { PositionsConfig } from 'types/graphs';
import { legendPositionName } from 'forms/ChartCreate/constants';
import { FormSecondaryLabel } from 'components';

export const Legend: FC = () => {
  return (
    <>
      <Form.Item name={['formatChart', 'legend']} valuePropName="checked">
        <Checkbox>Display Legend</Checkbox>
      </Form.Item>
      <Form.Item
        name={['formatChart', 'legendPosition']}
        label={<FormSecondaryLabel text="Position" />}
      >
        <Select
          options={Object.keys(legendPositionName).map((value) => ({
            label: legendPositionName[value as PositionsConfig],
            value,
          }))}
        />
      </Form.Item>
    </>
  );
};
