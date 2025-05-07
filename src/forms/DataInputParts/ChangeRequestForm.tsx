import React, { FC } from 'react';
import { Row, Col, Input } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { MetricChangeHistory } from 'types/metricHistory';
import { FormData4MVCR } from 'types/metricValue';
import { GRID_GUTTER, GRID_COL_FULL_ROW_SPAN } from 'constants/ui';
import { FormLabelWithIcon } from 'components';
import { ChangesHistory } from './ChangesHistory';
import styles from './DataInputForms.module.scss';

type ChangeRequestFormProps = {
  metric: FormData4MVCR | null;
  changesHistory: MetricChangeHistory[];
};

export const ChangeRequestForm: FC<ChangeRequestFormProps> = ({
  metric,
  changesHistory,
}: ChangeRequestFormProps) => {
  return (
    <>
      <Row gutter={[GRID_GUTTER, 0]} className={styles.row}>
        <Col span={GRID_COL_FULL_ROW_SPAN / 2}>
          <FormLabelWithIcon
            description="This field is used to show the current metric name."
            text="Metric name"
            icon={QuestionCircleOutlined}
            className={styles.label}
          />
          <Input disabled value={metric?.name} className={styles.input} />
        </Col>
        <Col span={GRID_COL_FULL_ROW_SPAN / 2}>
          <FormLabelWithIcon
            description="This field is used to show the current metric value."
            text="New value"
            icon={QuestionCircleOutlined}
            className={styles.label}
          />
          <Input disabled value={metric?.value} className={styles.input} />
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]} className={styles.row}>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <FormLabelWithIcon
            description="This field is used to show the reason for change current metric value."
            text="Reason for change"
            icon={QuestionCircleOutlined}
            className={styles.label}
          />
          <Input
            disabled
            value={metric?.reason ?? ''}
            className={styles.input}
          />
        </Col>
      </Row>
      {changesHistory && changesHistory.length > 0 && (
        <ChangesHistory changesHistory={changesHistory} />
      )}
    </>
  );
};
