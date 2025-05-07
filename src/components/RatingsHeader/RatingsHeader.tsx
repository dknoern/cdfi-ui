import React, { FC, ReactNode, useEffect, useState } from 'react';
import { WithClass } from 'types';
import styles from './RatingsHeader.module.scss';
import { Link } from 'react-router-dom';
import { ratingsText } from './constants';
import { useCdfiRatings } from 'dataManagement/useCdfis';
import Paragraph from 'antd/lib/typography/Paragraph';
import { cdfiStore } from 'store/cdfiStore';
import { userStore } from 'store';
import { Row, Col, Typography } from 'antd';
const { Text } = Typography;

type RatingsHeaderProps = {} & WithClass;

export const RatingsHeader: FC<RatingsHeaderProps> = ({ className }) => {
  const { cdfiId: id } = cdfiStore;
  const { data: cdfiRatings } = useCdfiRatings(id);
  const rating = cdfiRatings ? cdfiRatings.ratings : undefined;

  return rating !== undefined && rating?.rated ? (
    <div
      className={`${styles.wrapper} ${rating?.rated ? 'active' : ''}  ${
        className ? 'static' : ''
      }  `}
    >
      <Row justify="end">
        <Col span={12}>
          <Row>
            <Text>
              {ratingsText.ratingText} <span>{rating?.rating}</span>
            </Text>
          </Row>
          <Row>
            <Text>
              {ratingsText.ratedSinceText}
              <span className="year">{rating?.ratedSince}</span>
            </Text>
          </Row>
          {userStore.isCdfi ?
            <Row>
              <Link to={'/ratings-definitions'}>
                <Paragraph underline className={styles.linkRatings}>Ratings Definitions</Paragraph>
              </Link>
            </Row>
          : null}
        </Col>
        <Col span={12} className="rateLogo">
          {rating?.rated ? (
            <img src="https://cloud.aerisinsight.com/images/logo/Aeris_Rated_small.jpg" />
          ) : null}
          {rating?.reporting ? (
            <img src="https://cloud.aerisinsight.com/images/logo/Aeris_Reporting.png" />
          ) : null}
        </Col>
      </Row>
    </div>
  ) : null;
};
