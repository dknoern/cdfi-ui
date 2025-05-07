import React, { FC, useMemo } from 'react';
import { Form, Row, Col, Input, Select } from 'antd';
import { Company, Portfolio } from 'types';
import {
  GRID_GUTTER,
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_FULL_ROW_SPAN,
} from 'constants/ui';
import { FormPrimaryLabel } from 'components';
import { usePortfolios } from 'dataManagement';
import { userStore } from 'store';
import { fieldRules } from './constants';

export const CommonInfo: FC<{
  availableCompanies: Company[];
  isEdit?: boolean;
  portfolioId?: Portfolio['id'];
}> = ({ availableCompanies, isEdit = false, portfolioId }) => {
  const { data: portfolios } = usePortfolios(userStore.info.userId);

  const titles = useMemo(() => {
    return [
      { pcId: 'Select Reporting Entity', portfolioId: 'Select Portfolio' },
      { pcId: 'Reporting Entity', portfolioId: 'Portfolio' },
    ][+isEdit];
  }, [isEdit]);

  return (
    <>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col lg={GRID_COL_HALF_ROW_SPAN} flex="auto">
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_HALF_ROW_SPAN}>
              <Form.Item
                name="name"
                label={<FormPrimaryLabel num={1} text="Investment Name" />}
                labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
                rules={fieldRules.name}
              >
                <Input placeholder="Enter Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_HALF_ROW_SPAN}>
              <Form.Item
                name="pcId"
                label={<FormPrimaryLabel num={2} text={titles.pcId} />}
                labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
                rules={isEdit ? undefined : fieldRules.reportingEntity}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder={titles.pcId}
                  disabled={isEdit}
                >
                  {availableCompanies
                    .filter((item) => item.active)
                    .map((company) => (
                      <Select.Option key={company.id} value={company.id}>
                        {company.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            {(!!portfolioId || !isEdit) && (
              <Col span={GRID_COL_HALF_ROW_SPAN}>
                <Form.Item
                  name="portfolioId"
                  label={<FormPrimaryLabel num={3} text={titles.portfolioId} />}
                  labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder={titles.portfolioId}
                    disabled={isEdit}
                  >
                    {(portfolios ?? []).map((portfolio) => (
                      <Select.Option key={portfolio.id} value={portfolio.id}>
                        {portfolio.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
};
