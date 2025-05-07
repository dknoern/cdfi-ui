import React, { FC, useEffect, useState } from 'react';
import {VoidFn} from 'types';
import {Form, Row, Col, Select, Checkbox, Table, Input, Space} from 'antd';
import {QuestionCircleOutlined, SearchOutlined} from '@ant-design/icons';

import {
  AerisLibraryViewer,
  AerisLibraryDocuemntAccess,
  AerisLibraryDocuemntAccessWithKey,
  DocumentsWithinParentFolders,
  DocumentsWithinParentFoldersWithKey,
} from 'types/library';
import { GRID_COL_HALF_ROW_SPAN, GRID_GUTTER } from 'constants/ui';
import { typography } from 'constants/typography';
import { FormLabelWithIcon } from 'components';
import { getExpandableIconDocumentsAccess } from 'components/LibraryTable/tools';
import { dataParentList } from '../../../scenes/Library/tools';
import { UseAerisLibraryDocumentsAccess } from '../../../dataManagement';
import { cdfiStore } from '../../../store';
import styles from '../../../components/LibraryTable/LibraryTable.module.scss';
import stylesGlobalLibrary from '../../../scenes/Library/GlobalLibrary/GlobalLibrary.module.scss';
import {handleFilterFile} from "../../../tools/searchBarTools/handleFilter";

const { viewerAccessDesc, viewer } = typography('libraries');

type DocumentUploadProps = {
  formId: string;
  onFinish: VoidFn;
  viewers: AerisLibraryViewer[];
};
export const DocumentPermissionsForm: FC<DocumentUploadProps> = ({
  formId,
  onFinish,
  viewers,
}) => {
  const { cdfiId } = cdfiStore;
  const [companyId, setCompanyId] = useState(viewers[0]?.companyId);
  const { data: documents } = UseAerisLibraryDocumentsAccess(
    cdfiId,
    companyId as number,
  );
  const [form] = Form.useForm();
  const [alreadySelectedDocumentsRows, setAlreadySelectedDocumentsRows] =
    useState<React.Key[]>([]);
  const [documentsWithParentFolderData, setDocumentsWithParentFolderData] =
    useState<DocumentsWithinParentFolders[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const [defaultList, setDefaultList] = useState<AerisLibraryDocuemntAccessWithKey[]>([]);

  function addIndexAsKeyDocuments(
    list: AerisLibraryDocuemntAccess[],
  ): AerisLibraryDocuemntAccessWithKey[] {
    return list.map((actionItem, index) => {
      return { key: actionItem.id, ...actionItem };
    });
  }
  function addIndexAsKeyParentFolder(
    parentFolderList: DocumentsWithinParentFolders[],
  ): DocumentsWithinParentFoldersWithKey[] {
    return parentFolderList.map((actionItem, index) => {
      return { key: actionItem.id, ...actionItem };
    });
  }
  const hasAccessDocumentKeys: number[] = [];
  useEffect(() => {
    dataParentList.forEach((i) => {
      i.children = [];
    });

    if (documents?.permissions?.length > 0) {
      const docsWithKeys = addIndexAsKeyDocuments(documents.permissions);
      const dataParentListWithKeys = addIndexAsKeyParentFolder(dataParentList);
      docsWithKeys.forEach((document: AerisLibraryDocuemntAccess) => {
        if (document.hasAccess) {
          hasAccessDocumentKeys.push(document.id);
        }
        dataParentListWithKeys.forEach((element) => {
          if (element.id === document.folderId) {
            element.children.push(document);
          }
        });
      });
      setDocumentsWithParentFolderData(dataParentList);
      setAlreadySelectedDocumentsRows(hasAccessDocumentKeys);
      setDefaultList(docsWithKeys);
    }
  }, [documents]);

  const columns = [
    {
      width: '200px',
      title: 'Select all',
      dataIndex: 'fileName',
      key: 'fileName',
    },
  ];

  const rowClassName = (record: DocumentsWithinParentFolders): string => {
    return `aerisRow-${record.id} aerisRow`;
  };

  const handleViewerSelection = (value: any): void => {
    setCompanyId(value.value);
  };

  const setSelectAll = (documentsList: any) => {
    return documentsList.every((item: AerisLibraryDocuemntAccess)=>(item.hasAccess)) ? true
      : documentsList.every((item: AerisLibraryDocuemntAccess)=>(!item.hasAccess)) ? false : undefined;
  }

  const [filterValue, setFilterValue] = useState('');
  const [filtered, setFiltered] = useState<DocumentsWithinParentFolders[]>(documentsWithParentFolderData);

  useEffect(() => {
    setFiltered(handleFilterFile(filterValue, documentsWithParentFolderData));
  }, [documents, filterValue, documentsWithParentFolderData]);

  return (
    <Form
      id={formId}
      layout="vertical"
      className={styles.form}
      initialValues={{
        viewers: { label: viewers[0].name, value: viewers[0].companyId },
      }}
      style={{minHeight: '472px'}}
      onFinish={(values): void => {
        const documentsList = documents.permissions.map((item) => {
          const i = item;
          if (allSelected && filterValue.length === 0) {
            i.hasAccess = allSelected;
          } else {
            if(filterValue.length === 0) {
              i.hasAccess = false;
            } else {
              const allFiletedKeys = filtered.map(value => value.children.map(item => item.id)).flat();
              allFiletedKeys.forEach((key) => {
                if (key === item.id) {
                  i.hasAccess = false;
                }
              });
            }
            alreadySelectedDocumentsRows.forEach((key) => {
              if (key === item.id) {
                i.hasAccess = true;
              }
            });
          }
          return i;
        });

        const updateList = documentsList.map((item: AerisLibraryDocuemntAccess, index: number) => {
          if(item.id === defaultList[index].id && item.hasAccess !== defaultList[index].hasAccess) {
            return item;
          }
        }).filter(item => item !== undefined)

        const docsAccessPayloadRequest = {
          cdfiId,
          selectAll: setSelectAll(documentsList),
          documentsList: updateList,
          ...values
        };

        onFinish(docsAccessPayloadRequest);
        form.resetFields();
      }}
      form={form}
    >
      <Row gutter={GRID_GUTTER * 2}>
        <Col span={GRID_COL_HALF_ROW_SPAN}>
          <Form.Item
            name="viewers"
            label={
              <FormLabelWithIcon
                icon={QuestionCircleOutlined}
                description={viewerAccessDesc}
                text={viewer}
                className={styles.label}
              />
            }
          >
            <Select labelInValue onChange={handleViewerSelection}>
              {viewers.map((view) => (
                <Select.Option key={view.companyId} value={view.companyId}>
                  {view.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Space className={styles.tableSearchBar}>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.persist();
                setFilterValue(e.target.value.toLowerCase());
              }}
              placeholder={`Search...`}
              allowClear
              suffix={<SearchOutlined />}
            />
          </Space>
        </Col>
      </Row>
      {documentsWithParentFolderData.length > 0 && filtered.length > 0 ? (
        <Table
          className={stylesGlobalLibrary.aerisLibraryDocumentAccess}
          dataSource={filtered}
          columns={columns}
          pagination={false}
          size="small"
          scroll={{ y: '40vh' }}
          rowClassName={rowClassName}
          defaultExpandAllRows
          rowSelection={{
            type: 'checkbox',
            checkStrictly: false,
            selections: true,
            selectedRowKeys: alreadySelectedDocumentsRows,
            onChange: (keys): void => {
              setAlreadySelectedDocumentsRows(keys);
            },
            onSelectAll: (val): void => {
              setAllSelected(val);
            },
          }}
          expandable={{
            indentSize: 0,
            expandIcon: getExpandableIconDocumentsAccess,
          }}
        />
      ) : null}
    </Form>
  );
};
