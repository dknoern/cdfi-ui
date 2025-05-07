import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Input, Modal, List, Select, Form, Col, Row, Spin } from 'antd';
import { systemEmailStore } from 'store';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { toJS } from 'mobx';
import { SelectValue } from 'antd/lib/select';
import ReactQuill from 'react-quill';
import { VoidFn, IEmailCategory } from '../../../../../../types';
import {
  createEmailCategory,
  updateEmailCategory,
} from '../../../../../../dataManagement/operations/emailOperations';
import styles from './CategoriesEmail.module.scss';
import {
  GRID_COL_HALF_ROW_SPAN,
  GRID_COL_QUARTER_ROW_SPAN,
  GRID_COL_THIRD_ROW_SPAN,
  GRID_COL_TWO_THIRDS_ROW_SPAN,
  GRID_GUTTER,
} from '../../../../../../constants';
import { maxLength, required } from '../../../../../../tools/formRules';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { textWithLine } from '../../../../../../tools';

type CategoriesEmailProps = {
  visible: boolean;
  onClose: VoidFn;
};

const formId = 'EMAIL_CATEGORIES';

export const CategoriesEmail: FC<CategoriesEmailProps> = observer(
  ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
    const [isCloseModalCategory, setIsCloseModalCategory] =
      useState<any>(false);
    const [loading, setLoading] = useState(false);
    const {
      emailCategories,
      emailCategory,
      addEmailCategory,
      deleteCategory,
      editCategory,
      updateCategory,
      updateCategories,
      emailTemplates,
      reminders,
      getEmailReminders,
      getDeleteEmailCategory,
      isEditCategoryForm,
      setIsEditCategoryForm,
      getEmailTemplate,
      emailTemplate,
      setEmailTemplate,
    } = systemEmailStore;

  useEffect(() => {
    getEmailReminders();
  }, [])

  useEffect(() => {
    setEmailTemplate(null);
  }, [visible]);

    const createEmailCategoryForm = async () => {
      const data = {
        name: form.getFieldValue('category'),
        emailTemplateId: form.getFieldValue('emailTemplates'),
        dependentOn: form.getFieldValue('dependentOn'),
        isEnabled: true,
      };
      const createCategory = await createEmailCategory(data);
      addEmailCategory(createCategory);

      setIsEditCategoryForm(false);

      form.setFieldsValue({
        category: '',
        emailTemplates: undefined,
        dependentOn: '',
        isEnabled: true,
      });
      setEmailTemplate(null);
    };

    const delEmailCategory = async (item: IEmailCategory) => {
      if (!item.id) {
        return;
      }
      await getDeleteEmailCategory(item.id);
    };

    const editEmailCategoryF = (item: IEmailCategory) => {
      if (!item.id) {
        return;
      }
      setShowEditCategoryModal(true);
      editCategory(item.id);
      setIsEditCategoryForm(false);

      form.setFieldsValue({
        category: '',
        emailTemplates: undefined,
        dependentOn: '',
        isEnabled: true,
      });
    };

    const onCloseEditModal = () => {
      setShowEditCategoryModal(false);
    };

    const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateCategory({ ...emailCategory, name: e.target.value });
    };

    const updateEmailCategoryF = async () => {
      const emailCategoryData = {
        ...emailCategory,
        dependentOn: toJS(emailCategory)?.dependentOn?.reminderType,
      };
      await updateEmailCategory(emailCategoryData);
      updateCategories(emailCategory);
      setShowEditCategoryModal(false);
    };

    const findEmailCategory = () => {
      return (
        <div className={styles.createCategoryBlock}>
          <Input
            placeholder="Enter category"
            value={emailCategory?.name}
            onChange={onChangeCategory}
          />
          <Button
            type="primary"
            onClick={updateEmailCategoryF}
            style={{ width: '100%' }}
          >
            Update Category
          </Button>
        </div>
      );
    };

    const onCloseModal = () => {
      if (isEditCategoryForm) {
        setIsCloseModalCategory(true);
      } else {
        form.setFieldsValue({
          category: '',
          emailTemplates: undefined,
          dependentOn: '',
          isEnabled: true,
        });
        onClose();
      }
    };

    const closeConfirmEditManageEmail = async () => {
      setIsCloseModalCategory(false);
      form.setFieldsValue({
        category: '',
        emailTemplates: undefined,
        dependentOn: '',
        isEnabled: true,
      });
      setEmailTemplate(null);
      onClose();
    };

    const onChangeTemplateData = (value: SelectValue) => {
      setLoading(true);
      getEmailTemplate(+value).then(() => {
        setLoading(false);
      });
    };

    const getValueTemplate = () => {
      if (emailTemplate === null) {
        return '<p>${text}</p>';
      }
      if (
        emailTemplate?.defaultText !== undefined &&
        emailTemplate?.templateBody !== undefined
      ) {
        return textWithLine(
          emailTemplate?.templateBody.replace(
            '${text}',
            emailTemplate.defaultText,
          ),
        );
      }
      return emailTemplate?.templateBody;
    };

    const defaultValues = {
      id: emailCategory?.id,
      name: emailCategory?.name,
      emailTemplateId: emailCategory?.emailTemplateId,
      dependentOn: emailCategory?.dependentOn,
      isEnabled: emailCategory?.isEnabled,
    };

    return (
      <div>
        <Modal
          visible={visible}
          onCancel={onCloseModal}
          title="Email Categories"
          footer={null}
          centered
          closable
          width={1250}
        >
          {loading ? (
            <div className={styles.spin}>
              <Spin spinning />
            </div>
          ) : null}
          <div className={styles.wrapper}>
            <div className={styles.wrapperCategory}>
              <div className={styles.createCategoryBlock}>
                <Form
                  id={formId}
                  layout="vertical"
                  form={form}
                  onFinish={createEmailCategoryForm}
                  initialValues={defaultValues}
                  onValuesChange={() => setIsEditCategoryForm(true)}
                >
                  <Row gutter={[GRID_GUTTER, 0]}>
                    <Col span={GRID_COL_HALF_ROW_SPAN}>
                      <Form.Item name="emailTemplates" label="Email Templates">
                        <Select
                          placeholder="Select email template"
                          options={toJS(emailTemplates).map((value) => ({
                            value: value.id,
                            label: value.description,
                          }))}
                          onChange={(value) => onChangeTemplateData(value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={GRID_COL_HALF_ROW_SPAN}>
                      <Form.Item
                        name="dependentOn"
                        label="Dependent on which field?"
                        rules={[
                          { required: true, message: 'Field is required' },
                        ]}
                      >
                        <Select
                          placeholder="Select Email Dependent field"
                          options={toJS(reminders).map((value) => ({
                            value: value.reminderType,
                            label: value.description,
                          }))}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={GRID_COL_TWO_THIRDS_ROW_SPAN}>
                      <Form.Item
                        name="category"
                        label="Email Category"
                        rules={[required(), maxLength(300)]}
                      >
                        <Input
                          placeholder="Enter category"
                          max={300}
                          autoComplete="new-email"
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      span={GRID_COL_THIRD_ROW_SPAN}
                      className={styles.button}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                      >
                        Add Category
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className={styles.list}>
                <List
                  bordered
                  dataSource={emailCategories ?? []}
                  renderItem={(item: IEmailCategory): React.ReactNode => (
                    <List.Item
                      actions={[
                        <div>
                          <Button
                            type="link"
                            onClick={() => editEmailCategoryF(item)}
                            name="edit"
                            icon={<EditFilled />}
                            title="Edit Category"
                          />
                          <Button
                            id="deleteButton"
                            onClick={() => delEmailCategory(item)}
                            type="link"
                            name="delete"
                            title="Delete Category"
                            icon={<DeleteFilled />}
                          />
                        </div>,
                      ]}
                    >
                      {item.name}
                    </List.Item>
                  )}
                />
                <Modal
                  visible={showEditCategoryModal}
                  onCancel={onCloseEditModal}
                  title="Edit Category"
                  footer={null}
                  centered
                  closable
                  width={750}
                >
                  {findEmailCategory()}
                </Modal>
              </div>
            </div>
            <div className={styles.wrapperTemplate}>
              <div className={styles.exampleEmailWrapper}>
                <p className={styles.title}>
                  Template:{' '}
                  {emailTemplate === null
                    ? 'Default Template'
                    : `${emailTemplate.fileName}`}
                </p>
                <ReactQuill
                  theme="snow"
                  value={getValueTemplate()}
                  className={styles.formatText}
                  readOnly
                />
              </div>
            </div>
          </div>
          <Row gutter={[GRID_GUTTER, 0]}>
            <Col
              span={4}
              className={styles.button}
              style={{ marginLeft: 'auto' }}
            >
              <Button
                type="primary"
                htmlType="button"
                onClick={onCloseModal}
                style={{ width: '100%' }}
              >
                Close
              </Button>
            </Col>
          </Row>
        </Modal>
        <ConfirmModal
          visible={isCloseModalCategory}
          onClose={(): void => setIsCloseModalCategory(false)}
          onClick={closeConfirmEditManageEmail}
          text="Do you really want to cancel? All data entered will be lost."
          buttonText="Yes"
        />
      </div>
    );
  },
);
