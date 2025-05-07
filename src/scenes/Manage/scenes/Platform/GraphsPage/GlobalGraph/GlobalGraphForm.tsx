import React, { FC, useEffect } from 'react';
import { Col, Form, Row, Select, Input, Checkbox, Button, Space } from 'antd';
import 'react-quill/dist/quill.snow.css';
import { nameFieldRules, required } from 'tools/formRules';

import {
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_THIRD_ROW_SPAN,
  GRID_GUTTER,
} from 'constants/ui';
import { globalGraphsStore } from 'store';
import { VoidFn } from 'types';
import { observer } from 'mobx-react';
import TextArea from 'antd/lib/input/TextArea';

export interface GlobalGraphFormProps {
  onFinish: (values: any) => void;
  formId: string;
  onCancel: VoidFn;
}

export const GlobalGraphForm: FC<GlobalGraphFormProps> = observer(
  ({ onFinish, formId, onCancel }) => {
    /**
     * Hooks
     */
    const [form] = Form.useForm();

    const {
      globalGraph,
      isEditGraph,
      graphTypes,
      unitTypes,
      periodTypes,
      setGraphTypes,
      setUnitTypes,
      setPeriodTypes,
      setIsEditGraph,
      getGraphTypes,
      getUnitTypes,
      getPeriodTypes,
    } = globalGraphsStore;

    /**
     * Handlers
     */

    /**
     * Variables
     */
    const numberOfPeriodsOptions = Array.from({ length: 99 }, (_, index) => ({
      label: `${index + 1}`,
      value: `${index + 1}`,
    }));

    const defaultValues = isEditGraph
      ? {
          id: globalGraph?.id,
          title: globalGraph?.title,
          code: globalGraph?.code,
          active: globalGraph?.active,
          graphType: globalGraph?.graphType,
          unitType: globalGraph?.unitType,
          showInterim: globalGraph?.showInterim,
          showPeriodNumber: globalGraph?.showPeriodNumber,
          showPeriodType: globalGraph?.showPeriodType,
          notes: globalGraph?.notes,
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

      getGraphTypes();
      getUnitTypes();
      getPeriodTypes();
    }, [getGraphTypes, getUnitTypes, getPeriodTypes, form]);

    useEffect(() => {
      getGraphTypes();
      getUnitTypes();
      getPeriodTypes();
    }, []);

    return (
      <Form
        id={formId}
        onFinish={onFinish}
        layout="vertical"
        onValuesChange={() => setIsEditGraph(true)}
        form={form}
        initialValues={defaultValues}
      >
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <Form.Item
              name="title"
              label="Title"
              rules={[required(), ...nameFieldRules]}
            >
              <Input placeholder="Enter Title" />
            </Form.Item>
          </Col>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <Form.Item
              name="code"
              label="Code"
              rules={[required(), ...nameFieldRules]}
            >
              <Input placeholder="Enter code" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <Form.Item name="graphType" label="Graph Type" rules={[required()]}>
              <Select
                placeholder="Select Graph type"
                options={
                  Array.isArray(graphTypes)
                    ? graphTypes.map((field) => ({
                        value: field,
                      }))
                    : []
                }
                onChange={(value: string): void => {
                  setGraphTypes(value);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <Form.Item name="unitType" label="Unit Type" rules={[required()]}>
              <Select
                placeholder="Select Unit type"
                options={
                  Array.isArray(unitTypes)
                    ? unitTypes.map((field) => ({
                        value: field,
                      }))
                    : []
                }
                onChange={(value: string): void => {
                  setUnitTypes(value);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <Form.Item name="showInterim" valuePropName="checked">
              <Checkbox>Show Interim Data: </Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <Form.Item
              name="showPeriodNumber"
              label="Show # of periods:"
              rules={[]}
            >
              <Select
                placeholder=" # of periods"
                options={numberOfPeriodsOptions}
              />
            </Form.Item>
          </Col>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <Form.Item
              name="showPeriodType"
              label="Show period type:"
              rules={[]}
            >
              <Select
                placeholder="Type of periods"
                options={
                  Array.isArray(periodTypes)
                    ? periodTypes.map((field) => ({
                        value: field,
                      }))
                    : []
                }
                onChange={(value: string): void => {
                  setPeriodTypes(value);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <Form.Item name="notes" label="CDFIs Notes:">
              <TextArea
                placeholder="Enter CDFIs Notes"
                showCount
                maxLength={500}
              >
                CDFIs Notes:
              </TextArea>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_COL_FULL_ROW_SPAN, 0]}>
          <Col span={GRID_COL_FULL_ROW_SPAN}>
            <Form.Item>
              <Space>
                <Button
                  id="cancelCreateNewGraphButton"
                  type="default"
                  htmlType="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button
                  id="createNewGraphButton"
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
