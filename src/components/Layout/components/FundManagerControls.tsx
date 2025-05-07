import React from 'react';
import { Row, Col } from 'antd';
import { GRID_GUTTER } from 'constants/ui';
import { Profile } from './Profile';
import { Notifications } from './Notifications';

export const FundManagerControls = () => {
  return (
    <Row align="middle" gutter={GRID_GUTTER / 2}>
      <Col>
        <Notifications />
      </Col>
      <Col>
        <Profile />
      </Col>
    </Row>
  );
};
