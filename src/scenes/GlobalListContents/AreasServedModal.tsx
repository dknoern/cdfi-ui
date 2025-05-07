import React, { ReactNode, useState } from 'react';
import { Button, Col, Divider, Form, Input, Row, Table } from 'antd';
import {
  GRID_COL_THIRD_ROW_SPAN,
  GRID_GUTTER,
  MODAL_WIDTH,
} from 'constants/ui';
import { ModalWithForm } from 'modals/ModalWithForm';
import { required } from 'tools/formRules';
import tableStyles from 'components/ManageTableStyles.module.scss';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { useAreasServed } from 'dataManagement/usePlatformSettings';
import { TaxType } from './types';
import { createAreaServed, updateAreasServed } from './tools';

function addIdAsKey(data: TaxType[]): TaxType[] {
  return data.map((item) => ({ key: item.id, ...item }));
}

const subTitle = 'Areas Served';

export type AreasServedPayloadData = {
  name: string;
  code: string;
  isEnabled: boolean;
};

type AreasServedModalModalProps = {
  showAreasServedModal: boolean;
  setShowAreasServedModal: (arg: boolean) => void;
};

export const AreasServedModal = ({
  showAreasServedModal,
  setShowAreasServedModal,
}: AreasServedModalModalProps) => {
  const [editValue, setEditValue] =
    useState<{ key: number; id: number; name: string; code: string; isEnabled: boolean }>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const { data } = useAreasServed();

  const listWithKey = data?.states ? addIdAsKey(data.states) : undefined;

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
      render: (value: {
        key: number;
        id: number;
        name: string;
        code: string;
        isEnabled: boolean;
      }): ReactNode => {
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
        )      
      },
    },
  ];

  const onAddItemFinish = (value: AreasServedPayloadData) => {
    const payload = value;
    createAreaServed(payload)?.then(() => form.resetFields());
  };

  const onEditFinish = (value: {
    name: string;
    code: string;
    rest?: { id?: number; key?: number; name?: string; code?: string };
  }) => {
    const payload = { name: value.name, code: value.code, isEnabled: true };
    const id = value.rest?.id;
    updateAreasServed(id, payload).then(() => setShowEditModal(false));
  };

  const onArchiveClick = (value: { key: number; id: number; name: string; code: string; isEnabled: boolean }) => {
    const payload = { name: value.name, code: value.code, isEnabled: false };
    updateAreasServed(value.id, payload);
  };

  const onRestoreClick = (value: { key: number; id: number; name: string; code: string; isEnabled: boolean }) => {
    const payload = { name: value.name, code:value.code, isEnabled: true };
    updateAreasServed(value.id, payload);
  };

  const onCancel = () => {
    setShowAreasServedModal(false);
  };

  return (
    <ModalWithForm
      formId={'formId'}
      title={`Manage Global List Contents - ${subTitle}`}
      visible={showAreasServedModal}
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
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <Form.Item id="ADD_ITEM" name="name" rules={[required()]}>
              <Input placeholder="Enter new area." />
            </Form.Item>
          </Col>
          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <Form.Item id="ADD_ITEM" name="code" rules={[required()]}>
              <Input placeholder="Enter new code." />
            </Form.Item>
          </Col>

          <Col span={GRID_COL_THIRD_ROW_SPAN}>
            <Button type="primary" htmlType="submit">
              Add values to list
            </Button>
          </Col>
          <Form.Item
              style={{ height: 0 }}
              initialValue={true}
              id="GLOBAL_LIST_EDIT"
              name="isEnabled"
            >
              <Input hidden />
            </Form.Item>
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
            label="Name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={editValue?.code}
            id="GLOBAL_LIST_EDIT"
            name="code"
            label="Code"
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
