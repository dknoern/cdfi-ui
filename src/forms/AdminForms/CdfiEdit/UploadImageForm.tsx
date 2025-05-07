import React from 'react';
import { ModalWithForm } from 'modals/ModalWithForm';
import { Button, Form, Upload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import styles from './UploadImageForm.module.scss';

type UploadImageFormProps = {
  oneFileDropped: boolean;
  showUploadPopup: boolean;
  setOneFileDropped: (arg: boolean) => void;
  setShowUploadPopup: (arg: boolean) => void;
  handleLogoUpload: (arg: UploadChangeParam) => void;
};

export const UploadImageForm = ({
  oneFileDropped,
  showUploadPopup,
  setOneFileDropped,
  setShowUploadPopup,
  handleLogoUpload,
}: UploadImageFormProps) => {
  return (
    <ModalWithForm
      formId='uploadLogo'
      title="Upload CDFI Logo"
      footer={[
        <Button
          key="cancelLogoSubmitBtn"
          className={styles.cancelLogoSubmitBtn}
          onClick={() => setShowUploadPopup(false)}
        >
          Cancel
        </Button>,
        <Button
          key="logoSubmitBtn"
          className={styles.logoSubmitBtn}
          form="uploadLogo"
          htmlType="submit"
          disabled={oneFileDropped ? false : true}
        >
          Upload
        </Button>,
      ]}
      onCancel={() => setShowUploadPopup(false)}
      visible={showUploadPopup}
    >
      <Form id="uploadLogo" onFinish={handleLogoUpload}>
        <Form.Item
          name="fileList"
          valuePropName="fileList"
          getValueFromEvent={(event): unknown => {
            return event && event.fileList;
          }}
        >
          <Upload.Dragger
            accept=".png,.jpg,.bmp"
            beforeUpload={() => {
              setOneFileDropped(true);
              return false;
            }}
            onRemove={() => setOneFileDropped(false)}
            className={oneFileDropped ? styles.hideDragger : styles.dragger}
          >
            <p>Drop file here or click to upload</p>
            <p className={styles.draggerSubText}>
              You can upload the following file types: .bmp, .jpg, .png
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </ModalWithForm>
  );
};
