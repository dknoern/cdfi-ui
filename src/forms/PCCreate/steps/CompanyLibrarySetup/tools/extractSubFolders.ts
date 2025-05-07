import { Folder, CreatedFolder } from 'types';

type ExtractedItem = (Folder | CreatedFolder) & { parentFolderName: string };
type ExtractResult = ExtractedItem[];

export const extractSubFolders = (
  folders: (Folder | CreatedFolder)[] | null,
): ExtractResult => {
  if (!folders) return [];

  return folders.reduce<ExtractResult>(
    (prev, curr) =>
      prev.concat(
        (curr.subFolders || ([] as (Folder | CreatedFolder)[])).map((item) => ({
          ...item,
          parentFolderName: curr.name,
        })),
      ),
    [],
  );
};
