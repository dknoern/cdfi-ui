import React from 'react';
import { UserInfo } from 'types';
import { Row, Col } from 'antd';
import { GRID_GUTTER } from '../../../constants/ui';
import { Profile } from './Profile';


export const UserControls = () => {
  return (
    <Row align="middle" gutter={GRID_GUTTER / 2}>
      <Col>
        <Profile />
      </Col>
    </Row>
  );
};
