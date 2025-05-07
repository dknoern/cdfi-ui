export interface Tag4Tree {
  title: React.ReactNode;
  value: number;
  categoryId: number;
}

export interface TagTreeNode {
  title: React.ReactNode;
  value: string | number;
  key: React.Key;
  selectable: boolean;
  checkable: boolean;
  children?: (TagTreeNode | Tag4Tree)[];
}

export type TagTree = TagTreeNode[];
