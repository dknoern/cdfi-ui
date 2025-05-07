/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import React, { ReactNode } from 'react';
import { Button } from 'antd';
import {
  PlusOutlined,
  UploadOutlined,
  EditFilled,
  WarningFilled,
  CheckCircleFilled,
  FileExcelOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FilePptOutlined,
  FileOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import {
  Company,
  Folder,
  MetricSharePeriod,
  Portfolio,
  VoidFn,
  Document,
  TransformedItem,
  AllNotes,
} from 'types';
import moment from 'moment';
import { FolderView } from 'types/libraryViews';
import { Nullable } from 'types/utility';
import { FolderTableItem, LibraryTableRow } from 'types/libraryTableItem';
import { metricSharePeriodNames } from 'constants/metricSharePeriod';
import styles from './Library.module.scss';

let parentTitle = '';
let documentTypeName = '';
export const dataParentList: any[] = [];
let counter = 100;
export const getDescription = (
  library: LibraryTableRow<FolderTableItem>,
): ReactNode => (
  <>
    {library.frequency && (
      <div className={styles.frequency}>
        <span>Reporting Frequency:</span>
        {metricSharePeriodNames[library.frequency as MetricSharePeriod]}
      </div>
    )}
    {library.description && (
      <div className={styles.description}>{library.description}</div>
    )}
  </>
);

export const uploadButton = (onClick: VoidFn): ReactNode => (
  <Button
    id="uploadBtn"
    type="default"
    className={styles.actionButton}
    onClick={onClick}
    icon={<UploadOutlined className={styles.actionButtonIcon} />}
  >
    Upload File
  </Button>
);

export const createFolderButton = (onClick: VoidFn): ReactNode => (
  <Button
    id="createFolderBtn"
    type="default"
    className={styles.actionButton}
    onClick={onClick}
    icon={<PlusOutlined className={styles.actionButtonIcon} />}
  >
    Create New Folder
  </Button>
);

export const editFolderButton = (
  onClick: VoidFn,
  isDisabled: boolean,
): ReactNode => (
  <Button
    id="editFolderBtn"
    type="default"
    className={styles.actionButton}
    onClick={onClick}
    icon={<EditFilled className={styles.actionButtonIcon} />}
    disabled={isDisabled}
  >
    Edit Folder
  </Button>
);

export const createLibraryButton = (onClick: VoidFn): ReactNode => (
  <Button
    id="createLibraryBtn"
    type="default"
    className={styles.actionButton}
    onClick={onClick}
    icon={<PlusOutlined className={styles.actionButtonIcon} />}
  >
    Create New Library
  </Button>
);

export const makeLibraryUrlPath = ({
  portfolioId,
  companyId,
  folderId,
}: {
  portfolioId: Nullable<Portfolio['id']>;
  companyId: Nullable<Company['id']>;
  folderId?: Nullable<FolderView['id']>;
}): string => {
  return `/libraries${folderId ? `/folder/${folderId}` : ''}${
    portfolioId ? `/portfolio/${portfolioId}` : ''
  }/company/${companyId}`;
};

export const setIcon = (dueType: string): React.ReactElement | string => {
  switch (dueType) {
    case 'OK':
      return (
        <React.Fragment>
          <span className={styles.dueTypeOK}>
            <CheckCircleFilled /> Uploads Completed
          </span>
        </React.Fragment>
      );
    case 'NONE':
      return (
        <React.Fragment/>
      );
    case 'NOT_REQUIRED':
      return (
        <React.Fragment/>
      );
    case 'PAST_DUE':
      return (
        <React.Fragment>
          <span className={styles.dueTypePastDue}>
            <WarningFilled /> Upload Required
          </span>
        </React.Fragment>
      );
    case 'PAST_DUE_BLUE':
      return (
        <React.Fragment>
          <span className={styles.dueTypePastDueBlue}>
            <WarningFilled /> Upload Requested
          </span>
        </React.Fragment>
      );
    default:
      return dueType;
  }
};

export const setDocumentIcon = (
  doc: string | undefined,
): React.ReactFragment => {
  const regex = new RegExp('[^.]+$');
  const extension = doc?.match(regex);
  if (extension) {
    switch (extension[0]) {
      case 'pdf':
        return (
          <React.Fragment>
            <FilePdfOutlined className={styles.docExtensionIcon} />
          </React.Fragment>
        );
      case 'doc':
      case 'docx':
        return (
          <React.Fragment>
            <FileWordOutlined className={styles.docExtensionIcon} />
          </React.Fragment>
        );
      case 'xlsx':
      case 'xls':
        return (
          <React.Fragment>
            <FileExcelOutlined className={styles.docExtensionIcon} />
          </React.Fragment>
        );
      case 'ppt':
      case 'pptx':
        return (
          <React.Fragment>
            <FilePptOutlined className={styles.docExtensionIcon} />
          </React.Fragment>
        );
      case 'png':
      case 'eps':
        return (
          <React.Fragment>
            <FileOutlined className={styles.docExtensionIcon} />
          </React.Fragment>
        );
      case 'img':
        return (
          <React.Fragment>
            <FileImageOutlined className={styles.docExtensionIcon} />
          </React.Fragment>
        );
      default:
        return <React.Fragment></React.Fragment>;
    }
  }
  return <React.Fragment>{doc}</React.Fragment>;
};

const docDetail = (item: any, depth: number): Document => {
  return {
    fiscalQuarter: item.fiscalQuarter ?? 0,
    fiscalYear: item.fiscalYear ?? 0,
    name: item.name,
    submittedDate: item.submittedDate,
    id: item.id ? item.id : item.notes ? item.notes[0].id : counter++,
    key: item.key ? item.key : counter++,
    icon: setDocumentIcon(item.name),
    displayName: item.displayName
      ? item.displayName
      : item.notes
      ? `Note: ${item.notes[item.notes.length - 1].text}`
      : item.fiscalYear && item.fiscalQuarter
      ? `${item.fiscalYear} Q${item.fiscalQuarter} ${item.name}`
      : item.name,
    description: item.description ? item.description : item.name,
    dueType: item.dueType ? item.dueType : '',
    dateCreated: item.dateCreated
      ? item.dateCreated
      : item.notes
      ? moment(item.notes[item.notes.length - 1].dateStamp).format('MM/DD/YYYY')
      : '',
    topLevel: depth,
    isInitialsRequired: item.isInitialsRequired
      ? item.isInitialsRequired
      : false,
    isNoteRequired: item.isNoteRequired ? item.isNoteRequired : false,
    reviewId: item.reviewId,
    needToShowInitials: item.needToShowInitials
      ? item.needToShowInitials
      : false,
    initialsRecord: item.initialsRecord ? item.initialsRecord : null,
    allNotes: item.allNotes ? item.allNotes : undefined,
    approvedBy: item.approvedBy ? item.approvedBy : '',
    parentId: depth === 0 ? 'Top Level' : parentTitle,
    documentTypeName: depth > 0 ? documentTypeName : undefined,
    dataset: depth > 0 ? (documentTypeName.toLowerCase().includes('supplemental') ? 'supplemental' : 'financials') : undefined,
    text: item.text ? item.text : undefined,
    dateStamp: item.dateStamp ? item.dateStamp : undefined,
    isNote: item.notes ? true : false,
    filterValue: item.filterValue ? item.filterValue : item.notes ? 6 : '',
  };
};

const getlatestYear = (item: LibraryDocument[]): number => {
  return Math.max(...item.map((a: LibraryDocument) => a.fiscalYear));
};
const getlatestQuarterOfYear = (
  item: LibraryDocument[],
  latestYear: number,
): number => {
  return Math.max(
    ...item.map((item: LibraryDocument) =>
      item.fiscalYear === latestYear ? item.fiscalQuarter : 0,
    ),
  );
};

const getNewResult = (
  result: LibraryDocument[],
  latestYear: number,
  latestQuarter: number,
  index: number,
): LibraryDocument[] => {
  return result.map((child: LibraryDocument) => {
    if (
      child.fiscalYear === latestYear &&
      child.fiscalQuarter === latestQuarter
    ) {
      return { ...child, filterValue: index };
    }
    return child;
  });
};

const removeLatestQuarter = (
  newResult: LibraryDocumentWithProp[],
): LibraryDocumentWithProp[] => {
  return newResult.filter(
    (child: LibraryDocumentWithProp) => !child.filterValue,
  );
};

interface LibraryDocument {
  dateCreated: string;
  fiscalQuarter: number;
  fiscalYear: number;
  id: number;
  name: string;
  submittedDate: string;
}
interface LibraryDocumentWithProp {
  dateCreated: string;
  fiscalQuarter: number;
  fiscalYear: number;
  id: number;
  name: string;
  submittedDate: string;
  filterValue?: string;
}

const getfirstQuarterResults = (
  result: LibraryDocument[],
  index: number,
  fullResult?: LibraryDocument[],
): LibraryDocument[] => {
  const latestYear = getlatestYear(result);
  const latestQuarter = getlatestQuarterOfYear(result, getlatestYear(result));
  if (fullResult) {
    return getNewResult(fullResult, latestYear, latestQuarter, index);
  }
  return getNewResult(result, latestYear, latestQuarter, index);
};

const setTheFilterProperties = (
  result: LibraryDocument[],
  depth: number,
): LibraryDocumentWithProp[] => {
  const firstQuarterResult = getfirstQuarterResults(result, 1);
  const removeHighestQuarter = removeLatestQuarter(firstQuarterResult);
  const secondQuarterResult = getfirstQuarterResults(
    removeHighestQuarter,
    2,
    firstQuarterResult,
  );
  const removeHighest2ndQuarter = removeLatestQuarter(secondQuarterResult);
  const thirdQuarterResult = getfirstQuarterResults(
    removeHighest2ndQuarter,
    3,
    secondQuarterResult,
  );
  const removeHighest3rdQuarter = removeLatestQuarter(thirdQuarterResult);
  const fourthQuarterResult = getfirstQuarterResults(
    removeHighest3rdQuarter,
    4,
    thirdQuarterResult,
  );
  const removeHighest4thQuarter = removeLatestQuarter(fourthQuarterResult);
  const fifthQuarterResult = getfirstQuarterResults(
    removeHighest4thQuarter,
    5,
    fourthQuarterResult,
  );
  return fifthQuarterResult;
};

export const transformItem = (item: any, depth: number): any => {
  const getDocumentsAndNotes = (documentType: any) => {
    let result: any[] = [];
    if (documentType?.documents?.length > 0) {
      result = result.concat(
        setTheFilterProperties(documentType?.documents, 0),
      );
    }
    if (documentType?.allNotes?.length > 0) {
      result = result.concat(documentType?.allNotes);
    }
    return result;
  };

  const source =
    item?.subFolders?.length > 0 && item?.documentTypes?.length === 0
      ? item.subFolders
      : item?.subFolders?.length > 0 && item?.documentTypes?.length > 0
      ? [...item.documentTypes, ...item.subFolders]
      : item?.subFolders?.length === 0 && item?.documentTypes?.length > 0
      ? item.documentTypes
      : item?.documents?.length > 0 || item?.allNotes?.length > 0
        ? getDocumentsAndNotes(item)
        : null;

  return {
    ...docDetail(item, depth),
    children: transformChildren(source, depth + 1),
  };
};

export const transformChildren = (
  libList: Folder[],
  depth = 0,
  reset?: boolean,
): TransformedItem[] => {
  if (reset) {
    dataParentList.length = 0;
  }
  const result =
    libList?.map((item: Folder) => {
      const parentDepth = 0;
      const subParentDepth = 1;
      if (depth === parentDepth) {
        parentTitle = item.displayName;
        dataParentList.push({
          fileName: item.displayName,
          id: item.id,
          children: [],
          key: item.id * 10,
        });
      }
      if (depth === subParentDepth) {
        documentTypeName = item.name;
      }

      return transformItem(item, depth);
    }) || [];
  return result;
};

export const firstQDate = 'Q1';
export const firstQ2Date = 'Q2';
export const firstQ5Date = 'Q5';

export const removeDocs = (item: any, Q: string | string[], depth: number): any => {
  if (item.children?.length > 0 && item.children[0].dateCreated) {
    if (Q === firstQDate) {
      return {
        ...item,
        children: item.children.filter(
          (child: TransformedItem) =>
            child.filterValue === 1 || child.filterValue === 6,
        ),
      };
    }
    if (Q === firstQ2Date) {
      return {
        ...item,
        children: item.children.filter(
          (child: any) =>
            child.filterValue === 1 ||
            child.filterValue === 2 ||
            child.filterValue === 6,
        ),
      };
    }
    if (Q === firstQ5Date) {
      return {
        ...item,
        children: item.children.filter(
          (child: any) =>
            child.filterValue === 1 ||
            child.filterValue === 2 ||
            child.filterValue === 3 ||
            child.filterValue === 4 ||
            child.filterValue === 5 ||
            child.filterValue === 6,
        ),
      };
    }
    if (Q.length > 1) {
      const start = Q[0].split(/[ -]+/);
      const end = Q[1].split(/[ -]+/);
      return {
        ...item,
        children: item.children.filter(
          (child: any) =>
            child.fiscalYear >= start[0] &&
            child.fiscalQuarter >= Number(start[1].substring(1)) &&
            child.fiscalYear <= end[0] &&
            child.fiscalQuarter <= Number(end[1].substring(1)),
        ),
      };
    }
  }
  return {
    ...item,
    children: filterData(Q, item.children, depth + 1),
  };
};

export const filterData = (
  Q: string | string[],
  data: TransformedItem[],
  depth = 0,
): TransformedItem[] => {
  if (!Q) {
    return data;
  }
  return (
    data.map((item) => {
      return removeDocs(item, Q, depth);
    }) || []
  );
};

export const removeSearchDocs = (
  itemsFoundKeys: number[],
  item: any,
  uniqueParents: number[],
  depth: number,
): any => {
  // If item keys is part of the items founded list,
  // return all child docs
  if (itemsFoundKeys.indexOf(item.key) > -1) {
    return {
      ...item,
      children: item.children,
    };
  }
  // If parent has documents as children,
  // filter the documents by the founded keys
  if (item.children?.length > 0 && item.children[0].dateCreated) {
    return {
      ...item,
      children: item.children.filter((child: any) => {
        return itemsFoundKeys.indexOf(child.key) > -1;
      }),
    };
  }
  return {
    ...item,
    children: filterDataSearch(
      itemsFoundKeys,
      item.children,
      uniqueParents,
      depth + 1,
    ),
  };
};

export const filterDataSearch = (
  itemsFoundKeys: number[],
  data: TransformedItem[],
  uniqueParents: number[],
  depth = 0,
): TransformedItem[] => {
  const mergeResult = [...itemsFoundKeys, ...uniqueParents];
  const result: TransformedItem[] = [];
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    if (mergeResult.indexOf(node.key) > -1) {
      result.push(removeSearchDocs(itemsFoundKeys, node, uniqueParents, depth));
    }
  }
  return result;
};

export interface Rows {
  displayName: string;
  description: string | undefined;
  fiscalQuarter: number | undefined;
  fiscalYear: number | undefined;
  id: number;
  key: number;
  isInitialsRequired: boolean | undefined;
  isNoteRequired: boolean | undefined;
  reviewId: number;
  needToShowInitials: boolean | undefined;
  initialsRecord: InitialsRecord | undefined;
  text: string | undefined;
  dateStamp: string | undefined;
  isNote: boolean | undefined;
  allNotes: AllNotes[] | undefined;
  dateCreated: string;
  dataset: string | undefined;
}

export interface InitialsRecord {
  companyId: number;
  dateStamp: string;
  documentTypeId: number;
  id: number;
  initials: string;
  reviewId: number;
}

export const dataList: Rows[] = [];

export const setFlatListOfKeyRows = (
  data: TransformedItem[],
  reset?: boolean,
): any => {
  if (reset) {
    dataList.length = 0;
  }
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    dataList.push({
      displayName: data[i].displayName,
      description: data[i].description,
      fiscalQuarter: data[i].fiscalQuarter,
      fiscalYear: data[i].fiscalYear,
      id: data[i].id,
      isInitialsRequired: data[i].isInitialsRequired,
      isNoteRequired: data[i].isNoteRequired,
      reviewId: data[i].reviewId,
      needToShowInitials: data[i].needToShowInitials,
      initialsRecord: data[i].initialsRecord,
      key: data[i].key,
      text: data[i].text,
      dateStamp: data[i].dateStamp,
      isNote: data[i].isNote,
      allNotes: data[i].allNotes,
      dateCreated: data[i].dateCreated,
      dataset: data[i].dataset,
    });
    if (node.children) {
      setFlatListOfKeyRows(node.children);
    }
  }
};
