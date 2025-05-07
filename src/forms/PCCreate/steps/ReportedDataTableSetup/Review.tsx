import React, { FC } from 'react';
import { Checkbox, Col, Row, Select } from 'antd';
import { observer } from 'mobx-react';
import { ReportedDataTableConfig } from 'types/reportedDataTableConfig';
import {
  GRID_COL_QUARTER_ROW_SPAN,
  GRID_COL_THIRD_ROW_SPAN,
  GRID_GUTTER,
} from 'constants/ui';
import { reportedDataTableDisplayTypeNames } from 'constants/reportedDataTableConfig';
import { formStore } from '../../formStore';
import { DescriptionItem } from '../../components';
import { initialValues, CURRENT_STEP } from './constants';
import styles from './Review.module.scss';

const Review: FC = () => {
  const { displayType, showAnnualSummaryColumn } =
    (formStore.data[CURRENT_STEP] as ReportedDataTableConfig) ?? initialValues;
  return (
    <>
      <DescriptionItem label="Reporting Type">
        <Row gutter={[0, GRID_GUTTER / 2]}>
          <Col span={GRID_COL_QUARTER_ROW_SPAN} lg={GRID_COL_THIRD_ROW_SPAN}>
            <Select
              className={styles.select}
              disabled
              value={
                reportedDataTableDisplayTypeNames[
                  displayType as ReportedDataTableConfig['displayType']
                ]
              }
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Checkbox
              disabled
              checked={showAnnualSummaryColumn}
              style={{ display: 'block' }}
            >
              Show annual summary column
            </Checkbox>
          </Col>
        </Row>
      </DescriptionItem>
    </>
  );
};

export default observer(Review);
