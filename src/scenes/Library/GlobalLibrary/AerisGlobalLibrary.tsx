/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
import React, { FC, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  PageSectionWrapper,
  withProcessModal,
  WithProcessModalProps,
} from 'components';
import { ColumnProps } from 'antd/es/table';
import {
  useAerisLibraryData,
  useAerisLibraryViewers,
} from 'dataManagement/useGlobalLibraries';
import {
  Table,
  Input,
  Button,
  Select,
  Popover,
  Form,
  Radio,
  DatePicker,
  Divider,
  Typography,
  Spin,
  Tooltip,
  message
} from 'antd';
import { Moment } from 'moment';
import { AerisLibraryManagerResults } from 'dataManagement/managers/AerisLibraryManager';
import { useHistory, useLocation } from 'react-router-dom';
import { getExpandableIconLibrary } from 'components/LibraryTable/tools';
import {
  FileProtectOutlined,
  UploadOutlined,
  DownloadOutlined,
  FilterFilled,
} from '@ant-design/icons';
import { TableRowSelection } from 'antd/lib/table/interface';
import ScrollIntoView from 'react-scroll-into-view';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import { dataMan } from 'dataManagement/managers';
import {
  UserRole,
  TransformedItem,
  FilteredDoc,
  FileUploadFinishHandler,
} from 'types';
import { useCdfiLogo } from 'tools/useCdfiLogo';
import { LogoHeader } from 'scenes/Dashboard/scenes/CdfiDashboard/LogoHeader';
import { useCdfiOrgDetails } from 'dataManagement/useCdfis';
import { RangeValue } from 'rc-picker/lib/interface';

import {
  transformChildren,
  setFlatListOfKeyRows,
  filterData,
  filterDataSearch,
  firstQDate,
  firstQ2Date,
  firstQ5Date,
  dataList,
} from '../tools';
import {
  libraryAdminCdfiColumns,
  libraryCdfiColumns,
  libraryColumns, libraryContractorCdfiColumns,
} from './columns';
import { cdfiStore, uiStore, userStore } from '../../../store';
import {
  downloadLibDocument,
  setDocApproval,
} from '../../../dataManagement/operations/libraryOperations';
import styles from './GlobalLibrary.module.scss';
import { DocumentUploadModal } from '../AerisLibrary/DocumentUploadModal';
import { DocumentUploadModalDocumentType } from '../AerisLibrary/DocumentUploadModalDocumentType';
import { LibraryActionPerformer } from '../../../forms/shared/Contacts/types';
import { AerisDeleteLibraryItems } from '../AerisLibrary/AerisDeleteLibraryItems';
import { DocumentPermissionsModal } from '../AerisLibrary/DocumentPermissionsModal';
import { AffirmAsCurrentModal } from '../AerisLibrary/AffirmAsCurrentModal';
import { AddNoteModal } from '../AerisLibrary/AddNoteModal';
import { ViewModifyNoteModal } from '../AerisLibrary/ViewModifyNoteModal';

const { Option } = Select;
const { Search } = Input;
const { Paragraph } = Typography;
const { RangePicker } = DatePicker;

const AerisGlobalLibraryFn: FC<WithProcessModalProps> = observer(({
  setUploadFlowState,
  showUploadModal,
  setTexts,
}) => {
  const { Link: TypographyLink } = Typography;
  const {
    cdfiId,
    setIsLoadingDownloadFiles,
    isLoadingDownloadFiles,
    isErrorMessageDownloadFiles,
    setIsErrorMessageDownloadFiles
  } = cdfiStore;
  const { data: cdfiOrgDetails } = useCdfiOrgDetails(cdfiId);
  const cdfi = cdfiOrgDetails ? cdfiOrgDetails.cdfi : undefined;
  const aerisAdminID = 3; // Save/Get this from store once we are able to support all user types
  const userId = UserRole.AERIS_ADMIN && !cdfiId ? aerisAdminID : cdfiId;
  const history = useHistory();

  // Fetch lib Data
  const { data: library } = useAerisLibraryData(cdfiId || userId);
  const [theData, setTheData] = useState<TransformedItem[]>([]);
  // Fetch Document Viewers
  const { data: viewers } = useAerisLibraryViewers(cdfiId || userId);
  // Toggle showPermissionsModal
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  // Row selection state
  const [selectedRowsUser, setSelectedRowsUser] = useState<FilteredDoc[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>();
  const [checkStrictly] = useState(false);
  const [isDownload, setIsDownload] = useState(false);

  // String selection state
  const headerMessage = library?.documents.headerMessage;
  const title = cdfiId ? 'Library' : 'Tools and Resources';
  const location = useLocation();

  // Filter
  const [theDataForFiltering, setTheDataForFiltering] = useState<
    TransformedItem[]
  >([]);
  const [filter, setFilter] = useState(firstQDate);

  // Upload documents button
  const showUploadButton = cdfiId ? true : false;
  const [showUploadDocTypeModal, setShowUploadDocTypeModal] =
    useState<boolean>(false);

  // AntD components
  const [hidePopOverMenu, setHidePopOverMenu] = useState(false);
  const [form] = Form.useForm();
  const [expandedRowKeys, setExpandedRowKeys] = useState<any>([]);

  // Folder ID
  const [uploadingFolderId, setUploadingFolderId] = useState<any>();
  const aerisLibrary = dataMan.managers.aerisLibraryDocs;
  const [showDeleteModal, setshowDeleteModal] = useState(false);

  // Affirm as current
  const [showAffirmAsCurrentModal, setShowAffirmAsCurrentModal] =
    useState<any>(false);
  const [reviewId, setReviewId] = useState<any>();

  // Add a note
  const [showAddNoteModal, setShowAddNoteModal] = useState<any>(false);
  const [showViewModifyNoteModal, setShowViewModifyNoteModal] =
    useState<any>(false);

  const transformArray = (
    library: AerisLibraryManagerResults,
  ): TransformedItem[] => {
    const newArr = transformChildren(library?.documents?.library, 0, true);
    return newArr;
  };
  const map = (id: number): void => {
    const record = dataList.filter((row) => {
      return row.key === id;
    })[0];
    history.push(
      `/manage/cdfi/${userId}/mapper/${record.fiscalYear}/${record.fiscalQuarter}/${record.dataset}`,
    );
  };

const interimFiscalQuarter = transformArray(library)[0]?.children[0]?.children[0]?.fiscalQuarter;
const interimFiscalYear = transformArray(library)[0]?.children[0]?.children[0]?.fiscalYear;

  const getReviewId = (documentTypeId: number): number => {
    const record = dataList.filter((row) => {
      return row.id === documentTypeId && row.reviewId != 0 && row.isInitialsRequired;
    })[0];
    return record.reviewId;
  };

  const getReviewIdAddNote = (documentTypeId: number): number => {
    const record = dataList.filter((row) => {
      return row.id === documentTypeId && row.reviewId != 0 && row.isNoteRequired;
    })[0];
    return record.reviewId;
  };

  const getNotesRecord = (allNotesId: number): any | undefined => {
    const record = dataList.filter((row) => {
      if (row.allNotes) {
        for (let i = 0; i < row.allNotes.length; ++i) {
          if (row.allNotes[i].notes) {
            for (let j = 0; j < row.allNotes[i].notes.length; ++j) {
              if (row.allNotes[i].notes[j].id === allNotesId) {
                return row.allNotes[i].notes[j];
              }
            }
          }
        }
      }
    })[0];

    let noteReviewId = 0;

    if (record && record.allNotes) {
      for (let i = 0; i < record.allNotes.length; ++i) {
        if (record.allNotes[i].notes) {
          for (let j = 0; j < record.allNotes[i].notes.length; ++j) {
            if (record.allNotes[i].notes[j].id === allNotesId) {
              noteReviewId = record.allNotes[i].notes[j].reviewId;
              break;
            }
          }
          if (noteReviewId != 0) break;
        }
      }
    }
    return [record, noteReviewId];
  };

  const getNotesForModal = (record: any, reviewId: number): any | undefined => {
    let result;
    if (record && record.allNotes) {
      for (let i = 0; i < record.allNotes.length; ++i) {
        if (record.allNotes[i].notes) {
          for (let j = 0; j < record.allNotes[i].notes.length; ++j) {
            if (record.allNotes[i].notes[j].reviewId === reviewId) {
              result = record.allNotes[i].notes;
              break;
            }
          }
        }
      }
    }
    return result;
  };

  const [notesForModal, setNotesForModal] = useState<any>(false);

  const makeActionHandlers =
    ({
      setUploadingFolderId,
      setReviewId,
    }: {
      setUploadingFolderId: (folderKey: number) => void;
      setReviewId: (reviewKey: number) => void;
    }): LibraryActionPerformer =>
    (
      operationName,
      id,
      reviewId,
      currentValue,
    ): ReturnType<LibraryActionPerformer> => {
      switch (operationName) {
        case 'upload':
          setUploadingFolderId(id);
          setUploadFlowState('showModal');
          break;
        case 'delete':
          setUploadingFolderId(id);
          setshowDeleteModal(true);
          break;
        case 'map':
          map(id);
          break;
        case 'affirmAsCurrent':
          setUploadingFolderId(id);
          const foundIdAffirm = getReviewId(id);
          setReviewId(foundIdAffirm);
          setShowAffirmAsCurrentModal(true);
          break;
        case 'addNote':
          setUploadingFolderId(id);
          const foundIdAddNote = getReviewIdAddNote(id);
          setReviewId(foundIdAddNote);
          setShowAddNoteModal(true);
          break;
        case 'viewNote':
          const recordAndReviewId = getNotesRecord(id);
          setUploadingFolderId(
            recordAndReviewId[0] ? recordAndReviewId[0].id : 0,
          );
          setReviewId(recordAndReviewId[1] ? recordAndReviewId[1] : 0);
          setNotesForModal(
            getNotesForModal(recordAndReviewId[0], recordAndReviewId[1]),
          );
          setShowViewModifyNoteModal(true);

          break;
        case 'approveDoc':
          const approved = { setApproved: true };
          setDocApproval(id, approved).then((res) =>
            aerisLibrary.reload(userId),
          );
          break;
        case 'disapproveDoc':
          const disapproved = { setApproved: false };
          setDocApproval(id, disapproved).then((res) =>
            aerisLibrary.reload(userId),
          );
          break;
        default:
          break;
      }
    };

  useEffect(() => {
    if (library) {
      const transformedData = transformArray(library);
      setTheData(transformedData);
      setTheDataForFiltering(transformedData);
      setFlatListOfKeyRows(transformedData, true);
      setExpandedRowKeys(dataList.map((x) => x.key));
      uiStore.endLoading('libraryComponent');
      setIsErrorMessageDownloadFiles(false);
    }
  }, [library]);

  useEffect(() => {
    uiStore.addLoading('libraryComponent');
    setTheData([]);
  }, [location]);

  let columns: ColumnProps<TransformedItem>[];
  if (cdfiId) {
    if (userStore.isAerisAdmin) {
      columns = libraryAdminCdfiColumns((operationName, id) => {
        actionHandler(operationName, id);
      });
    } else if (userStore.isContractor) {
      columns = libraryContractorCdfiColumns((operationName, id) => {
        actionHandler(operationName, id);
      });
    } else {
      columns = libraryCdfiColumns((operationName, id) => {
        actionHandler(operationName, id);
      });
    }
  } else {
    columns = libraryColumns((operationName, id) => {
      actionHandler(operationName, id);
    });
  }

  const actionHandler = useCallback<any>(
    makeActionHandlers({ setUploadingFolderId, setReviewId }),
    [],
  );
  const onUploadToLibraryFinish: FileUploadFinishHandler = (
    type,
    documentId,
    message,
  ) => {
    setUploadFlowState('hideModal');
    setUploadFlowState({
      uploadFinished: true,
      modalType: type,
      errorDocumentId: documentId,
    });
    setShowUploadDocTypeModal(false);
    setTexts({ description: message });
    aerisLibrary.reload(userId);
  };
  const parentList: number[] = [];
  const getParentKey = (key: React.Key, tree: TransformedItem[]): any => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i];
      if (node.children.length > 0) {
        if (node.children.some((item) => item.key === key)) {
          parentKey = node.key;
        } else if (getParentKey(key, node.children)) {
          parentKey = getParentKey(key, node.children);
        }
      }
    }
    if (parentKey) {
      if (parentList.indexOf(parentKey) === -1) {
        parentList.push(parentKey);
        getParentKey(parentKey, theDataForFiltering);
      }
    }
    return parentKey;
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    if (!value) {
      setTheData(theDataForFiltering);
    } else {
      const itemsFound = dataList
        .filter(
          (item) =>
            item.displayName.toLowerCase().indexOf(value.toLowerCase()) > -1,
        )
        .map((x) => x.key, theDataForFiltering);
      const searchForParents = (): number[] => {
        const result =
          itemsFound?.map((key: number): number => {
            return getParentKey(key, theDataForFiltering);
          }) || [];
        return result;
      };
      searchForParents();
      const getUniqueParents = parentList.filter(
        (element: number, index: number) => {
          return parentList.indexOf(element) === index;
        },
      );
      const result = filterDataSearch(
        itemsFound,
        theDataForFiltering,
        getUniqueParents,
      );
      setTheData(result);
    }
  };

  const onChangeRowSelection = (selectedRowKeys: React.Key[]): void => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const onSelectAllRowsCheckbox = (
    selected: boolean,
    selectedRows: FilteredDoc[],
  ): void => {
    setSelectedRowsUser(selectedRows);
  };

  const rowSelection: TableRowSelection<FilteredDoc> = {
    selectedRowKeys,
    onChange: onChangeRowSelection,
    onSelectAll: onSelectAllRowsCheckbox,
    onSelect: (record, selectedRow, selectedRows): void => {
      setSelectedRowsUser(selectedRows);
    },
  };
  const resetSelectedRows = (): void => {
    setSelectedRowKeys([]);
    setSelectedRowsUser([]);
  };

  const warningMessage = () => {
    message.warning({
      content: 'Too many files selected.  Please select fewer files and download again.',
      className: styles.warningMessage,
      duration: 4,
      style: {
        marginTop: '40vh',
      },
    });
  };

  const onClickDownload = (): void => {
    setIsLoadingDownloadFiles(true);
    const result = selectedRowsUser.map((item: FilteredDoc) => {
      if (item.dateCreated && !item.isNote) {
        return item.id;
      }
    }).filter(item => item !== undefined);
    if (result.join(',').length > 14000) {
      warningMessage();
      return;
    }
    const documentOrDocuments = result.length > 1 ? 'documents' : 'document';
    setIsDownload(true);
    downloadLibDocument(documentOrDocuments, result.toString(), cdfiId).then(() => {
      setTimeout(() => setIsDownload(false), 2000);
      resetSelectedRows();
    });
  };

  const onClick = (e: React.MouseEvent): void => {
    setHidePopOverMenu(!hidePopOverMenu);
  };

  const onClickReset = (): void => {
    form.setFieldsValue({ 'date-picker': '' });
    form.setFieldsValue({ 'quarter-selection': firstQDate });
    setFilter(firstQDate);
    setTheData(theDataForFiltering);
  };

  const onChangeRadio = (e: RadioChangeEvent): void => {
    setFilter(e.target.value);
  };

  const loop = (data: TransformedItem[]): any => {
    return data?.map((item): FilteredDoc => {
      const displayName = (
        <Tooltip title={item.description}>
          <span className={styles.displayName}>
            {item.icon}{ item.displayName}
          </span>
        </Tooltip>
      );
      if (item.children.length > 0) {
        return {
          displayName,
          key: item.key,
          name: item.name,
          id: item.id,
          dueType: item.dueType,
          dateCreated: item.dateCreated,
          topLevel: item.topLevel,
          fiscalYear: item.fiscalYear,
          fiscalQuarter: item.fiscalQuarter,
          children: loop(item.children),
          isInitialsRequired: item.isInitialsRequired,
          isNoteRequired: item.isNoteRequired,
          reviewId: item.reviewId,
          needToShowInitials: item.needToShowInitials,
          initialsRecord: item.initialsRecord,
          allNotes: item.allNotes,
          approvedBy: item.approvedBy,
          parentId: item.parentId,
          documentTypeName: item.documentTypeName,
          dataset: item.dataset,
          text: item.text,
          dateStamp: item.dateStamp,
          isNote: item.isNote,
          filterValue: item.filterValue,
        };
      }
      return {
        displayName,
        key: item.key,
        name: item.name,
        id: item.id,
        dueType: item.dueType,
        dateCreated: item.dateCreated,
        topLevel: item.topLevel,
        fiscalYear: item.fiscalYear,
        fiscalQuarter: item.fiscalQuarter,
        isInitialsRequired: item.isInitialsRequired,
        isNoteRequired: item.isNoteRequired,
        reviewId: item.reviewId,
        needToShowInitials: item.needToShowInitials,
        initialsRecord: item.initialsRecord,
        allNotes: item.allNotes,
        approvedBy: item.approvedBy,
        parentId: item.parentId,
        documentTypeName: item.documentTypeName,
        dataset: item.dataset,
        text: item.text,
        dateStamp: item.dateStamp,
        isNote: item.isNote,
        filterValue: item.filterValue,
      };
    });
  };

  const libraryParentDropDownList = () => {
    const dropDownList =
      theData?.map((item: TransformedItem) => {
        return (
          <Option key={item.displayName} value={item.key}>
            <ScrollIntoView
              key={item.key}
              selector={`.ant-table-row-level-0.aerisRow-${item.id}`}
            >
              <Paragraph>{item.displayName}</Paragraph>
            </ScrollIntoView>
          </Option>
        );
      }) || [];
    return dropDownList;
  };

  const rowClassName = (record: any): string => {
    return `aerisRow-${record.id} aerisRow`;
  };

  const onChangeDatePicker = (
    date: RangeValue<Moment> | null,
    dateRange: [string, string],
  ): void => {
    setFilter('');
    form.setFieldsValue({ 'quarter-selection': '' });
    setTheData(filterData(dateRange, theDataForFiltering));
  };

  const handleVisibleChange = (visible: boolean) => {
    setHidePopOverMenu(visible);
  };
  const handReloadAfterDelete = (): void => {
    setshowDeleteModal(false);
    aerisLibrary.reload(userId);
  };

  const content = (
    <div className={styles.filterTable}>
      <Form
        form={form}
        initialValues={{ 'quarter-selection': filter }}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
      >
        <Form.Item
          name="quarter-selection"
          label="Only quarters with data will be applied."
        >
          <Radio.Group onChange={onChangeRadio} className={styles.radioGroup}>
          <Radio value="">All</Radio>
            <Radio value={firstQDate}>Most Recent Quarter</Radio>
            <Radio value={firstQ2Date}>Most Recent 2 Quarters</Radio>
            <Radio value={firstQ5Date}>Most Recent 5 Quarters</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="date-picker"
          style={{ fontWeight: 'bold' }}
          label="Date Range"
        >
          <RangePicker
            allowClear
            picker="quarter"
            onChange={onChangeDatePicker}
          />
        </Form.Item>
        <Divider plain />
        <Form.Item>
          <Button
            type="primary"
            onClick={(): void => {
              setHidePopOverMenu(!hidePopOverMenu);
            }}
          >
            OK
          </Button>
          <Button onClick={onClickReset} htmlType="submit" type="link">
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  const logo = useCdfiLogo(cdfiId);
  const cdfiName = cdfi?.name;

  const onAccessPermissionFinish = (): void => {
    setShowPermissionsModal(false);
  };

  return (
    <>
      {isLoadingDownloadFiles ?
        <div className={`${styles.spin} ${styles.spinDownloading}`}><Spin spinning />
          <p className={styles.spinText}>File download in progress</p>
        </div> : null}
      {isErrorMessageDownloadFiles ?
        <div className={`${styles.spin} ${styles.spinErrorMessage}`} onClick={(e) => setIsErrorMessageDownloadFiles(false)}><Spin spinning />
          <p className={`${styles.spinText}  ${styles.spinErrorText}`}>The file you are trying to download was not found.  Please contact{' '}
            <TypographyLink href="mailto:support@aerisinsight.com">
              Aeris Support
            </TypographyLink>
            {' '}for assistance.
          </p>
        </div> : null}
      <PageSectionWrapper
        title={title}
        description={headerMessage}
        topTitle={cdfiId && <LogoHeader imgPath={logo} subTitle={cdfiName} />}
      >
        <div className={styles.controls}>
          <div>
            {((cdfiId && userStore.isAerisAdmin) ||
              (cdfiId && userStore.isCdfi)) && (
              <Button
                key="rejectTerms"
                icon={<FileProtectOutlined />}
                onClick={(): void => setShowPermissionsModal(true)}
              >
                Manage Viewer Access
              </Button>
            )}
            <Select placeholder="Go to" style={{ width: 220 }}>
              {libraryParentDropDownList()}
            </Select>
          </div>
          {showUploadButton && !userStore.isSubscriber && (
            <Button
              key="upload"
              icon={<UploadOutlined />}
              onClick={(): void => {
                setShowUploadDocTypeModal(true);
              }}
            >
              Upload Document
            </Button>
          )}
          <DocumentUploadModalDocumentType
            visible={showUploadDocTypeModal}
            onCancel={(): void => {
              setShowUploadDocTypeModal(false);
            }}
            onUploadFinish={onUploadToLibraryFinish}
          />
          <DocumentUploadModal
            visible={showUploadModal}
            onCancel={(): void => {
              setUploadFlowState('hideModal');
            }}
            documentTypeId={uploadingFolderId}
            onUploadFinish={onUploadToLibraryFinish}
            fiscalQuarter={uploadingFolderId == 46? interimFiscalQuarter : undefined}
            fiscalYear={uploadingFolderId == 46? interimFiscalYear: undefined}
          />
          <DocumentPermissionsModal
            visible={showPermissionsModal}
            onCancel={(): void => {
              setShowPermissionsModal(false);
            }}
            viewers={viewers?.viewers}
            onFinish={onAccessPermissionFinish}
          />
          <AerisDeleteLibraryItems
            onFinish={handReloadAfterDelete}
            visible={showDeleteModal}
            documentTypeId={uploadingFolderId}
            onClose={(): void => {
              setshowDeleteModal(false);
            }}
          />
          <AffirmAsCurrentModal
            visible={showAffirmAsCurrentModal}
            onClose={(): void => setShowAffirmAsCurrentModal(false)}
            onFinish={(): void => {
              setShowAffirmAsCurrentModal(false);
              aerisLibrary.reload(userId);
            }}
            documentTypeId={uploadingFolderId}
            reviewId={reviewId}
          />
          <AddNoteModal
            visible={showAddNoteModal}
            onClose={(): void => setShowAddNoteModal(false)}
            onFinish={(): void => {
              setShowAddNoteModal(false);
              aerisLibrary.reload(userId);
            }}
            documentTypeId={uploadingFolderId}
            reviewId={reviewId}
          />
          <ViewModifyNoteModal
            visible={showViewModifyNoteModal}
            onClose={(): void => {
              setNotesForModal(undefined);
              setShowViewModifyNoteModal(false);
            }}
            onFinish={(): void => {
              setNotesForModal(undefined);
              setShowViewModifyNoteModal(false);
              aerisLibrary.reload(userId);
            }}
            onDeleteFinish={(): void => {
              setNotesForModal(undefined);
              setShowViewModifyNoteModal(false);
              aerisLibrary.reload(userId);
            }}
            documentTypeId={uploadingFolderId}
            reviewId={reviewId}
            notes={notesForModal}
          />
          <Button
            key="download"
            type="primary"
            disabled={selectedRowsUser.length === 0}
            icon={<DownloadOutlined />}
            onClick={onClickDownload}
          >
            Download
          </Button>
          <Search
            onChange={onSearch}
            style={{ width: 220 }}
            placeholder="Search"
            allowClear
          />
          <Popover
            visible={hidePopOverMenu}
            onVisibleChange={handleVisibleChange}
            title="Most Recent Quarters"
            placement="leftTop"
            content={content}
            trigger="click"
          >
            <Button
              type="primary"
              key="filter"
              icon={<FilterFilled />}
              onClick={onClick}
            />
          </Popover>
        </div>
        <Table
          className={styles.aerisLibraryTable}
          rowClassName={rowClassName}
          defaultExpandAllRows
          dataSource={loop(filterData(filter, theData))}
          columns={columns}
          size="small"
          pagination={false}
          scroll={{ y: '50vh' }}
          rowSelection={{ ...rowSelection, checkStrictly }}
          expandedRowKeys={expandedRowKeys}
          expandable={{
            indentSize: 20,
            expandIcon: getExpandableIconLibrary,
            defaultExpandAllRows: true,
          }}
        />
      </PageSectionWrapper>
    </>
  );
});

export const AerisGlobalLibrary = withProcessModal(AerisGlobalLibraryFn);
