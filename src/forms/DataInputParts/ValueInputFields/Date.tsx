import React, { FC, useState } from 'react';
import { Form, Row, Col } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { CustomAntInput } from 'types/misc';
import { GRID_GUTTER, GRID_COL_FULL_ROW_SPAN } from 'constants/ui';
import { metricValueRules } from 'constants/forms';
import { FormLabelWithIcon } from 'components';
import { DatePicker } from 'components/DatePicker';
import { unicodeFormat2moment } from 'tools/date';
import { required } from 'tools/formRules';
import { ValueFieldProps } from '../types';

const UpdatedDateInput: FC<
  CustomAntInput<string | undefined> & { dateFormat: string }
> = ({ dateFormat, onChange }) => {
  const [value, setValue] = useState<string | undefined>();

  return (
    <DatePicker
      format={unicodeFormat2moment(dateFormat)}
      onChange={(dateString: string): void => {
        const result = dateString.length ? dateString : undefined;

        setValue(result);

        if (onChange) onChange(result);
      }}
      value={value}
    />
  );
};

export const Date: FC<ValueFieldProps> = ({ metric, nameField }) => {
  return (
    <Row gutter={[GRID_GUTTER, 0]}>
      <Col span={GRID_COL_FULL_ROW_SPAN / 2}>{nameField}</Col>
      <Col span={GRID_COL_FULL_ROW_SPAN / 2}>
        <Form.Item
          label={
            <FormLabelWithIcon
              description="Type here new metric value."
              text="New value"
              icon={QuestionCircleOutlined}
            />
          }
          name="value"
          validateFirst
        >
          <UpdatedDateInput
            dateFormat={metric.typeConfig.dateFormat as string}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
