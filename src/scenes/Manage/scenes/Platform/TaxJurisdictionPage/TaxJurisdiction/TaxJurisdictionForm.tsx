import React, { FC, useEffect } from 'react';
import { Col, Form, Row, Input, Button, Space } from 'antd';
import 'react-quill/dist/quill.snow.css';
import { nameFieldRules, required } from 'tools/formRules';

import {
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_THIRD_ROW_SPAN,
  GRID_GUTTER,
} from 'constants/ui';
import { taxJurisdictionStore } from 'store';
import { VoidFn } from 'types';
import { observer } from 'mobx-react';

export interface TaxJurisdictionFormProps {
  onFinish: (values: any) => void;
  formId: string;
  onCancel: VoidFn;
}

export const TaxJurisdictionForm: FC<TaxJurisdictionFormProps> = observer(
  ({ onFinish, formId, onCancel }) => {
    /**
     * Hooks
     */
    const [form] = Form.useForm();

    const { taxJurisdiction, isEditTaxJurisdiction } = taxJurisdictionStore;

    const defaultValues = isEditTaxJurisdiction
      ? {
          id: taxJurisdiction?.id,
          name: taxJurisdiction?.name,
          language: taxJurisdiction?.language,
          country: taxJurisdiction?.country,
        }
      : {};

    localStorage.setItem('defaultValues', JSON.stringify(defaultValues));

    /**
     * Effects
     */
    useEffect(() => {
      const storedDefaultValues = localStorage.getItem('defaultValues');

      if (storedDefaultValues) {
        form.setFieldsValue(JSON.parse(storedDefaultValues));
      }
    }, [form]);

    return (
      <Form
        id={formId}
        onFinish={onFinish}
        layout="vertical"
        form={form}
        initialValues={defaultValues}
      >
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <Form.Item
              name="country"
              label="Country"
              rules={[required(), ...nameFieldRules]}
            >
              <Input placeholder="Enter Country" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <Form.Item
              name="language"
              label="Language"
              rules={[required(), ...nameFieldRules]}
            >
              <Input placeholder="Enter Language" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <Form.Item
              name="name"
              label="Name"
              rules={[required(), ...nameFieldRules]}
            >
              <Input placeholder="Enter Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_COL_FULL_ROW_SPAN, 0]}>
          <Col span={GRID_COL_FULL_ROW_SPAN}>
            <Form.Item>
              <Space>
                <Button
                  id="cancelCreateNewTaxJurisdictionButton"
                  type="default"
                  htmlType="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button
                  id="createNewTaxJurisdictionButton"
                  type="primary"
                  htmlType="submit"
                >
                  Save
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  },
);
