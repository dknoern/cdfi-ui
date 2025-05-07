import React, {
  FC,
  useMemo,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { observer } from 'mobx-react';
import { Typography, Row, Col, Select, Button, Form } from 'antd';
import { typography } from 'constants/typography';
import { GRID_GUTTER } from 'constants/ui';
import { useLibraryFolders, useGlobalLibraries } from 'dataManagement';
import { LibraryTable } from 'components/LibraryTable';
import { FormStep } from 'forms/PCCreate/types';
import { stepContext } from 'forms/PCCreate/context';
import { formStore, ObjectValue } from 'forms/PCCreate/formStore';
import { stepIndexByKey } from 'forms/PCCreate/tools';
import { CreateFolderModal } from 'forms/PCCreate/components';
import { formName } from 'forms/PCCreate/constants';
import { generateFormId } from 'tools/formTools';
import { columnsNames, FORM_ID, initialFolders } from './constants';
import { folders2TableFolderRows } from './tools/tools';
import styles from './CompanyLibrarySetup.module.scss';

const { Title, Paragraph } = Typography;

const { librarySetupTitle, librarySetupHint } = typography(
  'portfolioCompanyCreation',
);
const step = FormStep.librarySetup;
const NotificationsStep = FormStep.notificationsSetup;

const { setData } = formStore;

export const CompanyLibrarySetupFn: FC = () => {
  const {
    data: globalLibraries,
    isLoading: isGlobalLibrariesLoading,
  } = useGlobalLibraries();

  const { data } = formStore;
  const { librarySetup, notificationsSetup } = data;
  const { templateId, createFolders } = (librarySetup as any) || {};

  const { data: library, isLoading: isFoldersLoading } = useLibraryFolders(
    templateId,
  );

  const [showCreateFolder, setShowCreateFolder] = useState(false);

  const { state, dispatch: stepDispatch } = useContext(stepContext);

  const libraryFolders = useMemo(() => {
    if (!templateId || isFoldersLoading || isGlobalLibrariesLoading)
      return folders2TableFolderRows([
        ...initialFolders,
        ...(createFolders ?? []),
      ]);

    return folders2TableFolderRows([
      ...(library?.folders ?? []),
      ...(createFolders ?? []),
    ]);
  }, [
    library,
    templateId,
    isFoldersLoading,
    createFolders,
    isGlobalLibrariesLoading,
  ]);

  const libraries = useMemo(() => {
    if (isGlobalLibrariesLoading) return [];
    return (globalLibraries ?? []).map((lib) => ({
      label: lib.name,
      value: lib.id,
    }));
  }, [isGlobalLibrariesLoading, globalLibraries]);

  const handleSelectLibrary = useCallback(
    (value: number) => {
      setData(step, {
        createFolders: [],
        templateId: value,
      });

      formStore.setData(NotificationsStep, {
        ...((notificationsSetup as ObjectValue) || {}),
        forMe: {},
      });
    },
    [notificationsSetup],
  );

  useEffect(() => {
    if (globalLibraries && !isGlobalLibrariesLoading && !templateId) {
      handleSelectLibrary(globalLibraries[0]?.id);
    }
  }, [
    globalLibraries,
    handleSelectLibrary,
    isGlobalLibrariesLoading,
    templateId,
  ]);

  useEffect(() => {
    stepDispatch({
      type: 'available',
      step: stepIndexByKey(FormStep.librarySetup),
    });
  }, [stepDispatch]);

  const handleNextClick = useCallback(() => {
    stepDispatch({ type: 'goToStep', step: state.step + 1 });
  }, [stepDispatch, state.step]);

  return (
    <>
      <Form
        id={generateFormId(formName, state.step)}
        onFinish={handleNextClick}
      >
        <Title level={4} className={styles.title}>
          {librarySetupTitle}
        </Title>
        <Paragraph type="secondary" className={styles.titleHint}>
          {librarySetupHint}
        </Paragraph>
        <Paragraph className={styles.tableControlsTitle}>
          Existing Library Structures
        </Paragraph>
        <Row justify="space-between" align="middle" gutter={[0, GRID_GUTTER]}>
          <Col xs={12} lg={8} xxl={6}>
            <div id="existingStructure_container">
              <Select
                placeholder="Select an existing structure"
                className={styles.select}
                dropdownClassName={styles.selectDropdown}
                value={templateId}
                onChange={handleSelectLibrary}
                loading={isGlobalLibrariesLoading}
                showSearch
                optionFilterProp="children"
              >
                {libraries.map((lib) => (
                  <Select.Option key={lib.value} value={lib.value}>
                    {lib.label}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </Col>
          <Col>
            <Button
              id="createFolderButton"
              type="default"
              className={styles.createNewBtn}
              onClick={(): void => {
                setShowCreateFolder(true);
              }}
            >
              + Create New Folder
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <LibraryTable
              id="libraryCreateTable"
              isLoading={isFoldersLoading}
              dataSource={libraryFolders}
              columnNamesList={columnsNames}
            />
          </Col>
        </Row>
        <CreateFolderModal
          formId={FORM_ID}
          onClose={(): void => {
            setShowCreateFolder(false);
          }}
          visible={showCreateFolder}
        />
      </Form>
    </>
  );
};

export const CompanyLibrarySetup = observer(CompanyLibrarySetupFn);
