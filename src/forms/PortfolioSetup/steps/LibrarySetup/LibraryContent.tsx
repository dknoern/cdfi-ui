import React, { FC, useCallback, useState, useMemo } from 'react';
import { SortOrder } from 'antd/lib/table/interface';
import { Library } from 'types';
import { LibraryStructureTable } from 'forms/components';
import { useLibraryFolders } from 'dataManagement';
import { makeFolderStructure } from './tools';

interface LibraryContentProps {
  libraryId: Library['id'];
}
export const LibraryContent: FC<LibraryContentProps> = ({ libraryId }) => {
  const { isLoading: isFoldersLoading } = useLibraryFolders(libraryId);

  const [nameSortOrder, setNameSortOrder] = useState<SortOrder>(null);
  const handleTableChange = useCallback((pagination, filters, sorter) => {
    setNameSortOrder((sorter as { order: SortOrder }).order);
  }, []);

  const displayedFolders = useMemo(() => {
    return makeFolderStructure([], nameSortOrder);
  }, [nameSortOrder]);

  return (
    <LibraryStructureTable
      loading={isFoldersLoading}
      dataSource={displayedFolders}
      onTableChange={handleTableChange}
    />
  );
};
