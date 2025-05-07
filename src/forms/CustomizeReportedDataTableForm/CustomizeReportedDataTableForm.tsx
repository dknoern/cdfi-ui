import React, { FC, ReactNode, useCallback } from 'react';
import { Checkbox, Col, Form, Row, Select } from 'antd';
import { FormProps } from 'antd/es/form';
import {
  reportedDataTableConfigDefaultValues,
  reportedDataTableDisplayTypeNames,
  reportedDataTableConfigFields,
} from 'constants/reportedDataTableConfig';
import { ReportedDataTableConfig } from 'types/reportedDataTableConfig';
import { GRID_COL_HALF_ROW_SPAN } from 'constants/ui';
import { FormDefaultLabel } from 'components';
import styles from './CustomizeReportedDataTableForm.module.scss';

type CustomizeReportedDataTableFormProps = {
  formId: string;
  onValuesChange?: FormProps['onValuesChange'];
  initialValues?: ReportedDataTableConfig;
  onFinish: NonNullable<FormProps['onFinish']>;
};

export const CustomizeReportedDataTableForm: FC<CustomizeReportedDataTableFormProps> = ({
  formId,
  initialValues,
  onValuesChange,
  onFinish,
}) => {
  const [form] = Form.useForm();

  const handleValuesChange = useCallback<
    NonNullable<FormProps['onValuesChange']>
  >(
    (changedValues, values) => {
      const result = {
        ...values,
        [reportedDataTableConfigFields.showAnnualSummaryColumn]:
          values[reportedDataTableConfigFields.displayType] ===
            'QUARTER_TO_DATE' &&
          values[reportedDataTableConfigFields.showAnnualSummaryColumn],
      };

      form.setFieldsValue(result);

      if (onValuesChange) onValuesChange(result, result);
    },
    [form, onValuesChange],
  );

  return (
    <Form
      id={formId}
      form={form}
      layout="vertical"
      initialValues={initialValues ?? reportedDataTableConfigDefaultValues}
      onValuesChange={handleValuesChange}
      onFinish={onFinish}
    >
      <Row>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name={reportedDataTableConfigFields.displayType}
            label={<FormDefaultLabel text="Report Type" />}
            className={styles.formItem}
          >
            <Select
              options={Object.keys(reportedDataTableDisplayTypeNames).map(
                (key) => ({
                  value: key,
                  label:
                    reportedDataTableDisplayTypeNames[
                      key as ReportedDataTableConfig['displayType']
                    ],
                }),
              )}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Item
            noStyle
            dependencies={[reportedDataTableConfigFields.displayType]}
          >
            {({ getFieldValue }): ReactNode => {
              const isYTD =
                (getFieldValue(
                  reportedDataTableConfigFields.displayType,
                ) as ReportedDataTableConfig['displayType']) ===
                'ANNUAL_TO_DATE';

              return (
                <Form.Item
                  name={reportedDataTableConfigFields.showAnnualSummaryColumn}
                  valuePropName="checked"
                >
                  <Checkbox disabled={isYTD}>
                    Show annual summary column
                  </Checkbox>
                </Form.Item>
              );
            }}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
