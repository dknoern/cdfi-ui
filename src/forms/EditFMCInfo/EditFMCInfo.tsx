import React, { FC } from 'react';
import { Form, Row, Col, Input } from 'antd';
import { FormProps } from 'antd/lib/form';
import { CompanyInfoBase } from 'types/company';
import {
  FORM_ITEM_VERTICAL_LABEL_SPAN,
  GRID_GUTTER,
  GRID_COL_HALF_ROW_SPAN,
  FORM_LABEL_GUTTER_VERTICAL,
} from 'constants/ui';
import { FormSecondaryLabel } from 'components';
import {
  maxLength,
  minLength,
  required,
  restrictWhitespace,
} from 'tools/formRules';
import { addressFields } from './constants';
import { makeListKey } from './tools';
import styles from './EditFMCInfo.module.scss';

type EditFMCInfoProps = {
  formId: string;
  initialValues: Partial<CompanyInfoBase>;
  onFinish?: FormProps['onFinish'];
};
export const EditFMCInfo: FC<EditFMCInfoProps> = ({
  formId,
  initialValues,
  onFinish,
}) => {
  return (
    <Form
      id={formId}
      size="middle"
      hideRequiredMark
      labelCol={{ span: FORM_ITEM_VERTICAL_LABEL_SPAN }}
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col lg={GRID_COL_HALF_ROW_SPAN} flex="auto">
          <Form.Item
            name="name"
            label={
              <FormSecondaryLabel
                text="1. Company Name"
                className={styles.primaryLabel}
              />
            }
            rules={[required(), minLength(), maxLength(), restrictWhitespace()]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, FORM_LABEL_GUTTER_VERTICAL]}>
        <Col>
          <FormSecondaryLabel
            text="2. Address"
            className={styles.primaryLabel}
          />
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        {addressFields.map((field) => (
          <Col span={GRID_COL_HALF_ROW_SPAN} key={makeListKey(field.name)}>
            <Form.Item
              name={field.name}
              rules={field.rules}
              label={<FormSecondaryLabel text={field.label} />}
              className={styles.secondaryLabel}
            >
              {field.inputComponent ?? (
                <Input placeholder={field.placeholder} />
              )}
            </Form.Item>
          </Col>
        ))}
      </Row>
    </Form>
  );
};
