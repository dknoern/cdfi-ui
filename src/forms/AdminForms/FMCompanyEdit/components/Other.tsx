import React, { FC } from 'react';
import { Form, Row, Col } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { GRID_GUTTER, GRID_COL_HALF_ROW_SPAN } from 'constants/ui';
import { FormLabelWithIcon } from 'components';
import { PhoneInput } from 'components/PhoneInput';

export const Other: FC = () => {
  return (
    <>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            label={
              <FormLabelWithIcon
                description="Type here the phone to contact with Aeris Client company"
                text="Phone"
                icon={QuestionCircleOutlined}
              />
            }
            name="phone"
          >
            <PhoneInput placeholder="Enter phone" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
