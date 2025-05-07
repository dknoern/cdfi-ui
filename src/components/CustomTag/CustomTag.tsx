import React, { FC } from 'react';
import { Tag as AntTag } from 'antd';
import { Tag, TagGroup } from 'types';
import styles from './CustomTag.module.scss';

type CustomTagProps = {
  tag: Tag;
};

const makeClassName = (tagGroup?: TagGroup): string => {
  switch (tagGroup) {
    case TagGroup.sdgs:
      return styles.sdgTag;
    case TagGroup.irisplus:
      return styles.irisTag;
    case TagGroup.custom:
    default:
      return styles.customTag;
  }
};

export const CustomTag: FC<CustomTagProps> = ({ tag }) => {
  return <AntTag className={makeClassName(tag.group)}>{tag.name}</AntTag>;
};
