import React, { FC, useEffect, useState } from 'react';
import {
  Col,
  Form,
  Input,
  Row,
  Select,
  DatePicker,
  Upload,
  Typography,
} from 'antd';
import { CustomDataReportFormProps } from 'types/form';
import {
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_THIRD_ROW_SPAN,
  GRID_GUTTER,
} from 'constants/ui';
import {
  required,
  requiredNum,
  requiredDate,
  matchesRegex,
} from 'tools/formRules';
import { useActiveUsers } from 'dataManagement/useActiveUsers';
import moment from 'moment';
import { Cdfi, Company, Subscriber, UserSimple } from 'types';
import { FormLabelWithIcon } from 'components';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { typography } from 'constants/typography';
import {
  useCdfiContacts,
  useCdfis,
  useSubscriberContacts,
  useSubscribers,
} from 'dataManagement';
import styles from '../CustomDataReports.module.scss';
import { setDocumentIcon } from '../../Library/tools';
import { sendToClientWarningText, status } from './constants';

declare type RawValue = string | number;
interface OptionData {
  value: string | number;
  label: React.ReactNode;
}
export interface CustomDataReportFormData {
  contact?: UserSimple | undefined;
  dataPoints?: string | undefined;
  dateGenerated?: string | undefined;
  dateRequested?: string | undefined;
  description?: string | undefined;
  expirationDate?: string | undefined;
  generator?: UserSimple | undefined;
  name?: string | undefined;
  recipients?: string | string[];
  requester?: UserSimple | undefined;
  company?: Company | undefined;
  subscriber?: Subscriber | undefined;
  status?: string | undefined;
  file?: any;
}

const { TextArea } = Input;
const { Paragraph } = Typography;
const { Dragger } = Upload;
const { fileUploadGeneralText, fileUploadGeneralDescription, fileUploadText } =
  typography('libraries');

const sortArray = (a: UserSimple, b: UserSimple) => {
  const x = a.firstName.toLowerCase();
  const y = b.firstName.toLowerCase();
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0;
};

const getDocumentIcon = (record: any): React.ReactFragment => {
  return setDocumentIcon(record.name);
};

export const CustomDataReportCreateForm: FC<
  CustomDataReportFormProps<CustomDataReportFormData>
> = ({
  onFinish,
  formId,
  form,
  setFilePresented,
  filePresented,
  initialValues,
}) => {
  /**
   * Hooks
   */
  const [hasUploadedFile, setHasUploadedFile] = useState<boolean>(false);
  const [organizationContacts, setOrganizationContacts] = useState<
    OptionData[]
  >([]);
  const [isSentToRequesterStatus, setIsSentToRequesterStatus] =
    useState<boolean>(false);
  const [isContactsSelectVisible, setShowContacts] = useState<boolean>(false);
  const { data: users } = useActiveUsers();
  const { data: cdfis } = useCdfis();
  const { data: subscribers } = useSubscribers();

  const isEditForm = formId === 'EDIT_CUSTOM_DATA_REPORT';
  const dateFormat = 'YYYY-MM-DD';
  const aerisAdminUsers = users?.aerisAdminUsers.sort(sortArray);
  const companies = [
    ...(cdfis || []).map((item) => ({ id: item.id, type: 'cdfi', item })),
    ...(subscribers || []).map((item) => ({
      id: item.id,
      type: 'subscriber',
      item,
    })),
  ].sort((a, b) => a.item.name.localeCompare(b.item.name));

  const [selectedOrganization, setSelectedOrganization] = useState<
    Cdfi | Subscriber
  >();
  const { data: cdfiContacts } = useCdfiContacts(
    selectedOrganization?.id as number,
  );
  const { data: subscriberContacts } = useSubscriberContacts(
    selectedOrganization?.id as number,
  );

  /**
   * Effects
   */
  useEffect(() => {
    if (!isEditForm) {
      form.setFieldsValue({ status: status[0].value });
      form.setFieldsValue({ expirationDate: moment().add(1, 'year') });
      setHasUploadedFile(false);
      setIsSentToRequesterStatus(false);
    } else {
      if (initialValues?.contact) {
        form.setFieldsValue({ contact: initialValues.contact.id });
      }
      if (initialValues?.dataPoints) {
        form.setFieldsValue({ dataPoints: initialValues.dataPoints });
      }
      if (initialValues?.dateGenerated) {
        form.setFieldsValue({
          dateGenerated: moment(initialValues.dateGenerated),
        });
      }
      if (initialValues?.dateRequested) {
        form.setFieldsValue({
          dateRequested: moment(initialValues.dateRequested),
        });
      }
      if (initialValues?.description) {
        form.setFieldsValue({
          description: initialValues.description,
        });
      }
      if (initialValues?.expirationDate) {
        form.setFieldsValue({
          expirationDate: moment(initialValues.expirationDate),
        });
      }
      if (initialValues?.generator) {
        form.setFieldsValue({
          generator: initialValues.generator.id,
        });
      }
      if (initialValues?.name) {
        setHasUploadedFile(true);
      } else {
        setHasUploadedFile(false);
      }
      if (typeof initialValues?.recipients !== 'string') {
        form.setFieldsValue({
          recipients: initialValues?.recipients?.join('; '),
        });
      }
      if (initialValues?.requester) {
        form.setFieldsValue({
          requester: `${initialValues.requester.firstName} ${initialValues.requester.lastName}`,
        });
      }
      if (initialValues?.company) {
        form.setFieldsValue({
          company: initialValues.company.id,
        });
      }
      if (initialValues?.status) {
        form.setFieldsValue({
          status: initialValues.status,
        });
        if (initialValues.status === 'SENT_TO_REQUESTER') {
          setIsSentToRequesterStatus(true);
        } else {
          setIsSentToRequesterStatus(false);
        }
      }
    }
  }, [
    isEditForm,
    initialValues,
    hasUploadedFile,
    isContactsSelectVisible,
    form,
  ]);

  useEffect(() => {
    const transformedCdfiContacts = cdfiContacts?.contacts?.map((contact) => ({
      value: contact.id,
      label: `${contact.firstName} ${contact.lastName}`,
    }));
    setOrganizationContacts(transformedCdfiContacts);
    const transformedSubscriberContacts = subscriberContacts?.contacts
      ?.filter((contact) => contact.isActive)
      .map((contact) => ({
        value: contact.id,
        label: `${contact.firstName} ${contact.lastName}`,
      }));
    setOrganizationContacts(transformedSubscriberContacts);
  }, [cdfiContacts, subscriberContacts]);

  useEffect(() => {
    setOrganizationContacts([]);
    form.setFieldsValue({ requester: undefined });
  }, [selectedOrganization]);

  /**
   * Handlers
   */
  const onOrganizationSelect = (value: RawValue) => {
    setShowContacts(true);
    const selectedOrg = companies.find((company) => company.id === value);
    if (selectedOrg) {
      setSelectedOrganization(selectedOrg.item);
    }
  };

  return (
    <Form
      id={formId}
      onFinish={onFinish}
      layout="vertical"
      form={form}
      requiredMark={false}
      initialValues={initialValues}
      style={{ marginTop: '-42px' }}
    >
      <Row gutter={[GRID_GUTTER, 0]} align="bottom">
        <Col span={GRID_COL_HALF_ROW_SPAN} style={{ marginBottom: '20px' }}>
          {isEditForm
            ? 'Please enter the details of the Custom Data Report.'
            : 'Please enter the details of the Custom Data Report to be created.'}
        </Col>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item name="status" rules={[required()]} label="Status">
            <Select
              placeholder="Select Status"
              options={status.map((status) => ({
                value: status.value,
                label: status.label,
              }))}
              disabled={isSentToRequesterStatus}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="contact"
            rules={[requiredNum()]}
            label="Aeris Contact"
          >
            <Select
              placeholder="Select Aeris Contact"
              options={aerisAdminUsers?.map((user) => ({
                value: user.id,
                label: `${user.firstName} ${user.lastName}`,
              }))}
              optionFilterProp="label"
              showSearch
              disabled={isSentToRequesterStatus}
            />
          </Form.Item>
        </Col>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item name="generator" label="Report Generator">
            <Select
              placeholder="Select Generator"
              options={aerisAdminUsers?.map((user) => ({
                value: user.id,
                label: `${user.firstName} ${user.lastName}`,
              }))}
              optionFilterProp="label"
              showSearch
              disabled={isSentToRequesterStatus}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="company"
            rules={[requiredNum()]}
            label="Requester Organization"
          >
            <Select
              showSearch
              placeholder="Select Requester Organization"
              options={companies?.map((company) => ({
                value: company.id,
                label: `${company.item.name}`,
              }))}
              optionFilterProp="label"
              disabled={isSentToRequesterStatus}
              onChange={onOrganizationSelect}
              value={selectedOrganization?.id}
            />
          </Form.Item>
        </Col>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item name="requester" rules={[requiredNum()]} label="Requester">
            <Select
              showSearch
              placeholder="Select Requester"
              options={organizationContacts?.map((contact) => ({
                value: contact.value,
                label: `${contact.label}`,
              }))}
              optionFilterProp="label"
              disabled={isSentToRequesterStatus || !isContactsSelectVisible}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item
            name="recipients"
            label="Copied to"
            rules={[matchesRegex.multipleEmails]}
          >
            <Input
              placeholder="Enter emails to share the report with, separated by semicolons"
              disabled={isSentToRequesterStatus}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_THIRD_ROW_SPAN}>
          <Form.Item
            name="dateRequested"
            rules={[requiredDate()]}
            label="Date Requested"
          >
            <DatePicker
              format={dateFormat}
              disabled={isSentToRequesterStatus}
            />
          </Form.Item>
        </Col>
        <Col span={GRID_COL_THIRD_ROW_SPAN}>
          <Form.Item name="dateGenerated" label="Date Generated">
            <DatePicker
              format={dateFormat}
              disabled={isSentToRequesterStatus}
            />
          </Form.Item>
        </Col>
        <Col span={GRID_COL_THIRD_ROW_SPAN}>
          <Form.Item name="expirationDate" label="Expiration Date">
            <DatePicker format={dateFormat} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item
            name="description"
            rules={[required()]}
            label="Report Purpose and Description"
          >
            <Input
              placeholder="Enter a short description of what the Client has requested"
              maxLength={500}
              disabled={isSentToRequesterStatus}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col span={GRID_COL_FULL_ROW_SPAN}>
          <Form.Item
            name="dataPoints"
            label="Report Data Points (viewable only by Aeris Admin)"
          >
            <TextArea
              placeholder="Data points to be included in the report - viewable only by Aeris Admin"
              maxLength={1000}
              showCount
              disabled={isSentToRequesterStatus}
            />
          </Form.Item>
        </Col>
      </Row>
      {isEditForm && hasUploadedFile ? (
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Paragraph strong style={{ fontSize: 14 }}>
              Uploaded Report Name:
            </Paragraph>
            <Paragraph style={{ fontSize: 14 }}>
              {initialValues?.name}
            </Paragraph>
            <Paragraph style={{ fontSize: 12 }}>
              Upload a new file if you would like to replace the existing one.
              Please note that this deletes the currently uploaded file.
            </Paragraph>
          </Col>
          {initialValues?.status === 'COMPLETED' && (
            <Col span={GRID_COL_HALF_ROW_SPAN}>
              <Paragraph style={{ color: 'red', marginTop: 30 }}>
                {sendToClientWarningText}
              </Paragraph>
            </Col>
          )}
        </Row>
      ) : null}
      {isEditForm ? (
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
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
                  beforeUpload={(): boolean => {
                    setFilePresented(true);
                    return false;
                  }}
                  onRemove={(): void => {
                    setFilePresented(false);
                  }}
                  className={
                    filePresented ? styles.draggerCollapsed : styles.dragger
                  }
                  iconRender={(record): React.ReactNode =>
                    getDocumentIcon(record)
                  }
                  disabled={isSentToRequesterStatus}
                >
                  <div className={styles.uploadText}>{fileUploadText}</div>
                </Dragger>
              </Form.Item>
            </div>
          </Col>
        </Row>
      ) : null}
    </Form>
  );
};
