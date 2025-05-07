import { Col, Form, Row, Select, Typography } from 'antd';
import { FormPrimaryLabel } from 'components';
import { LibraryTable } from 'components/LibraryTable';
import { typography } from 'constants/typography';
import { GRID_GUTTER } from 'constants/ui';
import React, { FC } from 'react';
import { FolderTableItem, LibraryTableRow } from 'types/libraryTableItem';
import { GlobalLibrary } from 'types/libraryViews';
import styles from '../CreateLibrary.module.scss';
import { columnsName } from './constants';

const { Paragraph } = Typography;
const { Option } = Select;

const { librarySetupTitle, librarySetupHint } = typography(
  'portfolioCompanyCreation',
);

type FoldersTableProps = {
  libraries: { name: GlobalLibrary['name']; id: GlobalLibrary['id'] }[];
  handleLibrarySelect: (value: GlobalLibrary['id']) => void;
  selectedLibraryFolders: LibraryTableRow<FolderTableItem>[];
};

export const FoldersTable: FC<FoldersTableProps> = ({
  libraries,
  handleLibrarySelect,
  selectedLibraryFolders,
}) => {
  return (
    <>
      <Form.Item
        label={<FormPrimaryLabel num={2} text={librarySetupTitle} />}
        className={styles.label}
      >
        <Paragraph type="secondary" className={styles.titleHint}>
          {librarySetupHint}
        </Paragraph>

        <Row
          justify="space-between"
          align="bottom"
          gutter={[GRID_GUTTER, GRID_GUTTER]}
        >
          <Col>
            <Paragraph className={styles.secondaryLabel}>
              Existing Library Structures
            </Paragraph>
            <Select
              placeholder="Select an existing structure"
              size="middle"
              onChange={handleLibrarySelect}
              defaultValue={0}
              showSearch
              optionFilterProp="children"
            >
              <Option value={0}>None</Option>
              {libraries.map((library) => (
                <Option key={library.id} value={library.id}>
                  {library.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col>
            {/* <OutlineButton
              title="Create New Library"
              id="createLibrary"
              onClick={() => setShowCreateFolderModal(true)}
              icon={<PlusOutlined />}
              size="middle"
            /> */}
          </Col>
        </Row>
        <LibraryTable
          id="libraryTable"
          columnNamesList={columnsName}
          isLoading={false}
          dataSource={selectedLibraryFolders}
          rowKey="rowKey"
        />
      </Form.Item>
    </>
  );
};
