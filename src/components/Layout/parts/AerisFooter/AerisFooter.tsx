import React, {useCallback, useState} from 'react';
import {Form, Layout} from 'antd';
import styles from './AerisFooter.module.scss';
import { TermsModal } from 'components/Layout/components/TermsModal';
import { PrivacyModal } from 'components/Layout/components/PrivacyModal';
import { aerisEmail } from 'constants/aerisEmail';
import {MailOutlined} from '@ant-design/icons';
import { userStore } from 'store';
import {SupportHistoryEmailModal} from "../../../../scenes/SupportHistory/SupportHistoryEmailModal";

const { Footer } = Layout;

const AerisFooter = () => {
  const [showToS, setShowToS] = useState<boolean>(false);
  const [showPrivPol, setShowPrivPol] = useState<boolean>(false);
  const [showSupportHistoryEmailModal, setShowSupportHistoryEmailModal] =
    useState<boolean>(false);

  const formId = 'SEND_AERIS_SUPPORT_EMAIL';
  const [form] = Form.useForm();

  const startAdd = useCallback(() => {
    setShowSupportHistoryEmailModal(true);
  }, []);

  const copyright = `©2012 - ${new Date().getFullYear()} CDFI, Inc. All Rights Reserved.`;

  return (
    <>
      <Footer className={styles.footer}>
        <div className={styles.terms}>
          <a className={styles.link} onClick={() => setShowToS(true)}>
            Terms of Service
          </a>
          <a className={styles.link} onClick={() => setShowPrivPol(true)}>
            Privacy
          </a>
          {userStore.isSubscriber || userStore.isCdfi ?
            <div className={styles.wrapperActionSupportButton}>
              <MailOutlined />
              <button
                onClick={startAdd}
                className={styles.actionSupportButton}
              >
                Contact CDFI
              </button>
            </div> :
            <a
              className={styles.link}
              href={`mailto: ${aerisEmail}`}
            >
              <div className={styles.contactContainer}><div className={styles.mailIcon}><MailOutlined /></div>Contact CDFI</div>
            </a>}
        </div>
        <div className={styles.copyright}>
          <span>{copyright}</span>
        </div>
      </Footer>
      <TermsModal showToS={showToS} setShowToS={setShowToS} />
      <PrivacyModal showPrivPol={showPrivPol} setShowPrivPol={setShowPrivPol} />
      <SupportHistoryEmailModal
        visible={showSupportHistoryEmailModal}
        onClose={() => {
          setShowSupportHistoryEmailModal(false);
          form.resetFields();
        }}
        onFinish={() => {
          setShowSupportHistoryEmailModal(false);
          form.resetFields();
        }}
        formId={formId}
        form={form}
      />
    </>
  );
};

export default AerisFooter;
