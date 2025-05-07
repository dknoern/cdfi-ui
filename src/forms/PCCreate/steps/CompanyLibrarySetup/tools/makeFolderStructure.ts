import {
  Folder,
  CreatedFolder,
  CreatedSubFolder,
  FolderType,
  isFolder,
} from 'types';

type FolderStructure = (Folder | CreatedFolder | CreatedSubFolder)[];

export const makeFolderStructure = (
  folders: Folder[] | null,
  createdFolders?: CreatedFolder[],
  createdSubFolders?: CreatedSubFolder[],
): FolderStructure => {
  let result: FolderStructure = [];

  [...(folders || []), ...(createdFolders || [])].forEach((folder) => {
    result.push(folder);

    let itemsToConcat: FolderType[] = folder.subFolders || [];

    if (isFolder(folder)) {
      itemsToConcat = itemsToConcat.concat(
        (createdSubFolders || []).filter(
          (item) => item.parentFolderId === folder.id,
        ),
      );
    }

    result = result.concat(itemsToConcat);
  });

  return result;
};
