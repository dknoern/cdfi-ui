import React, { FC } from 'react';
import { Form, Row, Col, Select, Upload } from 'antd';
import { QuestionCircleOutlined, FileExcelOutlined } from '@ant-design/icons';
import { Documents, FileUploadFormData, Folder } from 'types/library';
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
import { useAerisLibraryData} from 'dataManagement/useGlobalLibraries';
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
  fileUploadHint1,
  fileUploadHint2,
} = typography('libraries');

const getDocumentIcon = (record: any): React.ReactFragment => {
  return setDocumentIcon(record.name);
};
const maxFiscalYearValue =  new Date().getFullYear() + 1;
const fiscalYears = new Array(
  new Date().getFullYear() - AVAILABLE_YEARS_START + 2)
  .fill(maxFiscalYearValue)
  .map((item, idx) => item - idx);

  const currentQuarter = Math.ceil((new Date().getMonth() + 1) / 3);

  const getReportInterimQuater = (quarter: number) => {
    return quarter == 4 ? 1 : quarter + 1;
  }

  const getReportInterimYear = (quarter: number, year: number)=> {
    return quarter == 4 ? year + 1 : year;
  }

    type DocumentUploadProps = {
      formId: string;
      onFinish: (values: FileUploadFormData) => Promise<void>;
      filePresented: boolean;
      setFilePresented: (filePresented: boolean) => void;
      forDefaultFolder: boolean;
      defaultYear?: number;
      defaultQuarter?: number;
      fiscalYear?:number;
      fiscalQuarter?: number;
    };

    export const DocumentUpload: FC<DocumentUploadProps> = ({
      formId,
      filePresented,
      setFilePresented,
      onFinish,
      forDefaultFolder,
      defaultYear,
      defaultQuarter,
      fiscalQuarter,
      fiscalYear,
    }) => {
      const [form] = Form.useForm();
      const acceptedExtensions = forDefaultFolder
      ? DEFAULT_FOLDER_FILE_EXTENSIONS
      : undefined;
      const isInterimFinancials = fiscalQuarter && fiscalYear;


    const reportYear = isInterimFinancials? getReportInterimYear(fiscalQuarter!, fiscalYear!): new Date().getFullYear();
    const reportQuater = isInterimFinancials? getReportInterimQuater(fiscalQuarter!): currentQuarter;

  return (
    <Form
      id={formId}
      layout="vertical"
      className={styles.form}
      initialValues={{
        fiscalYear: defaultYear ? defaultYear : reportYear,
        fiscalQuarter: defaultQuarter ?? reportQuater,
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
              {[1, 2, 3, 4].map((quarter) => (
                <Select.Option key={quarter} value={quarter}>
                  Quarter {quarter}
                </Select.Option>
              ))}
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
