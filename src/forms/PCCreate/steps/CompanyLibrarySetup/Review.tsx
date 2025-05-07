import React, { FC, useMemo } from 'react';
import { observer } from 'mobx-react';
import { useLibraryFolders } from 'dataManagement';
import { FormStep } from 'forms/PCCreate/types';
import { formStore } from 'forms/PCCreate/formStore';
import { LibraryTable } from 'components/LibraryTable';
import { columnsNames } from './constants';
import { folders2TableFolderRows } from './tools/tools';

type FormResult = {
  [name: string]: any;
};

const CURRENT_STEP = FormStep.librarySetup;

const Review: FC<{}> = () => {
  const { templateId, createFolders } =
    (formStore.data[CURRENT_STEP] as FormResult) || {};
  const { data: library, isLoading: isFoldersLoading } = useLibraryFolders(
    templateId,
  );

  const displayedFolders = useMemo(() => {
    return folders2TableFolderRows([
      ...(library?.folders ?? []),
      ...(createFolders ?? []),
    ]);
  }, [createFolders, library]);

  return (
    <LibraryTable
      id="libraryReviewTable"
      dataSource={displayedFolders}
      isLoading={isFoldersLoading}
      columnNamesList={columnsNames}
    />
  );
};

export default observer(Review);
