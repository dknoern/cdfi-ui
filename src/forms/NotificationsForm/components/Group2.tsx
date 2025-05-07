import React, { FC } from 'react';
import {
  Typography,
  Form,
  Row,
  Col,
  Switch,
  Select,
  Input,
  InputNumber,
} from 'antd';
import { typography } from 'constants/typography';
import {
  GRID_GUTTER,
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_HALF_ROW_SPAN,
} from 'constants/ui';
import { maxLength, minValue, maxValue } from 'tools/formRules';
import {
  TEXT_AREA_ROWS,
  SWITCH_COL_SPAN,
  SWITCH_INFO_COL_SPAN,
} from '../constants';
import { NotificationsFormGroup } from './types';
import styles from '../NotificationsForm.module.scss';

const { Text } = Typography;

const {
  upcomingDueDateText,
  upcomingDueDateHint,
  upcomingDueDateMessageHint,
} = typography('portfolioCompanyCreation');

export const Group2: FC<NotificationsFormGroup> = ({
  editable,
  contactOptions,
}) => {
  return (
    <Row gutter={[GRID_GUTTER - 6, 0]}>
      <Col span={SWITCH_COL_SPAN}>
        <Form.Item name={['forPC', 'upcoming', 'on']} valuePropName="checked">
          <Switch size="small" disabled={!editable} />
        </Form.Item>
      </Col>
      <Col span={SWITCH_INFO_COL_SPAN}>
        <Text className={styles.text}>{upcomingDueDateText}</Text>
        <br />
        <Text type="secondary" className={styles.text}>
          {upcomingDueDateHint}
        </Text>
        <Row gutter={[GRID_GUTTER, 0]} className={styles.with12pxTopMargin}>
          <Col span={GRID_COL_HALF_ROW_SPAN - 2}>
            <Form.Item
              name={['forPC', 'upcoming', 'dayCount']}
              labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
              label="Day Count"
              colon={false}
              rules={[minValue(0), maxValue(364)]}
            >
              <InputNumber
                placeholder="Enter Day Count"
                className={styles.fullWidth}
                disabled={!editable}
              />
            </Form.Item>
          </Col>
          <Col span={GRID_COL_HALF_ROW_SPAN - 2}>
            <Form.Item
              name={['forPC', 'upcoming', 'email']}
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
          <Text type="secondary">{upcomingDueDateMessageHint}</Text>
          <br />
          <Form.Item
            name={['forPC', 'upcoming', 'message']}
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
