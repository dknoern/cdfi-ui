import React, { FC } from 'react';
import { Form, Input, Row, Col } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { GRID_GUTTER, GRID_COL_HALF_ROW_SPAN } from 'constants/ui';
import { FormLabelWithIcon } from 'components';
import { locationFields } from '../constants';

export const Location: FC = () => {
  return (
    <>
      {locationFields.map((field) => (
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item
              label={
                <FormLabelWithIcon
                  description={field.help}
                  text={field.title}
                  icon={QuestionCircleOutlined}
                />
              }
              name={['address', field.name]}
              id={`address_${field.name}`}
            >
              {field.inputComponent ?? (
                <Input placeholder={field.placeholder} />
              )}
            </Form.Item>
          </Col>
        </Row>
      ))}
    </>
  );
};
