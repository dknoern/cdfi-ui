import React, { FC } from 'react';
import { Tag } from 'types';
import { EditButtonsLine } from './EditButtonsLine';

type EditTagsLineProps = {
  selectedTagIds: Tag['id'][];
};

export const EditTagsLine: FC<EditTagsLineProps> = ({
  selectedTagIds,
  children,
}) => {
  const textHelper = selectedTagIds.length
    ? `${selectedTagIds.length} Tags selected`
    : 'Select tags';

  return <EditButtonsLine textHelper={textHelper}>{children}</EditButtonsLine>;
};
