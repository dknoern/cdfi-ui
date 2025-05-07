import React, { FC, useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { Store } from 'antd/lib/form/interface';
import { Col, Form, Input, Row, Select } from 'antd';
import {
  Company,
  DocumentTableItem,
  FolderTableItem,
  LibraryTableRow,
  SelectOptions,
} from 'types';
import { FormSubmitFn } from 'types/form';
import { GlobalLibrary } from 'types/libraryViews';
import {
  FORM_ITEM_VERTICAL_LABEL_SPAN,
  GRID_COL_FULL_ROW_SPAN,
  GRID_COL_HALF_ROW_SPAN,
  GRID_GUTTER,
} from 'constants/ui';
import { FormPrimaryLabel } from 'components';
import {
  maxLength,
  minLength,
  required,
  restrictWhitespace,
} from 'tools/formRules';
import { FoldersTable } from './components';

const ENABLE_COMPANY_PICK = false;

type CreateLibraryFormProps = {
  formId: string;
  initialValues: Store;
  onFinish: FormSubmitFn;
  companies?: SelectOptions<Company['id']>;
  selectedLibraryFolders?: LibraryTableRow<
    FolderTableItem & DocumentTableItem
  >[];
  handleSelectLibrary?: (selectedLibraryId: GlobalLibrary['id']) => void;
  librariesList?: { name: GlobalLibrary['name']; id: GlobalLibrary['id'] }[];
};

const CreateLibraryFormFn: FC<CreateLibraryFormProps> = ({
  formId,
  initialValues,
  onFinish,
  companies,
  selectedLibraryFolders,
  handleSelectLibrary = (): void => {},
  librariesList,
}) => {
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState('');
  const isEdit = !!initialValues.id;

  const handleFinish = useCallback<ReturnType<FormSubmitFn>>(
    (values) => {
      if (onFinish) onFinish(form)(values);
    },
    [form, onFinish],
  );

  const displayedCompanies = useMemo(() => {
    if (!isEdit) return undefined;
    if (!searchValue || !companies) return companies;

    return companies.filter((company) =>
      company.label.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [companies, searchValue, isEdit]);

  return (
    <Form
      id={formId}
      form={form}
      initialValues={initialValues}
      onFinish={handleFinish}
      hideRequiredMark
      size="large"
      labelCol={{ span: FORM_ITEM_VERTICAL_LABEL_SPAN }}
    >
      <Row gutter={[GRID_GUTTER, 0]}>
        <Col
          lg={isEdit ? GRID_COL_FULL_ROW_SPAN : GRID_COL_HALF_ROW_SPAN}
          span={GRID_COL_FULL_ROW_SPAN}
        >
          <Form.Item
            name="name"
            label={
              <FormPrimaryLabel
                num={!isEdit ? 1 : undefined}
                text="Library Name"
              />
            }
            rules={[required(), minLength(), maxLength(), restrictWhitespace()]}
          >
            <Input placeholder="Enter Library name" />
          </Form.Item>
        </Col>
        {!isEdit && ENABLE_COMPANY_PICK && (
          <Col lg={GRID_COL_HALF_ROW_SPAN} span={GRID_COL_FULL_ROW_SPAN}>
            <Form.Item
              name="companies"
              label={
                <FormPrimaryLabel num={2} text="Attached Reporting Entities" />
              }
            >
              <Select
                mode="multiple"
                placeholder="Select Reporting Entities"
                showSearch
                showArrow
                onSearch={setSearchValue}
                optionFilterProp="children"
                onBlur={(): void => setSearchValue('')}
                options={displayedCompanies ?? []}
              />
            </Form.Item>
          </Col>
        )}
      </Row>
      {!isEdit && (
        <FoldersTable
          libraries={librariesList ?? []}
          handleLibrarySelect={handleSelectLibrary}
          selectedLibraryFolders={selectedLibraryFolders ?? []}
        />
      )}
    </Form>
  );
};

export const CreateLibraryForm = observer(CreateLibraryFormFn);
