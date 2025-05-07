import React, { FC } from 'react';
import { Form, Row, Col, Select } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Company } from 'types';
import { GRID_GUTTER, GRID_COL_FULL_ROW_SPAN } from 'constants/ui';
import { FormLabelWithIcon } from 'components';
import { getPopupContainer } from 'tools/antConfig';
import { usePCCompanies } from 'dataManagement';

type PickerProps = {
  value?: Company['id'][];
  onChange?: (value: Company['id'][]) => void;
};

const CompanyPicker: FC<PickerProps> = ({ value = [], onChange }) => {
  const { data: companies } = usePCCompanies();

  return (
    <Select
      mode="multiple"
      onChange={onChange}
      value={value}
      showSearch
      optionFilterProp="children"
      placeholder="Select subscribers"
      getPopupContainer={getPopupContainer}
    >
      {(companies ?? [])
        .filter((item) => item.active)
        .map((company) => (
          <Select.Option key={company.id} value={company.id}>
            {company.name}
          </Select.Option>
        ))}
    </Select>
  );
};

export const Subscribers: FC = () => {
  return (
    <Row gutter={[GRID_GUTTER, 0]}>
      <Col span={GRID_COL_FULL_ROW_SPAN}>
        <Form.Item
          name="subscriptionCompanies"
          label={
            <FormLabelWithIcon
              description="Choose the subscription companies"
              text="Subscription companies"
              icon={QuestionCircleOutlined}
            />
          }
        >
          <CompanyPicker />
        </Form.Item>
      </Col>
    </Row>
  );
};
