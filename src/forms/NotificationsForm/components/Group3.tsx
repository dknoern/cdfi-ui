import React, { FC } from 'react';
import { Typography, Form, Row, Col, Switch, Select, Input } from 'antd';
import { typography } from 'constants/typography';
import {
  GRID_GUTTER,
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_HALF_ROW_SPAN,
} from 'constants/ui';
import { maxLength } from 'tools/formRules';
import {
  TEXT_AREA_ROWS,
  SWITCH_COL_SPAN,
  SWITCH_INFO_COL_SPAN,
} from '../constants';
import { NotificationsFormGroup } from './types';
import styles from '../NotificationsForm.module.scss';

const { Text } = Typography;

const { pastDueMessageHint } = typography('portfolioCompanyCreation');

export const Group3: FC<NotificationsFormGroup> = ({
  editable,
  contactOptions,
}) => {
  return (
    <Row gutter={[GRID_GUTTER - 6, 0]}>
      <Col span={SWITCH_COL_SPAN}>
        <Form.Item name={['forPC', 'pastDue', 'on']} valuePropName="checked">
          <Switch
            title="Notify Reporting Entity if their reports are past due"
            size="small"
            disabled={!editable}
          />
        </Form.Item>
      </Col>
      <Col span={SWITCH_INFO_COL_SPAN}>
        <Text className={styles.text}>
          Notify Reporting Entity if their reports are past due
        </Text>
        <br />
        <Row gutter={[GRID_GUTTER, 0]} className={styles.with12pxTopMargin}>
          <Col span={GRID_COL_HALF_ROW_SPAN - 2}>
            <Form.Item
              name={['forPC', 'pastDue', 'email']}
              labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
              label="Client Contact"
              colon={false}
            >
              <Select
                showSearch
                optionFilterProp="children"
                disabled={!editable}
                options={contactOptions}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Text type="secondary">{pastDueMessageHint}</Text>
          <br />
          <Form.Item
            name={['forPC', 'pastDue', 'message']}
            rules={[maxLength(1000)]}
          >
            <Input.TextArea
              className={styles.textArea}
              rows={TEXT_AREA_ROWS}
              readOnly={!editable}
            />
          </Form.Item>
        </Form.Item>
      </Col>
    </Row>
  );
};
