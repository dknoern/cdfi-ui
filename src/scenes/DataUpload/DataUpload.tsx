import React, { FC } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FileUploadFinishHandler } from 'types/library';
import {
  PageSectionWrapper,
  withProcessModal,
  WithProcessModalProps,
  withLibraryLoading,
  WithLibraryLoadingProps,
} from 'components';
import { DocumentUploadModal } from './components';
import { downloadReportingTemplate } from './tools';
import styles from './DataUpload.module.scss';

const DataUploadFn: FC<WithProcessModalProps & WithLibraryLoadingProps> = ({
  setUploadFlowState,
  showUploadModal,
  loadLibrary,
  setTexts,
}) => {
  const onUploadFinish: FileUploadFinishHandler = (
    type,
    documentId,
    message,
  ) => {
    setUploadFlowState({
      uploadFinished: true,
      modalType: type,
      errorDocumentId: documentId,
    });

    setTexts({ description: message });
    loadLibrary();
  };

  return (
    <PageSectionWrapper
      title="Data upload"
      description={
        <>
          You can upload data from your system in your format by clicking the
          Upload File button or use a template provided by your Requestor. To
          use your Requestor’s template, click&nbsp;
          <Button
            type="link"
            onClick={downloadReportingTemplate}
            className={styles.linkBtn}
          >
            here
          </Button>
          &nbsp;to download it.
          <br />
          Only Microsoft Excel files are accepted.
        </>
      }
    >
      <div className={styles.buttons}>
        <Button
          key="uploadFile"
          type="default"
          icon={<PlusOutlined className={styles.icon} />}
          className={styles.button}
          onClick={(): void => {
            setUploadFlowState('showModal');
          }}
          id="uploadFileBtn"
        >
          Upload file
        </Button>
      </div>
      <DocumentUploadModal
        visible={showUploadModal}
        onCancel={(): void => {
          setUploadFlowState('hideModal');
        }}
        onUploadFinish={onUploadFinish}
      />
    </PageSectionWrapper>
  );
};

export const DataUpload = withProcessModal(withLibraryLoading(DataUploadFn));
