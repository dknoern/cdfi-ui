import React, { useState } from 'react';
import { Button, Modal, Tooltip } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useHTMLDocument } from 'dataManagement';
import { dataMan, ManagerName } from 'dataManagement/managers';
import { downloadStaticDocument } from 'dataManagement/operations/documentOperations';
import { DownloadFileNames } from 'constants/downloadFileNames';
import { authTools, onLinkClick } from 'tools';
import DOMPurify from 'dompurify';
import { PrivacyModal } from './PrivacyModal';
import { userStore } from '../../../store';
import { UserManager } from '../../../dataManagement/managers/UserManager';
import styles from '../parts/AerisFooter/AerisFooter.module.scss';

const mgr = dataMan.manager(ManagerName.users) as UserManager;

type TermsModalProps = {
  showToS?: boolean;
  setShowToS: (arg: boolean) => void;
};

export const TermsModal = ({ showToS, setShowToS }: TermsModalProps) => {
  const [showPrivPol, setShowPrivPol] = useState<boolean>(false);
  const [viewedPrivPol, setViewedPrivPol] = useState<boolean>(false);
  const [notAccepted, setNotAccepted] = useState(!userStore.info.termsAccepted);

  const { data: ToS } = useHTMLDocument('termsOfUse');
  const ToSContent = ToS ? DOMPurify.sanitize(ToS) : '';
  const id = userStore.info.userId;

  const acceptTerms = (userId: number) => {
    mgr
      .acceptToS(userId)
      .then(() => setNotAccepted(userStore.info.termsAccepted));
  };

  const footer = [
    notAccepted && [
      <Tooltip
        key="ToS-Accept-Btn"
        title="Please review Privacy Policy and Terms of Service then accept."
      >
        <Button
          className={styles.acceptBtn}
          onClick={() => acceptTerms(id)}
          disabled={!viewedPrivPol}
        >
          Accept
        </Button>
      </Tooltip>,
      <Button
        className={styles.revPrivBtn}
        key="Review-Privacy-Btn"
        onClick={() => {
          setViewedPrivPol(true);
          setShowPrivPol(true);
        }}
      >
        Review Privacy Policy
      </Button>,
      <Button
        className={styles.cancelBtn}
        key="Cancel-Btn"
        onClick={() => authTools.logout()}
      >
        Cancel
      </Button>,
    ],
    <DownloadOutlined
      key="Download-ToS"
      className={styles.downloadIcon}
      onClick={() => {
        downloadStaticDocument('termsOfUsePDF', DownloadFileNames.termsOfUse);
        setShowToS(false);
      }}
    />,
  ];

  const isImpersonating = !!userStore.info.impersonatingName;

  return (
    <>
      {!isImpersonating && (
        <>
          <Modal
          title="Terms of Service"
          closable={!notAccepted}
          wrapClassName={styles.modalWrap}
          visible={notAccepted ? true : showToS}
          onCancel={() => setShowToS(false)}
          width={notAccepted ? 1200 : 800}
          footer={footer}
          >
            <div
              className={styles.contentContainer}
              dangerouslySetInnerHTML={{ __html: ToSContent }}
              onClick={onLinkClick}
            />
          </Modal>
          <PrivacyModal
            showPrivPol={showPrivPol}
            setShowPrivPol={setShowPrivPol}
          />
        </>
      )}
    </>
  );
};
