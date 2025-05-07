import React, { FC, useState, useCallback } from 'react';
import { FormProps } from 'antd/lib/form';
import { Form, Row, Col, Select } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ReportingPeriod } from 'types/reportedData';
import { OccupiedPeriods } from 'components/ReportedDataManager/types';
import { GRID_COL_HALF_ROW_SPAN, GRID_GUTTER } from 'constants/ui';
import {
  AVAILABLE_YEARS_START,
  FISCAL_YEARS_SELECT_HEIGHT,
} from 'constants/forms';
import { uiText } from 'constants/uiText';
import { FormLabelWithIcon } from 'components';
import { required } from 'tools/formRules';
import styles from './ChoosePeriodForm.module.scss';

const fiscalYears = new Array(
  new Date().getFullYear() - AVAILABLE_YEARS_START + 2,
)
  .fill(AVAILABLE_YEARS_START)
  .map((item, idx) => item + idx)
  .reverse();

type ChoosePeriodFormProps = {
  onFinish: FormProps['onFinish'];
  formId: string;
  occupiedPeriods: OccupiedPeriods;
};
export const ChoosePeriodForm: FC<ChoosePeriodFormProps> = ({
  onFinish,
  formId,
  occupiedPeriods,
}) => {
  const [form] = Form.useForm();
  const [yearSelected, setYear] = useState<ReportingPeriod['year']>(0);
  const [quarterSelected, setQuarter] = useState<
    ReportingPeriod['quarter'] | null
  >(null);

  const onYearChange = useCallback((value: ReportingPeriod['year']): void => {
    setYear(value);
  }, []);

  const onQuarterChange = useCallback(
    (value: ReportingPeriod['quarter']): void => {
      setQuarter(value);
    },
    [],
  );

  const quarterOccupied = useCallback(
    (quarter) => {
      return (
        !!occupiedPeriods.has(yearSelected) &&
        occupiedPeriods.get(yearSelected)?.includes(quarter)
      );
    },

    [occupiedPeriods, yearSelected],
  );

  const yearOccupied = useCallback(
    (year) => {
      if (quarterSelected) {
        return (occupiedPeriods.get(year) ?? []).includes(quarterSelected);
      }

      return (occupiedPeriods.get(year) ?? []).length > 3;
    },

    [occupiedPeriods, quarterSelected],
  );

  return (
    <Form
      form={form}
      id={formId}
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ year: undefined, quarter: undefined }}
      hideRequiredMark
    >
      <Row gutter={GRID_GUTTER * 2}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="year"
            rules={[required('number')]}
            label={
              <FormLabelWithIcon
                icon={QuestionCircleOutlined}
                description={uiText('reportedData', 'periodFormYearFieldHelp')}
                text={uiText('reportedData', 'periodFormYearFieldTitle')}
                className={styles.label}
              />
            }
          >
            <Select
              onChange={onYearChange}
              placeholder={uiText('reportedData', 'yearFieldPlaceholder')}
              listHeight={FISCAL_YEARS_SELECT_HEIGHT}
            >
              {fiscalYears.map((year) => (
                <Select.Option
                  key={year}
                  value={year}
                  disabled={yearOccupied(year)}
                >
                  {year}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="quarter"
            dependencies={['fiscalYear']}
            rules={[required('number')]}
            label={
              <FormLabelWithIcon
                icon={QuestionCircleOutlined}
                description={uiText(
                  'reportedData',
                  'periodFormQuarterFieldHelp',
                )}
                text={uiText('reportedData', 'periodFormQuarterFieldTitle')}
                className={styles.label}
              />
            }
          >
            <Select
              onChange={onQuarterChange}
              placeholder={uiText('reportedData', 'quarterFieldPlaceholder')}
            >
              {[1, 2, 3, 4].map((quarter) => (
                <Select.Option
                  key={quarter}
                  value={quarter}
                  disabled={quarterOccupied(quarter)}
                >
                  Quarter {quarter}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
