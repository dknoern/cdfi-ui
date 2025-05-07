import React from 'react';
import { Modal } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useHTMLDocument } from 'dataManagement';
import { downloadStaticDocument } from 'dataManagement/operations/documentOperations';
import { DownloadFileNames } from 'constants/downloadFileNames';
import { onLinkClick } from 'tools';
import DOMPurify from 'dompurify';
import styles from '../parts/AerisFooter/AerisFooter.module.scss';

type PrivacyModalProps = {
  showPrivPol?: boolean;
  setShowPrivPol: (arg: boolean) => void;
};

export const PrivacyModal = ({
  showPrivPol,
  setShowPrivPol,
}: PrivacyModalProps) => {
  const { data: privPol } = useHTMLDocument('privacyPolicy');

  const privPolContent = privPol ? DOMPurify.sanitize(privPol) : '';

  return (
    <Modal
      title="Privacy Policy"
      wrapClassName={styles.modalWrap}
      visible={showPrivPol}
      onCancel={() => setShowPrivPol(false)}
      width={800}
      footer={
        <DownloadOutlined
          className={styles.downloadIcon}
          onClick={() => {
            downloadStaticDocument(
              'privacyPolicyPDF',
              DownloadFileNames.privacyPolicy,
            );
            setShowPrivPol(false);
          }}
        />
      }
    >
      <div
        className={styles.contentContainer}
        dangerouslySetInnerHTML={{ __html: privPolContent }}
        onClick={onLinkClick}
      />
    </Modal>
  );
};
