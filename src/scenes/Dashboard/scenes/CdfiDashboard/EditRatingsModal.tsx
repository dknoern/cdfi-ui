import React from 'react';
import { Form, Row, Col, Input, Checkbox, DatePicker, Select } from 'antd';
import { ModalWithForm } from 'modals';
import {
  GRID_GUTTER,
  GRID_COL_THIRD_ROW_SPAN,
  GRID_COL_TWO_THIRDS_ROW_SPAN,
} from '../../../../constants';
import {
  quarters,
  impactPerformanceRatings,
  impactPerformancesAnnual,
  financialStrengthRatings,
  financialStrengthsAnnual,
} from './constants';
import {CdfiRating, CdfiRatingEditFormData} from 'types/cdfiRating';
import { CdfiRatingsManager } from 'dataManagement/managers/CdfiManager';
import { dataMan } from 'dataManagement';
import { ManagerName } from 'dataManagement/managers';
import moment from 'moment';
import {User} from "../../../../types";
import {toJS} from "mobx";
import {sortByString} from "../../../../tools";

type EditRatingsModalProps = {
  cdfiId: number;
  cdfiName: string;
  ratingToEdit: CdfiRating | null;
  setRatingToEdit: (arg: CdfiRating | null) => void;
  analysts: User[] | null;
};

const mgr = dataMan.manager(
  ManagerName.cdfiRatingsDetails,
) as CdfiRatingsManager;

export const EditRatingsModal = ({
  cdfiId,
  cdfiName,
  ratingToEdit,
  setRatingToEdit,
  analysts,
}: EditRatingsModalProps) => {
  const handleSubmit = (values: CdfiRatingEditFormData) => {
    const payload: CdfiRatingEditFormData = {
      dateOfAnalysis: moment(values.dateOfAnalysis).format('YYYY-MM-DD'),
      impactPerformance: values.impactPerformance,
      financialStrength: values.financialStrength,
      skipNotification: values.skipNotification,
      quarter: values.quarter,
      isPolicyPlus: !!values.isPolicyPlus,
      year: Number(moment(values.year).format('YYYY')),
      releaseDate: values.releaseDate
        ? moment(values.releaseDate).format('YYYY-MM-DD')
        : '',
      reviewType: values.reviewType,
      analystIds: values.analystIds,
    };

    if (!values.impactPerformance) delete payload.impactPerformance;
    if (!values.releaseDate) delete payload.releaseDate;
    if (!values.analystIds) delete payload.analystIds;
    if (!values.financialStrength) delete payload.financialStrength;

    mgr.updateCdfiRating(cdfiId, Number(ratingToEdit?.id), payload);

    setRatingToEdit(null);
  };

  const initialValues = {
    dateOfAnalysis: moment(ratingToEdit?.dateOfAnalysis, 'MM/DD/YYYY'),
    impactPerformance: ratingToEdit?.impactPerformance,
    financialStrength: ratingToEdit?.financialStrength,
    company: cdfiName,
    skipNotification: ratingToEdit?.skipNotification,
    quarter: ratingToEdit?.year === 0o0 ? '' : ratingToEdit?.quarter,
    isPolicyPlus: ratingToEdit?.isPolicyPlus,
    year: ratingToEdit?.year === 0o0 ? '' : moment(ratingToEdit?.year, 'YYYY'),
    releaseDate: ratingToEdit?.releaseDate
      ? moment(ratingToEdit?.releaseDate, 'MM/DD/YYYY')
      : '',
    reviewType: ratingToEdit?.reviewType,
    // @ts-ignore
    analystIds: ratingToEdit?.analysts.sort((a, b): number => sortByString(a.firstName, b.firstName)).map(analyst => (analyst?.id)) as unknown as User[]
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
      formId="Edit Ratings"
      title="Update A Full Rating Review"
      actionButtonText="Save"
      visible={!!ratingToEdit}
      onCancel={() => setRatingToEdit(null)}
    >
      <Form
        id="Edit Ratings"
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>Company</Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item name="company">
              <Input disabled value={cdfiName} placeholder={cdfiName} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>Review Type</Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item name="reviewType">
              <Select>
                <Select.Option
                  value={
                    ratingToEdit?.reviewType ? ratingToEdit?.reviewType : ''
                  }
                >
                  {(ratingToEdit?.reviewType === 'ANNUAL_RATING') ? 'Aeris Rating' : 'Annual Review'}
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>Year</Col>
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
          <Col span={GRID_COL_THIRD_ROW_SPAN}>Quarter</Col>
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
          <Col span={GRID_COL_THIRD_ROW_SPAN}>Skip Notification</Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item name="skipNotification" valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>Date of Analysis</Col>
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
          <Col span={GRID_COL_THIRD_ROW_SPAN}>Impact Performance</Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item name="impactPerformance">
              {ratingToEdit?.reviewType === 'ANNUAL_RATING' ? (
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

        {ratingToEdit?.reviewType === 'ANNUAL_RATING' && (
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_THIRD_ROW_SPAN}>Policy Plus</Col>
            <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
              <Form.Item name="isPolicyPlus" valuePropName="checked">
                <Checkbox />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>Financial Strength</Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item name="financialStrength">
              {ratingToEdit?.reviewType === 'ANNUAL_RATING' ? (
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
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>Release Date</Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item name="releaseDate">
              <DatePicker picker="date" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>Analyst(s)</Col>
          <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
            <Form.Item name="analystIds">
              <Select
                showSearch
                mode="multiple"
                placeholder="Select Analyst"
                options={getOptionsAnalysts(analysts)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ModalWithForm>
  );
};
