import React, {FC, useState} from 'react';
import { Form, Row, Col, Input, Checkbox, DatePicker, Select } from 'antd';
import { ModalWithForm } from 'modals';
import {
  GRID_GUTTER,
  MODAL_WIDTH,
  GRID_COL_THIRD_ROW_SPAN,
  GRID_COL_TWO_THIRDS_ROW_SPAN
} from '../../../../constants';
import {
  quarters,
  impactPerformanceRatings,
  impactPerformancesAnnual,
  financialStrengthRatings,
  financialStrengthsAnnual,
  reviewTypes,
} from './constants';
import {CdfiRatingEditFormData} from 'types/cdfiRating';
import { CdfiRatingsManager } from 'dataManagement/managers/CdfiManager';
import {dataMan} from 'dataManagement';
import { ManagerName } from 'dataManagement/managers';
import moment from 'moment';
import { User } from 'types';
import {sortByString} from "../../../../tools";

type CreateRatingsModalProps = {
  cdfiId: number;
  cdfiName: string;
  openCreateModal: boolean;
  setOpenCreateModal: (arg: boolean) => void;
  analysts: User[] | null;
};

const mgr = dataMan.manager(
  ManagerName.cdfiRatingsDetails,
) as CdfiRatingsManager;

export const CreateRatingsModal = ({
  cdfiId,
  cdfiName,
  openCreateModal,
  setOpenCreateModal,
  analysts,
}: CreateRatingsModalProps) => {
  const [isAnnualRating, setIsAnnualRating] = useState(false);

  const handleSubmit = (values: CdfiRatingEditFormData) => {
    const payload: CdfiRatingEditFormData = {
      dateOfAnalysis: moment(values.dateOfAnalysis).format('YYYY-MM-DD'),
      impactPerformance: values.impactPerformance,
      financialStrength: values.financialStrength,
      skipNotification: !!values.skipNotification,
      quarter: values.quarter,
      isPolicyPlus: !!values.isPolicyPlus,
      year: Number(moment(values.year).format('YYYY')),
      releaseDate: values.releaseDate
        ? moment(values.releaseDate).format('YYYY-MM-DD')
        : '',
      reviewType: values.reviewType,
      analystIds: values.analystIds ? values.analystIds : [],
    };

    if (!values.impactPerformance) delete payload.impactPerformance;
    if (!values.releaseDate) delete payload.releaseDate;
    if (!values.analystIds) delete payload.analystIds;
    if (!values.financialStrength) delete payload.financialStrength;

    mgr.createCdfiRating(cdfiId, payload);

    setOpenCreateModal(false);
  };

  const CustomLabel: FC = ({ children }) => <span>{children}</span>;

  const handleValueChange = (changedValues: any) => {
    const propName = Object.keys(changedValues)[0];
    if (changedValues[propName] === 'ANNUAL_RATING') setIsAnnualRating(true);
    if (changedValues[propName] === 'ANNUAL') setIsAnnualRating(false);
  };

  const getOptionsAnalysts = (analysts: User[] | null) => {
    return analysts ? analysts.filter(item => item.role === "ANALYST")
      .sort((a, b): number => sortByString(a.firstName, b.firstName))
      .map((analyst: User) => ({
        value: analyst?.id,
        label: <p>{analyst?.firstName} {analyst.lastName} {!analyst?.isActive ? '(inactive)' : ''}</p>
      })) : []}

  return (
    <ModalWithForm
      width={MODAL_WIDTH.SMALL}
      formId="Create Rating"
      title={'Create Rating or Annual Review'}
      actionButtonText="Save"
      visible={openCreateModal}
      onCancel={() => {
        setOpenCreateModal(false);
        setIsAnnualRating(false);
      }}
    >
      <Form
        id="Create Rating"
        onValuesChange={handleValueChange}
        onFinish={handleSubmit}
      >
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <CustomLabel>Company</CustomLabel>
          </Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item name="company">
              <Input disabled value={cdfiName} placeholder={cdfiName} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <CustomLabel>Review Type</CustomLabel>
          </Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item
              name="reviewType"
              rules={[
                { required: true, message: 'Please select a review type.' },
              ]}
            >
              <Select
                placeholder="Select Review Type"
                options={reviewTypes.map((rT) => ({
                  value: rT.name,
                  label: rT.displayName,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <CustomLabel>Year</CustomLabel>
          </Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item
              rules={[{ required: true, message: 'Please select a year' }]}
              name="year"
            >
              <DatePicker picker="year" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <CustomLabel>Quarter</CustomLabel>
          </Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item
              rules={[{ required: true, message: 'Please select a quarter' }]}
              name="quarter"
            >
              <Select
                placeholder="Select Review Quarter"
                options={quarters.map((qtr) => ({
                  value: qtr.qtrVal,
                  label: qtr.displayName,
                }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <CustomLabel>Skip Notification</CustomLabel>
          </Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item name="skipNotification" valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <CustomLabel>Date of Analysis</CustomLabel>
          </Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item
              rules={[{ required: true, message: 'Please select a date' }]}
              name="dateOfAnalysis"
            >
              <DatePicker picker="date" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <CustomLabel>Impact Performance</CustomLabel>
          </Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item name="impactPerformance">
              {isAnnualRating ? (
                <Select
                  placeholder="Select Impact Performance"
                  options={impactPerformanceRatings.map((rtg) => ({
                    value: rtg,
                    label: rtg,
                  }))}
                />
              ) : (
                <Select
                  placeholder="Select Impact Performance"
                  options={impactPerformancesAnnual.map((rtg) => ({
                    value: rtg,
                    label: rtg,
                  }))}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <CustomLabel>Financial Strength</CustomLabel>
          </Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item name="financialStrength">
              {isAnnualRating ? (
                <Select
                  placeholder="Select Financial Strength"
                  options={financialStrengthRatings.map((rtg) => ({
                    value: rtg,
                    label: rtg,
                  }))}
                />
              ) : (
                <Select
                  placeholder="Select Financial Strength"
                  options={financialStrengthsAnnual.map((rtg) => ({
                    value: rtg,
                    label: rtg,
                  }))}
                />
              )}
            </Form.Item>
          </Col>
          {isAnnualRating && (
            <>
              <Col span={GRID_COL_THIRD_ROW_SPAN}>
                <CustomLabel>Policy Plus</CustomLabel>
              </Col>
              <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
                <Form.Item name="isPolicyPlus" valuePropName="checked">
                  <Checkbox />
                </Form.Item>
              </Col>
            </>
          )}
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <CustomLabel>Release Date</CustomLabel>{' '}
            <span
              style={{
                fontSize: 'x-small',
                fontStyle: 'italic',
                color: 'lightgray',
              }}
            >
              Optional
            </span>
          </Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item name="releaseDate">
              <DatePicker picker="date" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <CustomLabel>Analyst(s)</CustomLabel>{' '}
            <span
              style={{
                fontSize: 'x-small',
                fontStyle: 'italic',
                color: 'lightgray',
              }}
            >
              Optional
            </span>
          </Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item name="analystIds">
              <Select
                mode="multiple"
                placeholder="Select Analyst"
                showSearch
                showArrow
                optionFilterProp="children"
                options={getOptionsAnalysts(analysts)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalWithForm>
  );
};
