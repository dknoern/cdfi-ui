import React, { ReactNode, useState } from 'react';
import { Button, Col, Divider, Form, Input, Row, Table } from 'antd';
import { GRID_COL_HALF_ROW_SPAN, GRID_GUTTER, MODAL_WIDTH } from 'constants/ui';
import { ModalWithForm } from 'modals/ModalWithForm';
import { required } from 'tools/formRules';
import tableStyles from 'components/ManageTableStyles.module.scss';
import { createOrganizationType, updateOrganizationType } from './tools';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { useOrganizationTypes } from 'dataManagement/usePlatformSettings';
import { GlobalListEditValueType, TaxType } from './types';

function addIdAsKey(data: TaxType[]): TaxType[] {
  return data.map((item) => ({ key: item.id, ...item }));
}

const subTitle = 'Organization Types';

export type OrganizationTypePayloadData = {
  name: string;
  isEnabled: boolean;
};

type OrganizationTypesModalProps = {
  showOrganizationTypes: boolean;
  setShowOrganizationTypes: (arg: boolean) => void;
};

export const OrganizationTypesModal = ({
  showOrganizationTypes,
  setShowOrganizationTypes,
}: OrganizationTypesModalProps) => {
  const [editValue, setEditValue] = useState<GlobalListEditValueType>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const { data } = useOrganizationTypes();

  const listWithKey = data?.organizationTypes
    ? addIdAsKey(data.organizationTypes)
    : undefined;

  const [form] = Form.useForm();

  const columns = [
    {
      key: 'globalList',
      title: `${subTitle}`,
      dataIndex: 'name',
    },
    {
      key: 'actionButtons',
      title: '',
      width: 100,
      render: (value: GlobalListEditValueType): ReactNode => {
        if (!value.isEnabled) {
          return (
            <Button
              type="link"
              className={tableStyles.red}
              onClick={() => onRestoreClick(value)}
            >
              Restore
            </Button>
          );
        }

        return (
          <>
            <Button
              type="link"
              onClick={() => {
                setShowEditModal(true);
                setEditValue(value);
              }}
              icon={<EditFilled />}
            />
            <Button
              onClick={() => {
                onArchiveClick(value);
              }}
              type="link"
              icon={<DeleteFilled />}
            />
          </>
        );
      },
    },
  ];

  const onAddItemFinish = (value: OrganizationTypePayloadData) => {
    const payload = value;
    createOrganizationType(payload)?.then(() => form.resetFields());
  };

  const onEditFinish = (value: {
    name: string;
    rest?: { id?: number; key?: number; name?: string };
  }) => {
    const payload = { name: value.name, isEnabled: true };
    const id = value.rest?.id;
    updateOrganizationType(id, payload).then(() => setShowEditModal(false));
  };

  const onArchiveClick = (value: GlobalListEditValueType) => {
    const payload = { name: value.name, isEnabled: false };
    updateOrganizationType(value.id, payload);
  };

  const onRestoreClick = (value: GlobalListEditValueType) => {
    const payload = { name: value.name, isEnabled: true };
    updateOrganizationType(value.id, payload);
  };

  const onCancel = () => {
    setShowOrganizationTypes(false);
  };

  return (
    <ModalWithForm
      formId={'formId'}
      title={`Manage Global List Contents - ${subTitle}`}
      visible={showOrganizationTypes}
      onCancel={onCancel}
      actionButtonText={'Finished'}
      width={MODAL_WIDTH.MEDIUM}
      hideActionButton={true}
      secondaryActionButton={true}
      secondaryActionButtonVisible={true}
      secondaryActionButtonText={'Finished'}
      onSecondaryActionButtonClick={onCancel}
    >
      <Table
        rowClassName={(record) =>
          !record.isEnabled ? `${tableStyles.red}` : ''
        }
        dataSource={listWithKey}
        columns={columns}
        pagination={{ showSizeChanger: true }}
        size={'small'}
        scroll={{ y: '50vh' }}
        className={tableStyles.table}
      ></Table>

      <Divider style={{ border: 'unset' }}></Divider>

      <Form form={form} id="ADD_ITEM" onFinish={onAddItemFinish}>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item id="ADD_ITEM" name="name" rules={[required()]}>
              <Input placeholder="Enter new item." />
            </Form.Item>
            <Form.Item
              style={{ height: 0 }}
              initialValue={true}
              id="GLOBAL_LIST_EDIT"
              name="isEnabled"
            >
              <Input hidden />
            </Form.Item>
          </Col>

          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Button type="primary" htmlType="submit">
              Add value to list
            </Button>
          </Col>
        </Row>
      </Form>
      <ModalWithForm
        title={subTitle}
        formId="GLOBAL_LIST_EDIT"
        visible={showEditModal}
        onCancel={() => setShowEditModal(false)}
      >
        <Form onFinish={onEditFinish} id="GLOBAL_LIST_EDIT">
          <Form.Item
            initialValue={editValue?.name}
            id="GLOBAL_LIST_EDIT"
            name="name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ height: 0 }}
            initialValue={editValue}
            id="GLOBAL_LIST_EDIT"
            name="rest"
          >
            <Input hidden />
          </Form.Item>
        </Form>
      </ModalWithForm>
    </ModalWithForm>
  );
};
