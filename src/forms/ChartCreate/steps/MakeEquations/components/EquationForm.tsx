import React, { FC, useEffect, useRef } from 'react';
import { Col, Form, Row, Button, Input, Space, Radio, Select } from 'antd';
import { VoidFn, MetricNumericFormat, GlobalMetric } from 'types';
import {
  GRID_COL_FULL_ROW_SPAN,
  FORM_ITEM_VERTICAL_LABEL_SPAN,
  GRID_GUTTER,
} from 'constants/ui';
import { MAX_LENGTH_TEXT } from 'constants/validation';
import { Dialog } from 'tools';
import { maxLength } from 'tools/formRules';
import { FormPrimaryLabel } from 'components';
import { Equation } from 'forms/ChartCreate/types';
import { equationFormatNames } from 'forms/ChartCreate/constants';
import { EquationUpdater } from '../types';
import { decimalPlaces, nameRules } from '../constants';
import { FormulaConstructor } from './FormulaConstructor';
import styles from '../MakeEquations.module.scss';

type EquationFormProps = {
  currentItem: null | Equation;
  onFinish: EquationUpdater;
  onCancel: VoidFn;
  metrics?: GlobalMetric[];
};

export const EquationForm: FC<EquationFormProps> = ({
  currentItem,
  onFinish,
  onCancel,
  metrics,
}) => {
  const itemRef = useRef<Equation | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const reInit = (): void => {
      form.resetFields(); // to CURRENT initialData
      itemRef.current = currentItem;
    };

    // save current item
    if (form.isFieldsTouched(['name', 'formula'])) {
      // confirm saving
      Dialog.confirm({
        title: 'Save changes?',
        content:
          'You have changed formula. Save changes before switching to new item?',
        onOk: () => {
          onFinish({
            ...form.getFieldsValue(),
            id: itemRef.current ? itemRef.current.id : undefined,
          });
          reInit();
        },
        onCancel: reInit,
        okText: 'Save and switch',
        cancelText: "Don't save",
      });
    } else {
      reInit();
    }
  }, [form, currentItem, onFinish]);

  return (
    <Form
      form={form}
      id="formulaForm"
      size="large"
      labelCol={{ span: FORM_ITEM_VERTICAL_LABEL_SPAN }}
      onFinish={(values): void => {
        form.resetFields();
        onFinish(values);
      }}
      hideRequiredMark
      initialValues={
        currentItem ?? {
          name: '',
          formula: '',
          format: 'NUMBER',
          decimals: 0,
        }
      }
      preserve
    >
      <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item
            name="name"
            className={styles.formItem}
            label={<FormPrimaryLabel text="Formula name" />}
            rules={nameRules[currentItem ? 'edit' : 'create']}
          >
            <Input placeholder="Formula Name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item
            name="formula"
            className={styles.formItem}
            label={<FormPrimaryLabel text="Formula" />}
            rules={[maxLength(MAX_LENGTH_TEXT)]}
          >
            <FormulaConstructor metrics={metrics} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
        <Col>
          <Form.Item
            name="format"
            className={styles.formItem}
            label={<FormPrimaryLabel text="Data type" />}
          >
            <Radio.Group>
              {Object.keys(MetricNumericFormat).map((numberFormat) => (
                <Radio key={numberFormat} value={numberFormat}>
                  {equationFormatNames[numberFormat as MetricNumericFormat]}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="decimals"
            className={styles.formItem}
            label={<FormPrimaryLabel text="Decimal places" />}
          >
            <Select>
              {decimalPlaces.map((decimal) => (
                <Select.Option key={decimal} value={decimal}>
                  {decimal}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Space>
          <Button id="addEquationButton" type="primary" htmlType="submit">
            {currentItem ? 'Save' : 'Add formula to table'}
          </Button>
          {!!currentItem && (
            <Button
              id="cancelEquationEditButton"
              type="default"
              htmlType="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};
