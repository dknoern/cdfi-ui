import { GRID_COL_HALF_ROW_SPAN, GRID_GUTTER, MODAL_WIDTH } from 'constants/ui';
import { ModalWithForm } from 'modals/ModalWithForm';
import React, { ReactNode, useEffect, useState } from 'react';
import tableStyles from 'components/ManageTableStyles.module.scss';
import { Button, Col, Divider, Form, Input, Row, Select, Table } from 'antd';
import { required } from 'tools/formRules';
import { TaxType } from './types';
import {
  useSubImpactAreas,
  useImpactAreas,
} from 'dataManagement/usePlatformSettings';
import { createSubImpactArea, updateSubImpactArea } from './tools';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

export type SubImpactAreasPayloadData = {
  name: string;
  impactArea: number | undefined;
  isEnabled: boolean;
};

type SubImpactAreaEditType = {
  key: number;
  id: number;
  name: string;
  impactArea: number;
  isEnabled: boolean;
};

type SubImpactAreasModalProps = {
  showSubImpactAreaModal: boolean;
  setShowSubImpactAreaModal: (arg: boolean) => void;
};

function addIdAsKey(data: TaxType[]): TaxType[] {
  return data.map((item) => ({ key: item.id, ...item }));
}

const subTitle = 'Sub Impact Areas';

export const SubImpactAreasModal = ({
  showSubImpactAreaModal,
  setShowSubImpactAreaModal,
}: SubImpactAreasModalProps) => {
  const [subImpactAreas, setSubImpactAreas] = useState<any[] | undefined>([]);
  const [impactAreaId, setImpactAreaId] = useState<number | undefined>(
    undefined,
  );
  const [dropDownSelected, setDropDownSelected] = useState<boolean>(false);
  const [tempId, setTempId] = useState<number | undefined>(undefined);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<SubImpactAreaEditType>();

  const { data: subImpactAreasData } = useSubImpactAreas();
  const { data: impactAreasData } = useImpactAreas();

  const impactAreasList = impactAreasData
    ? addIdAsKey(impactAreasData?.impactAreas)
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
      render: (value: SubImpactAreaEditType): ReactNode => {
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

  type SubImpactAreasOptionsType = {
    impactAreaId: number;
    subImpactAreas: string[];
  };

  const makeSubImpactAreasOptions = (): SubImpactAreasOptionsType[] => {
    const areaIdSet = new Set();

    subImpactAreasData?.subImpactAreas.forEach((area) =>
      areaIdSet.add(area.impactArea),
    );
    let result: SubImpactAreasOptionsType[] = [];
    Array.from(areaIdSet).map((num: any) => {
      let subAreas: string[] = [];
      subImpactAreasData?.subImpactAreas.map((area) => {
        if (num === area.impactArea) {
          subAreas.push(area.name);
        }
      });
      result.push({ impactAreaId: num, subImpactAreas: subAreas });
    });
    return result;
  };

  type SubImpactAreaIdHashType = {
    [key: string]: number;
  };

  const subImpactAreaIdHash: SubImpactAreaIdHashType =
    subImpactAreasData?.subImpactAreas.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.name]: curr.id,
      };
    }, {});

  type SubImpactAreaIsEnabledHashType = {
    [key: string]: boolean;
  };

  const subImpactAreaIsEnabledHash: SubImpactAreaIsEnabledHashType =
    subImpactAreasData?.subImpactAreas.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.name]: curr.isEnabled,
      };
    }, {});

  const getSubImpactAreasOptions = (value: number | undefined) => {
    const subImpactAreasOptions = makeSubImpactAreasOptions();
    const areaSelected = subImpactAreasOptions.find(
      (area) => area.impactAreaId === value,
    );
    return areaSelected?.subImpactAreas.map((area, i) => {
      return {
        key: i,
        name: area,
        impactArea: areaSelected.impactAreaId,
        id: subImpactAreaIdHash[`${area}`],
        isEnabled: subImpactAreaIsEnabledHash[`${area}`],
      };
    });
  };

  const onImpactAreaDropDownChange = (value: number) => {
    setDropDownSelected(true);
    setSubImpactAreas(getSubImpactAreasOptions(value));
    setImpactAreaId(value);
    setTempId(value);
  };

  const onCancel = () => {
    setShowSubImpactAreaModal(false);
    setDropDownSelected(false);
    setSubImpactAreas([]);
    form.resetFields();
  };

  const onAddItemFinish = (value: { name: string; isEnabled: boolean }) => {
    const payload: SubImpactAreasPayloadData = {
      ...value,
      impactArea: impactAreaId,
    };
    createSubImpactArea(payload).then(() => {
      setImpactAreaId(undefined);
      form.resetFields();
    });
  };

  const onEditFinish = (value: {
    name: string;
    rest?: { id?: number; key?: number; name?: string };
  }) => {
    const payload = {
      name: value.name,
      impactArea: impactAreaId,
      isEnabled: true,
    };
    const id = value.rest?.id;
    updateSubImpactArea(id, payload).then(() => {
      setShowEditModal(false);
    });
  };

  const onArchiveClick = (value: SubImpactAreaEditType) => {
    const payload = {
      name: value.name,
      impactArea: value.impactArea,
      isEnabled: false,
    };
    updateSubImpactArea(value.id, payload);
  };

  const onRestoreClick = (value: SubImpactAreaEditType) => {
    const payload = {
      name: value.name,
      impactArea: value.impactArea,
      isEnabled: true,
    };
    updateSubImpactArea(value.id, payload);
  };

  useEffect(() => {
    if (impactAreaId === undefined) {
      setSubImpactAreas(getSubImpactAreasOptions(tempId));
    } else {
      setSubImpactAreas(getSubImpactAreasOptions(impactAreaId));
    }
  }, [impactAreaId, subImpactAreasData]);

  return (
    <ModalWithForm
      formId={'formId'}
      title={`Manage Global List Contents - ${subTitle}`}
      visible={showSubImpactAreaModal}
      onCancel={onCancel}
      actionButtonText={'Finished'}
      width={MODAL_WIDTH.MEDIUM}
      hideActionButton={true}
      secondaryActionButton={true}
      secondaryActionButtonVisible={true}
      secondaryActionButtonText={'Finished'}
      onSecondaryActionButtonClick={onCancel}
    >
      <Form>
        <Form.Item id="formId" name="impactArea">
          <Select
            placeholder="Select Impact Area"
            options={impactAreasList?.map((item) => {
              if (item.isEnabled) {
                return {
                  value: item.id,
                  label: item.name,
                };
              } else {
                return {
                  key: item.name,
                  value: '',
                  label: ` -- Archived --  ${item.name}`,
                };
              }
            })}
            onChange={onImpactAreaDropDownChange}
          ></Select>
        </Form.Item>
        <Table
          rowClassName={(record) =>
            !record.isEnabled ? `${tableStyles.red}` : ''
          }
          dataSource={subImpactAreas}
          columns={columns}
          pagination={{ showSizeChanger: true }}
          size={'small'}
          scroll={{ y: '50vh' }}
          className={tableStyles.table}
        ></Table>
      </Form>

      <Divider style={{ border: 'unset' }}></Divider>

      <Form form={form} id="ADD_ITEM" onFinish={onAddItemFinish}>
        <Row gutter={[GRID_GUTTER, 0]}>
          <Col span={GRID_COL_HALF_ROW_SPAN}>
            <Form.Item id="ADD_ITEM" name="name" rules={[required()]}>
              <Input
                disabled={!dropDownSelected}
                placeholder="Enter new Sub Impact Area to this Impact Area."
              />
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
            <Button
              disabled={!dropDownSelected}
              type="primary"
              htmlType="submit"
            >
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
