import React, { FC } from 'react';
import { Row, Col, List } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import { Tag } from 'types';
import styles from './DashboardListCard.module.scss';

type TagsBlockProps = {
  tags: Tag[];
};

export const TagsBlock: FC<TagsBlockProps> = ({ tags }) => (
  <div className={styles.tagsRow}>
    {tags.length ? (
      <List bordered={false} split={false}>
        {tags.map((tag) => (
          <List.Item key={tag.id}>
            <Row
              className={styles.tagWrapper}
              gutter={[16, 4]}
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
      </List>
    ) : (
      <span className={styles.noTags}>No tags</span>
    )}
  </div>
);
