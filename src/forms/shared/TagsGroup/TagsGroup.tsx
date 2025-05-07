import React, { FC } from 'react';
import { Form, Row, Col, Typography } from 'antd';
import {
  GRID_GUTTER,
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_FULL_ROW_SPAN,
} from 'constants/ui';
import { typography } from 'constants/typography';
import { FormPrimaryLabel } from 'components';
import { Tags } from 'forms/shared/Tags';
import styles from './TagsGroup.module.css';

const { Text } = Typography;
const { relevantTagsDescription } = typography('portfolioCompanyCreation');

type GroupProps = {
  num?: number;
};

export const TagsGroup: FC<GroupProps> = ({ num = 5 }) => {
  return (
    <Row gutter={[GRID_GUTTER, 0]}>
      <Col lg={GRID_COL_HALF_ROW_SPAN} flex="auto">
        <Form.Item
          label={
            <FormPrimaryLabel num={num} text="Relevant Tags" hint="Optional" />
          }
          labelCol={{ span: GRID_COL_FULL_ROW_SPAN }}
        >
          <Text type="secondary" className={styles.tagsDescription}>
            {relevantTagsDescription}
          </Text>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col span={GRID_COL_FULL_ROW_SPAN}>
              <Form.Item noStyle name="tags">
                <Tags />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Col>
    </Row>
  );
};
