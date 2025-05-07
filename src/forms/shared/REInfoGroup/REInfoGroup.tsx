import React, { FC } from 'react';
import { Form, Row, Col, Input } from 'antd';
import {
  GRID_GUTTER,
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_FULL_ROW_SPAN,
} from 'constants/ui';
import { addressFields as addressFieldsRaw } from 'forms/constants';
import { FormPrimaryLabel } from 'components';
import {
  maxLength,
  minLength,
  required,
  restrictWhitespace,
} from 'tools/formRules';
import { makeFieldKey } from 'tools/formTools';

const SCOPE_ADDRESS = 'address';

const addressFields = addressFieldsRaw
  .filter((item) => item.name !== 'street') // BC specific field
  .map((field) => ({
    ...field,
    name: [SCOPE_ADDRESS, field.name],
    inputComponent: field.inputComponent ?? (
      <Input placeholder={field.placeholder} />
    ),
  }));

export const REInfoGroup: FC = () => {
  return (
    <>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col lg={GRID_COL_HALF_ROW_SPAN} flex="auto">
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              <Form.Item
                name="name"
                label={
                  <FormPrimaryLabel num={1} text="Reporting Entity Name" />
                }
                rules={[
                  required(),
                  minLength(),
                  maxLength(),
                  restrictWhitespace(),
                ]}
              >
                <Input placeholder="Enter Name" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col lg={GRID_COL_HALF_ROW_SPAN} flex="auto">
          <Form.Item
            label={<FormPrimaryLabel num={2} text="Address" hint="Optional" />}
          >
            <Row gutter={[GRID_GUTTER, 0]}>
              <Col span={GRID_COL_FULL_ROW_SPAN}>
                <Form.Item
                  name={[SCOPE_ADDRESS, 'street']}
                  rules={[minLength(), maxLength(), restrictWhitespace()]}
                >
                  <Input placeholder="Street" />
                </Form.Item>
              </Col>
              {addressFields.map((field) => (
                <Col span={10} key={makeFieldKey(field.name)}>
                  <Form.Item name={field.name} rules={field.rules}>
                    {field.inputComponent}
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
