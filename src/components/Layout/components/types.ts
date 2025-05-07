export enum ButtonTag {
  A = 'A',
  BUTTON = 'BUTTON',
}

export interface MenuClickedItemInfo {
  key: React.Key;
}

export interface MenuItemClickHandler {
  (item: MenuClickedItemInfo): void;
}
