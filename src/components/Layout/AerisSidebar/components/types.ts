export interface ManagementMenuItem {
  key: React.Key;
  title: string;
  path: string;
  icon?: string;
  children?: ManagementMenuItem[];
  disabled?: boolean;
  divider?: boolean;
}

export interface CdfiDropdownItem {
  key: React.Key;
  name: string;
  id: number;
  path: string;
}
