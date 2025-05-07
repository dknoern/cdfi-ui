import React, { FC } from 'react';
import { Form, Row, Col, Select, Upload } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FileUploadFormDataDocumentType } from 'types/library';
import { GRID_COL_HALF_ROW_SPAN, GRID_GUTTER } from 'constants/ui';
import { typography } from 'constants/typography';
import {
  AVAILABLE_YEARS_START,
  FISCAL_YEARS_SELECT_HEIGHT,
} from 'constants/forms';
import { DEFAULT_FOLDER_FILE_EXTENSIONS } from 'constants/libraries';
import { FormLabelWithIcon } from 'components';
import styles from './DocumentUpload.module.scss';
import { setDocumentIcon } from '../../../scenes/Library/tools';
import { useDocumentTypes } from 'dataManagement/useDocumentTypes';
import { cdfiStore } from 'store';

const { Dragger } = Upload;

const {
  fiscalYearSelectTitle,
  fiscalYearSelectDescription,
  fiscalQuarterSelectTitle,
  fiscalQuarterSelectDescription,
  fileUploadGeneralText,
  fileUploadGeneralDescription,
  fileUploadText,
  documentTypeSelectTitle,
  documentTypeSelectDescription,
} = typography('libraries');

const getDocumentIcon = (record: any): React.ReactFragment => {
  return setDocumentIcon(record.name);
};

let fiscalYears = new Array(
  new Date().getFullYear() - AVAILABLE_YEARS_START + 2,
)
  .fill(AVAILABLE_YEARS_START)
  .map((item, idx) => item + idx);

fiscalYears.splice(0, 0, '');

type DocumentUploadDocumentTypeProps = {
  formId: string;
  onFinish: (values: FileUploadFormDataDocumentType) => Promise<void>;
  filePresented: boolean;
  setFilePresented: (filePresented: boolean) => void;
  forDefaultFolder: boolean;
  defaultYear?: number;
  defaultQuarter?: number;
  setDocumentTypeId: (val: any) => void;
};

export const DocumentUploadDocumentType: FC<
  DocumentUploadDocumentTypeProps
> = ({
  formId,
  filePresented,
  setFilePresented,
  onFinish,
  forDefaultFolder,
  defaultYear,
  defaultQuarter,
  setDocumentTypeId,
}) => {
  const [form] = Form.useForm();
  const acceptedExtensions = forDefaultFolder
    ? DEFAULT_FOLDER_FILE_EXTENSIONS
    : undefined;

  const { cdfiId } = cdfiStore;
  const { data } = useDocumentTypes(cdfiId);
  const documentTypes = data ? data.documentTypes : undefined;

  return (
    <Form
      id={formId}
      layout="vertical"
      className={styles.form}
      initialValues={{
        fiscalYear: defaultYear ? defaultYear : '',
        fiscalQuarter: defaultQuarter ? defaultQuarter : '',
      }}
      onFinish={(values): void => {
        onFinish(values).then(() => {
          form.resetFields();
          setFilePresented(false);
        });
      }}
      form={form}
    >
      <Row gutter={GRID_GUTTER * 2}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            rules={[
              { required: true, message: 'Please select a document type' },
            ]}
            name="documentTypeId"
            label={
              <FormLabelWithIcon
                icon={QuestionCircleOutlined}
                description={documentTypeSelectDescription}
                text={documentTypeSelectTitle}
                className={styles.label}
              />
            }
          >
            <Select
              showSearch
              listHeight={FISCAL_YEARS_SELECT_HEIGHT}
              onSelect={() =>
                setDocumentTypeId(form.getFieldValue('documentTypeId'))
              }
              onDeselect={() => setDocumentTypeId(null)}
              options={documentTypes?.map((docType) => ({
                value: docType.documentTypeId,
                label: docType.name,
              }))}
              optionFilterProp={'label'}
            >
              {documentTypes?.map((docType) => (
                <Select.Option
                  key={docType.documentTypeId}
                  value={docType.documentTypeId}
                >
                  {docType.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={GRID_GUTTER * 2}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="fiscalYear"
            rules={[{ required: true, message: 'Please select a fiscal year!' }]}
            label={
              <FormLabelWithIcon
                icon={QuestionCircleOutlined}
                description={fiscalYearSelectDescription}
                text={fiscalYearSelectTitle}
                className={styles.label}
              />
            }
          >
            <Select listHeight={FISCAL_YEARS_SELECT_HEIGHT}>
              {fiscalYears.map((year) => (
                <Select.Option key={year} value={year}>
                  {year}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="fiscalQuarter"
            rules={[{ required: true, message: 'Please select a fiscal quarter!' }]}
            label={
              <FormLabelWithIcon
                icon={QuestionCircleOutlined}
                description={fiscalQuarterSelectDescription}
                text={fiscalQuarterSelectTitle}
                className={styles.label}
              />
            }
          >
            <Select>
              {['', 1, 2, 3, 4].map((quarter) =>
                Number(quarter) ? (
                  <Select.Option key={quarter} value={quarter}>
                    Quarter {quarter}
                  </Select.Option>
                ) : (
                  <Select.Option key={quarter} value={quarter}>
                    {quarter}
                  </Select.Option>
                ),
              )}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <div className={styles.fileUploadContainer}>
        <Form.Item
          name="file"
          valuePropName="fileList"
          getValueFromEvent={(event): unknown => {
            return event && event.fileList;
          }}
          label={
            <FormLabelWithIcon
              icon={QuestionCircleOutlined}
              description={fileUploadGeneralDescription}
              text={fileUploadGeneralText}
              className={styles.label}
            />
          }
        >
          <Dragger
            accept={acceptedExtensions}
            beforeUpload={(): boolean => {
              setFilePresented(true);
              return false;
            }}
            onRemove={(): void => {
              setFilePresented(false);
            }}
            className={filePresented ? styles.draggerCollapsed : styles.dragger}
            iconRender={(record): React.ReactNode => getDocumentIcon(record)}
          >
            <div className={styles.uploadText}>{fileUploadText}</div>
          </Dragger>
        </Form.Item>
      </div>
    </Form>
  );
};
