import React, { FC } from 'react';
import { Form, Row, Col, Select } from 'antd';
import {
  GRID_GUTTER,
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_QUARTER_ROW_SPAN,
} from 'constants/ui';
import { FormSecondaryLabel, FormPrimaryLabel } from 'components';
import { Company } from 'types';
import { fieldRules } from './constants';

type ContactGroupProps = {
  availableContacts: Company['contacts'];
};

export const ContactGroup: FC<ContactGroupProps> = ({ availableContacts }) => {
  return (
    <>
      <FormPrimaryLabel num={4} text="Contact Information" />
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_QUARTER_ROW_SPAN}>
          <Form.Item
            name="primaryContactId"
            rules={fieldRules.primaryContactId}
            label={<FormSecondaryLabel text="Primary contact" />}
            labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
            dependencies={['pcId']}
          >
            <Select
              placeholder="Select user"
              options={availableContacts.map((item) => ({
                value: item.id,
                label: `${item.name} ${item.surname}`,
              }))}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
