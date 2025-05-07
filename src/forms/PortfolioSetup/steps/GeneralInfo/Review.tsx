import React, { FC, useCallback, useMemo } from 'react';
import { Col, Row, Typography, Space } from 'antd';
import { Tag } from 'types';
import {
  GRID_GUTTER,
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_THIRD_ROW_SPAN,
  GRID_COL_QUARTER_ROW_SPAN,
} from 'constants/ui';
import { EMPTY_VALUE_PLACEHOLDER } from 'constants/forms';
import { CustomTag } from 'components';
import { metricDependenciesStore } from 'store';
import { useInvestments } from 'dataManagement/useInvestments';
import { extractTags } from 'tools/tagsTool';
import { formStore } from '../../formStore';
import { filterInvestmentsByIds } from './tools';

const { Text } = Typography;

const Review: FC = () => {
  const { data: investments, isLoading: isInvestmentsLoading } = useInvestments(
    true,
  );

  const { allTagCategories: tags } = metricDependenciesStore;

  const allTags = useMemo(() => {
    if (!tags) return [];

    return extractTags(tags);
  }, [tags]);

  const tag = useCallback(
    (tagId) => {
      return allTags.find((item) => item.id === tagId) as Tag;
    },
    [allTags],
  );

  const filteredInvestments = useMemo(() => {
    if (!investments || isInvestmentsLoading) return [];

    return filterInvestmentsByIds(investments, formStore.formData.investments);
  }, [investments, isInvestmentsLoading]);

  return (
    <Row gutter={[GRID_GUTTER, GRID_GUTTER]}>
      <Col
        xs={GRID_COL_FULL_ROW_SPAN}
        md={GRID_COL_THIRD_ROW_SPAN}
        lg={GRID_COL_QUARTER_ROW_SPAN}
      >
        <Text type="secondary">Portfolio name</Text>
        <br />
        {formStore.formData.name || EMPTY_VALUE_PLACEHOLDER}
      </Col>
      <Col xs={GRID_COL_FULL_ROW_SPAN} md={GRID_COL_THIRD_ROW_SPAN}>
        <Text type="secondary">Tags</Text>
        <br />
        <Space wrap>
          {formStore.formData.tags.length > 0
            ? formStore.formData.tags.map((tagId) => (
                <CustomTag tag={tag(tagId)} key={tagId} />
              ))
            : EMPTY_VALUE_PLACEHOLDER}
        </Space>
      </Col>
      <Col xs={GRID_COL_FULL_ROW_SPAN} md={GRID_COL_THIRD_ROW_SPAN}>
        <Text type="secondary">Investments</Text>
        <div>
          {filteredInvestments.length > 0
            ? filteredInvestments.map((item) => item.name).join(', ')
            : EMPTY_VALUE_PLACEHOLDER}
        </div>
      </Col>
    </Row>
  );
};

export default Review;
