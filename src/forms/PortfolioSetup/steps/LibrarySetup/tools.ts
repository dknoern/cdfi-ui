import { SortOrder } from 'antd/lib/table/interface';
import { Folder } from 'types';
import { sortByName } from 'tools/sort';

const sorterFn = (order?: SortOrder) => (a: Folder, b: Folder): number => {
  if (!order) return 0;

  const affix = order === 'ascend' ? 1 : -1;

  return sortByName(a, b) * affix;
};

type FolderStructure = Folder[];

export const makeFolderStructure = (
  folders: Folder[] | null,
  sortOrder?: SortOrder,
): FolderStructure => {
  let result: FolderStructure = [];

  (folders || []).sort(sorterFn(sortOrder)).forEach((folder) => {
    result.push(folder);

    result = result.concat((folder.subFolders || []).sort(sorterFn(sortOrder)));
  });

  return result;
};
