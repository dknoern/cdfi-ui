import React, { FC } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import { VoidFn } from 'types';
import { typography } from 'constants/typography';
import { AerisAtlasLogo } from 'components/CustomIcons';
import Paragraph from 'antd/es/typography/Paragraph';
import styles from './ContactSupport.module.scss';

const { instructionsText, instructionsText2 } = typography('contactSupport');

type ContactSupportResultModalProps = {
  requestId: string;
  visible: boolean;
  onCancel: VoidFn;
};

export const ContactSupportResultModal: FC<ContactSupportResultModalProps> = ({
  requestId,
  visible,
  onCancel,
}) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title=""
      footer={null}
      destroyOnClose
      centered
      closable={false}
    >
      <div className={styles.container}>
        <div className={styles.inner}>
          <AerisAtlasLogo className={styles.logo} />
          <Row>
            <Col offset={2}>
              <Paragraph>{instructionsText}</Paragraph>
              <Paragraph>
                {instructionsText2}&nbsp;{requestId}
              </Paragraph>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" onClick={onCancel}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
