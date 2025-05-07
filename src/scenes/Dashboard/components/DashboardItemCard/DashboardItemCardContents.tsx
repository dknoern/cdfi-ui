import React, { FC } from 'react';
import { Row, Col, Typography, List, Tooltip } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import { Tag } from 'types';
import { GRID_COL_HALF_ROW_SPAN, GRID_COL_THIRD_ROW_SPAN } from 'constants/ui';
import {
  TAGS_LIMIT_COUNT,
  GRID_VERTICAL_SPACING,
  GRID_HORIZONTAL_SPACING,
} from './constants';
import { DashboardCardType } from '../../types';
import styles from './DashboardItemCard.module.scss';

const { Text } = Typography;

type ColProps = {
  title: React.ReactText;
  text: React.ReactText;
};
export const KPICol: FC<
  ColProps & {
    cardType: DashboardCardType;
  }
> = ({ title, text, cardType }) => (
  <Col
    span={
      cardType === DashboardCardType.REPORTING_ENTITY
        ? GRID_COL_THIRD_ROW_SPAN
        : GRID_COL_HALF_ROW_SPAN
    }
    className={styles.kpiCol}
  >
    <div className={styles.value}>{title}</div>
    <Text>{text}</Text>
  </Col>
);

type TagsBlockProps = {
  cardType: DashboardCardType;
  tags: Tag[];
};
export const TagsBlock: FC<TagsBlockProps> = ({ tags, cardType }) => (
  <div className={styles.tagsRow}>
    {tags.length ? (
      <List bordered={false} split={false}>
        {tags.slice(0, TAGS_LIMIT_COUNT).map((tag) => (
          <List.Item key={tag.id}>
            <Row
              className={styles.tagWrapper}
              gutter={[GRID_HORIZONTAL_SPACING, GRID_VERTICAL_SPACING]}
              align="middle"
              justify="start"
            >
              <Col>
                <TagOutlined className={styles.tagIcon} />
              </Col>
              <Col>{tag.name}</Col>
            </Row>
          </List.Item>
        ))}
        {tags.length > TAGS_LIMIT_COUNT && (
          <List.Item>
            <Tooltip title="You can see all tags in table view">
              ... and {tags.length - TAGS_LIMIT_COUNT} more
            </Tooltip>
          </List.Item>
        )}
      </List>
    ) : (
      <span className={styles.noTags}>No tags</span>
    )}
  </div>
);
