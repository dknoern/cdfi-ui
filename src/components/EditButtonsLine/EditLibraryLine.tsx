import React, { FC } from 'react';
import { TableItem } from 'types';
import { EditButtonsLine } from './EditButtonsLine';

type EditLibraryLineProps = {
  selectedItems: TableItem[] | React.Key[];
};

export const EditLibraryLine: FC<EditLibraryLineProps> = ({
  selectedItems,
  children,
}) => {
  const textHelper = selectedItems.length
    ? `${selectedItems.length} Items selected`
    : 'Select items';

  return <EditButtonsLine textHelper={textHelper}>{children}</EditButtonsLine>;
};
