import React, {
  FC,
  ReactText,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { observer } from 'mobx-react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
  FolderTableItem,
  LibraryTableRow,
  LibraryTableRowLibItem,
} from 'types/libraryTableItem';
import { FolderView } from 'types/libraryViews';
import { PageSectionWrapper, LibraryTable } from 'components';
import {
  globalLibraryFoldersColumns,
  initialFolderTableItem,
} from './constants';
import {
  CreateFolder,
  EditFolder,
  EditLibrary,
  DeleteLibraryItems,
  EditLibraryBatch,
  DeleteLibrary,
} from './components';
import { getLibrary } from './tools/tools';
import { loadGlobalLibraries } from './tools/apiTools';
import { getTitle } from './tools/components';
import { globalLibraryStore } from './store';
import { createFolderButton, editFolderButton, getDescription } from '../tools';

const GlobalLibraryFoldersFn: FC = () => {
  const { params } = useRouteMatch<{ libraryId: string; folderId: string }>();
  const libraryId = Number(params.libraryId);
  const folderId = Number(params.folderId);

  const history = useHistory();

  const [selected, setSelected] = useState<React.Key[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<FolderView | null>(null);
  const [isLibrariesLoading, setIsLibrariesLoading] = useState(false);
  const [error, setError] = useState(false);

  const [showEditLibraryModal, setShowEditLibraryModal] = useState(false);
  const [showDeleteLibraryModal, setShowDeleteLibraryModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [showEditFolderModal, setShowEditFolderModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isRootFolder = !folderId;
  const { libraries } = globalLibraryStore;

  // Initialize store with library data
  // Skip if store already contains library data
  const loadLibraries = useCallback(() => {
    setIsLibrariesLoading(true);
    setError(false);
    loadGlobalLibraries(setError).finally(() => {
      setIsLibrariesLoading(false);
    });
  }, []);

  // Initialize store with library data
  // Skip if store already contains library data
  useEffect(() => {
    if (
      isLibrariesLoading ||
      error ||
      (!!globalLibraryStore.libraries && globalLibraryStore.dataLoaded)
    )
      return;

    loadLibraries();
  }, [loadLibraries, isLibrariesLoading, error]);

  // Convert folder data for table dataSource format
  const library = useMemo(() => {
    if (isLibrariesLoading || (!globalLibraryStore.dataLoaded && !libraries))
      return initialFolderTableItem;

    return getLibrary(libraryId, folderId);
  }, [isLibrariesLoading, folderId, libraryId, libraries]);

  // Make breadcrumbs for current folder
  const pageTitle = useMemo(() => {
    if (
      isLibrariesLoading ||
      (!globalLibraryStore.dataLoaded && !globalLibraryStore.libraries)
    )
      return '';

    const handleEdit = (): void => setShowEditLibraryModal(true);
    const handleDelete = (): void => setShowDeleteLibraryModal(true);
    return getTitle(
      isRootFolder,
      libraryId,
      folderId,
      handleEdit,
      handleDelete,
    );
  }, [libraryId, isLibrariesLoading, isRootFolder, folderId]);

  // Page description for current folder
  const pageDescription = useMemo(() => {
    if (isRootFolder) return null;

    return getDescription(library as LibraryTableRow<FolderTableItem>);
  }, [isRootFolder, library]);

  const handleReload = useCallback(() => {
    setShowEditLibraryModal(false);
    setShowCreateFolderModal(false);
    setShowEditFolderModal(false);
    setSelectedFolder(null);
    setSelected([]);
    loadLibraries();
  }, [loadLibraries]);

  const handleDeleteReload = useCallback(() => {
    setShowDeleteLibraryModal(false);
    loadLibraries();
    history.push('/libraries');
  }, [history, loadLibraries]);

  const handleBatchReload = (): void => {
    setShowDeleteModal(false);
    setSelected([]);
    globalLibraryStore.updateSelectedItems([]);
    loadLibraries();
  };

  const rowSelection = {
    onChange: (selectedRowKeys: ReactText[]): void => {
      setSelected(selectedRowKeys as string[]);
      globalLibraryStore.updateSelectedItems(selectedRowKeys as number[]);
      if (selectedRowKeys.length !== 1) {
        setSelectedFolder(null);
      } else {
        setSelectedFolder(
          globalLibraryStore.getFolderData(
            libraryId,
            selectedRowKeys[0] as number,
          ),
        );
      }
    },
    selectedRowKeys: selected as string[],
  };

  return (
    <>
      <PageSectionWrapper
        title={pageTitle}
        description={pageDescription}
        actionButtons={
          isRootFolder
            ? [
                createFolderButton((): void => setShowCreateFolderModal(true)),
                editFolderButton(
                  (): void => setShowEditFolderModal(true),
                  selected.length !== 1 ||
                    (!!selectedFolder && selectedFolder.isSystemFolder),
                ),
              ]
            : []
        }
      >
        <EditLibraryBatch
          onDeleteClick={(): void => {
            setShowDeleteModal(true);
          }}
          libraryId={libraryId}
        />
        <LibraryTable
          id="libraryTable"
          rowKey="id"
          dataSource={library.children}
          isLoading={isLibrariesLoading}
          columnNamesList={globalLibraryFoldersColumns}
          rowSelection={rowSelection}
          scroll={{ x: 800 }}
          getTableItemLink={(id: number): string =>
            `/libraries/${libraryId}/folder/${id}`
          }
        />
      </PageSectionWrapper>
      {showDeleteModal && (
        <DeleteLibraryItems
          onFinish={handleBatchReload}
          visible={showDeleteModal}
          onClose={(): void => {
            setShowDeleteModal(false);
          }}
          libraryId={libraryId}
        />
      )}
      <EditLibrary
        visible={showEditLibraryModal}
        onClose={(): void => setShowEditLibraryModal(false)}
        library={library as LibraryTableRowLibItem}
        onFinish={handleReload}
      />
      <CreateFolder
        onCancel={(): void => setShowCreateFolderModal(false)}
        visible={showCreateFolderModal}
        onFinish={handleReload}
        libraryId={libraryId}
      />
      <EditFolder
        onCancel={(): void => setShowEditFolderModal(false)}
        visible={showEditFolderModal}
        onFinish={handleReload}
        libraryId={libraryId}
        folder={selectedFolder}
      />
      <DeleteLibrary
        visible={showDeleteLibraryModal}
        onClose={(): void => setShowDeleteLibraryModal(false)}
        onFinish={handleDeleteReload}
        library={{ id: libraryId, name: library.name }}
      />
    </>
  );
};

export const GlobalLibraryFolders = observer(GlobalLibraryFoldersFn);
