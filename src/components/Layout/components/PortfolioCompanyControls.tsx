import React from 'react';
import { Row, Col } from 'antd';
import { GRID_GUTTER } from 'constants/ui';
import { ContactFundManager } from './ContactFundManager';
import { Profile } from './Profile';
import { Notifications } from './Notifications';

export const PortfolioCompanyControls = () => {
  return (
    <Row align="middle" gutter={GRID_GUTTER}>
      <Col>
        <ContactFundManager />
      </Col>
      <Col>
        <Notifications />
      </Col>
      <Col>
        <Profile />
      </Col>
    </Row>
  );
};
