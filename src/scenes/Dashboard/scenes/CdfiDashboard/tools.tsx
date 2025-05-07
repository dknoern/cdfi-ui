import React from 'react';
import { contentText } from './constants';
import styles from './OrganizationDetails.module.scss';
import { Typography } from 'antd';
import { ImpactArea } from 'types';
const { Paragraph, Text } = Typography;

export const noData = (msg: string) => (
  <Text key={msg} className={styles.noData}>
    {msg}
  </Text>
);

export const list = (arr: string[]) => {
  const listItems =
    arr?.length > 0
      ? arr?.map((item, index) => (
          <Paragraph style={{ marginBottom: 0 }} key={index}>
            {item}
          </Paragraph>
        ))
      : noData(contentText.noData);
  return <div>{listItems}</div>;
};

export const listImpactAreas = (arr: ImpactArea[]) => {
  const listItems =
    arr?.length > 0
      ? arr?.map((item, index) => (
          <Paragraph style={{ marginBottom: 0 }} key={index}>
            {item.name}
          </Paragraph>
        ))
      : noData(contentText.noData);
  return <div>{listItems}</div>;
};

export const stringOrNumber = (assetSize?: string) => {
  return Number.isNaN(
    Number(assetSize?.replaceAll(',', '').replaceAll('.', '')),
  )
    ? assetSize
    : '$' + assetSize;
};

export const mapTagCategoryToColor = (category: string): string => {
  switch (category) {
    case 'IRIS+':
      return 'orange';
    case 'UN-SDG':
      return 'green';
    case 'CUSTOM':
      return 'pink';
    default:
      return 'white';
  }
};
