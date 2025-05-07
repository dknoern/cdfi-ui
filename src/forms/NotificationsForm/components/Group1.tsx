import React, { FC } from 'react';
import { Typography, Form, Row, Col, Select, Input } from 'antd';
import { typography } from 'constants/typography';
import {
  GRID_GUTTER,
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_HALF_ROW_SPAN,
} from 'constants/ui';
import { DatePicker } from 'components';
import { maxLength, required, restrictWhitespace } from 'tools/formRules';
import {
  TEXT_AREA_ROWS,
  SWITCH_COL_SPAN,
  SWITCH_INFO_COL_SPAN,
} from '../constants';
import { NotificationsFormGroup } from './types';
import styles from '../NotificationsForm.module.scss';

const { Text } = Typography;

const {
  initialNotificationsTitle,
  initialNotificationsHint,
  initialNotificationsMessageHint,
} = typography('portfolioCompanyCreation');

export const Group1: FC<NotificationsFormGroup> = ({
  editable,
  contactOptions,
}) => {
  return (
    <Row gutter={[GRID_GUTTER - 6, 0]}>
      <Col span={SWITCH_COL_SPAN}>&nbsp;</Col>
      <Col span={SWITCH_INFO_COL_SPAN}>
        <Text className={styles.text}>{initialNotificationsTitle}</Text>
        <br />
        <Text type="secondary" className={styles.text}>
          {initialNotificationsHint}
        </Text>
        <Row gutter={[GRID_GUTTER, 0]} className={styles.with12pxTopMargin}>
          <Col span={GRID_COL_HALF_ROW_SPAN - 2}>
            <Form.Item
              name={['forPC', 'initial', 'date']}
              labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
              label="Notification Date"
              colon={false}
              rules={[required(), restrictWhitespace()]}
            >
              <DatePicker disabled={!editable} />
            </Form.Item>
          </Col>
          <Col span={GRID_COL_HALF_ROW_SPAN - 2}>
            <Form.Item
              name={['forPC', 'initial', 'email']}
              labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
              label="Client Contact"
              colon={false}
            >
              <Select
                showSearch
                disabled={!editable}
                options={contactOptions}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Text type="secondary">{initialNotificationsMessageHint}</Text>
          <br />
          <Form.Item
            name={['forPC', 'initial', 'message']}
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
